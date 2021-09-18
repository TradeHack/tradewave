import React from 'react'
import {Web3Object} from "../../types/web3Objs";
import {UserInfo} from "@toruslabs/torus-embed";

interface TorusContextInterface {
    userInfo?: UserInfo | null | undefined
    web3Obj?: Web3Object
    currentBalance?: string
}

const TorusContext = React.createContext<TorusContextInterface>({})

export const TorusProvider = TorusContext.Provider

export default TorusContext
