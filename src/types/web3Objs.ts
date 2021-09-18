import Web3 from "web3";
import Torus, {TorusInpageProvider} from "@toruslabs/torus-embed";

export type Web3Object = {
    web3: Web3;
    torus: Torus | null;
    setweb3: (provider: TorusInpageProvider) => void;
    torusAccount: any
};
