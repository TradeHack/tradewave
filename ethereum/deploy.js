const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/RequestFactory.json')

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:   'bacon clip scrub surround blossom unaware twice moment reform weekend multiply grit',

  },
  providerOrUrl: 'https://rinkeby.infura.io/v3/70b2adb65984476896214146db0c8141'
})
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
}
deploy()
