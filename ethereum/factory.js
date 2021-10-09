import RequestFactory from './build/RequestFactory'

export const Factory = (web3) => {
 return new web3.eth.Contract(
    RequestFactory.abi,
    '0x1153cE622E16c3154B918eFF2E798d8372c938F3'
  )
}

