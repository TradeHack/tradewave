const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../build/RequestFactory.json')
const compiledRequest = require('../build/ReceivePayment.json')

let accounts
let factory
let requestAddress
let request

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })
  await factory.methods.createRequest('100', accounts[2]).send({
    from: accounts[0],
    gas: '1000000'
  });

  [requestAddress] = await factory.methods.getDeployedRequests().call()

  request = await new web3.eth.Contract(
    compiledRequest.abi,
    requestAddress
  )
})

describe('Payments requests', () => {
  it('deploys a factory and a payment request', () => {
    assert.ok(factory.options.address)
    assert.ok(request.options.address)
  })

  it('marks caller as the seller', async () => {
    const seller = await request.methods.seller().call()
    assert.equal(accounts[0], seller)
  })

  it('only forwarder can call releasePayment', async () => {
    const forwarder = await request.methods.forwarder().call()
    try {
      await request.methods.releasePayment().send({
        from: forwarder
      })
      assert(false)
    } catch (e) {
      assert(e)
    }
  })
})
