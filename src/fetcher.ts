import { newKit } from '@celo/contractkit'
import { AbiItem } from 'web3-utils'
import Settings from './abis/Settings.json'
import AssetHandler from './abis/AssetHandler.json'
import { Token } from './entities/token'
import ERC20 from './abis/ERC20.json'
import { ChainId, SETTINGS_ADDRESS_ALFAJORES, ASSET_HANDLER_ADDRESS_ALFAJORES } from './constants'

let TOKEN_DECIMALS_CACHE: { [chainId: number]: { [address: string]: number } } = {}

/**
 * Contains methods for constructing instances of pools and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param address address of the token on the chain
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */
   public static async fetchTokenData(
    address: string,
    symbol?: string,
    name?: string
  ): Promise<Token> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(ERC20 as AbiItem[], address);
    const parsedDecimals =
      typeof TOKEN_DECIMALS_CACHE?.[ChainId.ALFAJORES]?.[address] === 'number'
        ? TOKEN_DECIMALS_CACHE[ChainId.ALFAJORES][address]
        : await instance.methods.decimals().call().then((decimals: number): number => {
            TOKEN_DECIMALS_CACHE = {
              ...TOKEN_DECIMALS_CACHE,
              [ChainId.ALFAJORES]: {
                ...TOKEN_DECIMALS_CACHE?.[ChainId.ALFAJORES],
                [address]: decimals
              }
            }
            return decimals
          })
    return new Token(ChainId.ALFAJORES, address, parsedDecimals, symbol, name)
  }

  /**
   * Given the name of a parameter, returns its value
   * @param parameter Name of the parameter
   */
   public static async getParameterValue(
     parameter: string
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(Settings as AbiItem[], SETTINGS_ADDRESS_ALFAJORES)
    const value = await instance.methods.getParameterValue(parameter).call()
    return value
  }

  /**
   * Given the address of a token, returns whether the token is supported on Tradegen
   * @param asset Address of the token
   */
   public static async isValidAsset(
    asset: string
 ): Promise<boolean> {
   const kit = newKit('https://alfajores-forno.celo-testnet.org')
   let instance = new kit.web3.eth.Contract(AssetHandler as AbiItem[], ASSET_HANDLER_ADDRESS_ALFAJORES)
   const valid = await instance.methods.isValidAsset(asset).call()
   return valid
 }

 /**
   * Given the address of a token, returns the token's price in USD
   * @param asset Address of the token
   */
  public static async getUSDPrice(
    asset: string
 ): Promise<string> {
   const kit = newKit('https://alfajores-forno.celo-testnet.org')
   let instance = new kit.web3.eth.Contract(AssetHandler as AbiItem[], ASSET_HANDLER_ADDRESS_ALFAJORES)
   const price = await instance.methods.getUSDPrice(asset).call()
   return price
 }

 /**
   * Given the address of a token, returns whether the token is supported on Tradegen
   * @param asset Address of the token
   */
  public static async getAvailableAssetsForType(
    assetType: number
 ): Promise<string[]> {
   const kit = newKit('https://alfajores-forno.celo-testnet.org')
   let instance = new kit.web3.eth.Contract(AssetHandler as AbiItem[], ASSET_HANDLER_ADDRESS_ALFAJORES)
   const assets = await instance.methods.getAvailableAssetsForType(assetType).call()
   return assets
 }
}