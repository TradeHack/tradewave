import React from "react";
import TorusSdk, { UX_MODE } from "@toruslabs/torus-direct-web-sdk";
import styled from "styled-components";

import {
    verifierMap,
    GOOGLE,
    AUTH_DOMAIN,
    EMAIL_PASSWORD,
} from "../../lib/constants";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";


export const StyledDiv = styled.div`
    display: flex;
    min-height: 100vh;
`

export const StyledLeftContainer = styled.div`
    width: 40%;
    background-color: #C4C4C4;
`

export const StyledRightContainer = styled.div`
    width: 60%;
    padding-top: 80px;
    padding-left: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

interface IState {
    selectedVerifier: string;
    torusdirectsdk: TorusSdk | null;
    loginHint: string;
    consoleText?: string;
}

interface IProps {}

class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedVerifier: GOOGLE,
            torusdirectsdk: null,
            loginHint: "",
        };
    }

    componentDidMount = async () => {
        try {
            const torusdirectsdk = new TorusSdk({
                baseUrl: window.location.origin,
                // user will be redirect to auth page after login
                redirectPathName: "auth",
                enableLogging: true,
                uxMode: UX_MODE.REDIRECT,
                network: "testnet",
            });
            await torusdirectsdk.init({ skipSw: true });

            this.setState({ torusdirectsdk });
        } catch (error) {
            console.error(error, "mounted caught");
        }
    };

    login = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const { selectedVerifier, torusdirectsdk } = this.state;

        try {
            const jwtParams = this._loginToConnectionMap()[selectedVerifier] || {};
            const { typeOfLogin, clientId, verifier } = verifierMap[selectedVerifier];
            // in redirect mode, login result will be handled in redirect page
            // (Check auth.tsx file)
            await torusdirectsdk?.triggerLogin({
                typeOfLogin,
                verifier,
                clientId,
                jwtParams,
            });
        } catch (error) {
            console.error(error, "login caught");
        }
    };

    _loginToConnectionMap = (): Record<string, any> => {
        return {
            [EMAIL_PASSWORD]: { domain: AUTH_DOMAIN },
        };
    };

    render() {
        const { selectedVerifier } = this.state;

        return (
            <StyledDiv>
                <StyledLeftContainer>
                    placeholder
                </StyledLeftContainer>
                <StyledRightContainer>
                    <img src='/static/images/tradewave-logo.svg' />
                    <FormControl component={'form'} style={{marginTop: 100}}>
                        <Typography>Verifier:</Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.selectedVerifier}
                            defaultValue={verifierMap[GOOGLE].name}
                            onChange={(e) => this.setState({ selectedVerifier: e.target.value })}
                        >
                            {Object.keys(verifierMap).map((login) => (
                              <MenuItem value={login} key={login.toString()}>
                                  {verifierMap[login].name}
                              </MenuItem>
                            ))}
                        </Select>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.login}
                            href={''}
                            style={{marginTop: 20}}
                        >
                            Login with Torus
                        </Button>
                    </FormControl>
                </StyledRightContainer>
            </StyledDiv>
        );
    }
}

export default Login;
