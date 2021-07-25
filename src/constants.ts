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
export const SETTINGS_ADDRESS_ALFAJORES = '0x4523A66e1a971A017E04B19B55Ac5e5A3E2d933A'
export const POOL_PROXY_ADDRESS_ALFAJORES = '0x84019B1aDfeE5ec2338D68B3884a51EA86ce67D3'
export const BASE_UBESWAP_ADAPTER_ADDRESS_ALFAJORES = '0x8221F08dc65048bd207B5B5cb61F1666434F9958'

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