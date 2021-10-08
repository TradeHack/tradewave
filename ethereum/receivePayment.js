import web3 from './web3'
import ReceivePaymentCompiled from './build/ReceivePayment'

export const ReceivePayment = (address) => {
  return new web3.eth.Contract(
    ReceivePaymentCompiled.abi,
    address
  )
}
