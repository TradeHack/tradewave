import RequestFactory from './build/RequestFactory'

export const Factory = (web3) => {
 return new web3.eth.Contract(
    JSON.parse(RequestFactory.interface),
    '0xd9145CCE52D386f254917e481eB44e9943F39138'
  )
}

