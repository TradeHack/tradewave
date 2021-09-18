const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PROD = process.env.NODE_ENV === 'production'


let env = {
  IS_DEV, IS_PROD,
  TORUS_OPEN_LOGIN: process.env.NEXT_PUBLIC_TORUS_OPEN_LOGIN,
  INFURA_API: process.env.NEXT_PUBLIC_INFURA_API,
}

export const ENV = () => env

export default ENV
