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
export const SETTINGS_ADDRESS_ALFAJORES = '0xfAb0b9299CD3ae5B0726Fe39DF3ad93ae1f56416'
export const POOL_FACTORY_ADDRESS_ALFAJORES = '0xC71Ff58Efa2bffaE0f120BbfD7C64893aA20bDE0'
export const NFT_POOL_FACTORY_ADDRESS_ALFAJORES = '0x2dB13ac7A21F42bcAaFC71C1f1F8c647AEBC9750'
export const ASSET_HANDLER_ADDRESS_ALFAJORES = '0x702F856fE7AB70d19Aaf54dA8FC14fd113c7e949'

//Test pools
export const TEST_POOL_ADDRESS_ALFAJORES = "0xd6326BE58f460162353EADE5d3ca8427A22b640c"
export const TEST_NFT_POOL_ADDRESS_ALFAJORES = "0xC94be0d04cBB7F63c0c47E5104eeA18a5e3765F8"

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