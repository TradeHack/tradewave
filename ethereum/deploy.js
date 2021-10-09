const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/RequestFactory.json')

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: '',
  },
  providerOrUrl: 'https://speedy-nodes-nyc.moralis.io/e439b1487cd90ef9dcc4b21d/eth/rinkeby',
  chainId: 4
})
const web3 = new Web3(provider)

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts()
    console.log('accounts', accounts)
    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ gas: '1000000', from: accounts[0] })

    console.log('Contract deployed to', result.options.address)
  } catch (e) {
    console.log('ee', e)
  }
}
deploy()
