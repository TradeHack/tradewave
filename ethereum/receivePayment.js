import ReceivePaymentCompiled from './build/ReceivePayment'

export const ReceivePayment = (address, web3) => {
  return new web3.eth.Contract(
    ReceivePaymentCompiled.abi,
    address
  )
}
