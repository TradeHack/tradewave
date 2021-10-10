import RequestFactory from './build/RequestFactory'

export const Factory = (web3) => {
 return new web3.eth.Contract(
    RequestFactory.abi,
    '0xBbd0B0488d60f187751B8dEf87D4b38dB688c2ce'
  )
}

