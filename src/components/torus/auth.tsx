/* eslint-disable class-methods-use-this */
import React from "react";
import TorusSdk, { TorusLoginResponse } from "@toruslabs/torus-direct-web-sdk";
import Web3 from 'web3'

import {
    verifierMap,
    AUTH_DOMAIN,
    EMAIL_PASSWORD,
} from "../../../lib/constants";
import {TorusProvider} from "./context";
import ENV from "../../../env-vars";

interface IState {
    selectedVerifier: string;
    torusdirectsdk: TorusSdk | null;
    loginHint: string;
    loginResponse?: TorusLoginResponse | null;
    web3Obj: any;
    currentBalance: string
}

interface IProps {}
class TorusWrapper extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedVerifier: "",
            torusdirectsdk: null,
            loginHint: "",
            loginResponse: null,
            web3Obj: {
                web3:  // @ts-ignore
                    new Web3(new Web3.providers.HttpProvider(ENV().INFURA_API))
            },
            currentBalance: '0'
        };
    }

    componentDidMount = async () => {
        try {
            const url = new URL(window.location.href);
            const hash = url.hash.substr(1);
            const queryParams = {} as Record<string, any>;
            for (const key of url.searchParams.keys()) {
                queryParams[key] = url.searchParams.get(key);
            }
            const { error, instanceParameters } = this.handleRedirectParameters(hash, queryParams);
            const torusdirectsdk = new TorusSdk({
                baseUrl: `${window.location.origin}/serviceworker`,
                enableLogging: true,
                network: "testnet", // details for test net
            });

            await torusdirectsdk.init({ skipSw: false });

            this.setState({ torusdirectsdk });

            if (hash) {
                if (error) throw new Error(error);
                const { verifier: returnedVerifier } = instanceParameters as Record<string, any>;
                const selectedVerifier = Object.keys(verifierMap).find((x) => verifierMap[x].verifier === returnedVerifier) as string;
                this.setState({
                    selectedVerifier,
                });
                this._loginWithParams(hash, queryParams);
            }
        } catch (error) {
            console.error(error, "mounted caught");
        }
    };

    _loginWithParams = async (hash: string, queryParameters: Record<string, any>) => {
        const { selectedVerifier, torusdirectsdk } = this.state;
        console.log(hash, queryParameters);
        try {
            const jwtParams = this._loginToConnectionMap()[selectedVerifier] || {};
            const { typeOfLogin, clientId, verifier } = verifierMap[selectedVerifier];
            const loginDetails = await torusdirectsdk?.triggerLogin({
                typeOfLogin,
                verifier,
                clientId,
                jwtParams,
                hash,
                queryParameters,
            });
            const torusAccount = this.state.web3Obj.web3.eth.accounts.privateKeyToAccount(loginDetails?.privateKey)
            const currentBalance = await this.state.web3Obj.web3.eth.getBalance(torusAccount.address)
            this.setState({
                loginResponse: loginDetails,
                web3Obj: {
                    ...this.state.web3Obj,
                    torusAccount
                },
                currentBalance
            });
        } catch (error) {
            console.error(error, "login caught");
        }
    };

    handleRedirectParameters = (hash: string, queryParameters: Record<string, any>) => {
        const hashParameters = hash.split("&").reduce((result: Record<string, any>, item) => {
            const [part0, part1] = item.split("=");
            result[part0] = part1;
            return result;
        }, {});
        let instanceParameters = {};
        let error = "";
        if (!queryParameters.preopenInstanceId) {
            if (Object.keys(hashParameters).length > 0 && hashParameters.state) {
                instanceParameters = JSON.parse(atob(decodeURIComponent(decodeURIComponent(hashParameters.state)))) || {};
                error = hashParameters.error_description || hashParameters.error || error;
            } else if (Object.keys(queryParameters).length > 0 && queryParameters.state) {
                instanceParameters = JSON.parse(atob(decodeURIComponent(decodeURIComponent(queryParameters.state)))) || {};
                if (queryParameters.error) error = queryParameters.error;
            }
        }
        return { error, instanceParameters, hashParameters };
    };

    _loginToConnectionMap = (): Record<string, any> => {
        return {
            [EMAIL_PASSWORD]: { domain: AUTH_DOMAIN },
        };
    };

    render() {
        const {loginResponse} = this.state;
        return (
            <TorusProvider value={{...loginResponse, web3Obj: this.state.web3Obj, currentBalance: this.state.currentBalance}}>
                {this.props.children}
            </TorusProvider>
        )
    }
}

export default TorusWrapper;
