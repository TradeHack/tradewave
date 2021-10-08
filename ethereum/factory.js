import RequestFactory from './build/RequestFactory'

export const Factory = (web3) => {
 return new web3.eth.Contract(
    RequestFactory.abi,
    '0x9D62C3c6C012d207c949768972F67035C3F0Eeaf'
  )
}

