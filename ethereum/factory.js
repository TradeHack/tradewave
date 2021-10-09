import RequestFactory from './build/RequestFactory'

export const Factory = (web3) => {
 return new web3.eth.Contract(
    RequestFactory.abi,
    '0xBf2febA24E630dA6B38Ba93611cCfd5ABDa8C430'
  )
}

