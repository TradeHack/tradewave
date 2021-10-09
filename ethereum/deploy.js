const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/RequestFactory.json')

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: '',
  },
  providerOrUrl: process.env.NEXT_PUBLIC_SPEEDY_NODES_ENDPOINT_RINKEBY,
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID
})
const web3 = new Web3(provider)

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploy from account', accounts[1])

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ gas: '1000000', from: accounts[1] })

    console.log('Contract deployed to', result.options.address)
  } catch (e) {
    console.log('ee', e)
  }
}
deploy()
