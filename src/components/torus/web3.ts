import Web3 from 'web3'

import ENV from "../../../env-vars";

const web3Obj = {
    web3: new Web3(
        new Web3.providers.HttpProvider(
            // @ts-ignore
            ENV().INFURA_API,
        ),
    ),
    provider: null,
    setweb3: function(provider: any) {
        const web3Inst = new Web3(provider)
        web3Obj.web3 = web3Inst
    },
    initialize: async function(network: any) {
        const buildEnv = 'testing' //comment in production


        web3Obj.web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    },
    account: async function() {
        const accounts = await web3Obj.web3.eth.getAccounts()
        return accounts[0]
    },
    balance: async function() {
        const account = await web3Obj.account()
        const balance = await web3Obj.web3.eth.getBalance(account)
        return parseInt(balance)
    },
}

export default web3Obj
