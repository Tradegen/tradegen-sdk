import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 42220,
  ALFAJORES = 44787,
  BAKLAVA = 62320
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

// Alfajores addresses
export const SETTINGS_ADDRESS_ALFAJORES = '0x933526C273Fc54707c7E713E9d25587a4fE7168D'
export const POOL_FACTORY_ADDRESS_ALFAJORES = '0xc60aeBd0319957747D1600465dDE859dd8599584'
export const BASE_UBESWAP_ADAPTER_ADDRESS_ALFAJORES = '0x8221F08dc65048bd207B5B5cb61F1666434F9958'

//Test pool
export const TEST_POOL_ADDRESS_ALFAJORES = "0x9A052642c804C0b135ffD6C7CD434498459d72B1"

//Test user address
export const TEST_USER_ADDRESS = "0xb10199414D158A264e25A5ec06b463c0cD8457Bb"

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}

interface ChainInfo {
  name: string
  fornoURL: string
  blockscoutURL: string
}

export const CHAIN_INFO: { [K in ChainId]: ChainInfo } = {
  [ChainId.ALFAJORES]: {
    name: 'Alfajores',
    fornoURL: 'https://alfajores-forno.celo-testnet.org',
    blockscoutURL: 'https://alfajores-blockscout.celo-testnet.org'
  },
  [ChainId.BAKLAVA]: {
    name: 'Baklava',
    fornoURL: 'https://baklava-forno.celo-testnet.org',
    blockscoutURL: 'https://baklava-blockscout.celo-testnet.org'
  },
  [ChainId.MAINNET]: {
    name: 'Mainnet',
    fornoURL: 'https://forno.celo.org',
    blockscoutURL: 'https://explorer.celo.org'
  }
}