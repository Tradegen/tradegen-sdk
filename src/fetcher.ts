import { newKit } from '@celo/contractkit'
import { AbiItem } from 'web3-utils'
import ERC20 from './abis/ERC20.json'
import AssetPool from './abis/Pool.json'
import Settings from './abis/Settings.json'
import PoolFactory from './abis/PoolFactory.json'
import { ChainId, SETTINGS_ADDRESS_ALFAJORES, POOL_FACTORY_ADDRESS_ALFAJORES } from './constants'
import { Token } from './entities/token'
import { Pool } from './entities/pool'

let TOKEN_DECIMALS_CACHE: { [chainId: number]: { [address: string]: number } } = {}
let POOL_FEE_CACHE: { [chainId: number]: { [address: string]: number } } = {}

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
   * Fetch information for a given pool on the given chain, using the given ethers provider.
   * @param address address of the pool on the chain
   * @param managerAddress optional address of the pool's manager
   * @param name optional name of the pool
   */
   public static async fetchPoolData(
    address: string,
    managerAddress?: string,
    name?: string
  ): Promise<Pool> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(AssetPool as AbiItem[], address);
    const parsedFee =
      typeof POOL_FEE_CACHE?.[ChainId.ALFAJORES]?.[address] === 'number'
        ? POOL_FEE_CACHE[ChainId.ALFAJORES][address]
        : await instance.methods.getPerformanceFee().call().then((fee: number): number => {
            POOL_FEE_CACHE = {
              ...POOL_FEE_CACHE,
              [ChainId.ALFAJORES]: {
                ...POOL_FEE_CACHE?.[ChainId.ALFAJORES],
                [address]: fee
              }
            }
            return fee
          })
    return new Pool(ChainId.ALFAJORES, address, parsedFee, managerAddress, name)
  }

  /**
   * Gets the pool's available funds in USD
   * @param address the pool's address
   */
   public static async getPoolAvailableFunds(
    address: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(AssetPool as AbiItem[], address);
    const balance = await instance.methods.getAvailableFunds().call()
    return balance
  }

  /**
   * Gets the user's balance in USD for the given pool
   * @param address the pool's address
   * @param user the address of user to get balance of
   */
   public static async getUserUSDBalance(
    address: string,
    user: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(AssetPool as AbiItem[], address);
    const balance = await instance.methods.getUSDBalance(user).call()
    return balance
  }

  /**
   * Gets the pool's positions and total balance
   * @param address the pool's address
   */
   public static async getPoolPositionsAndTotal(
    address: string,
  ): Promise<[string[], string[], string]> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(AssetPool as AbiItem[], address);
    const data = await instance.methods.getPositionsAndTotal().call()

    return [data['0'], data['1'], data['2']]
  }

  /**
   * Returns the currencies available on the platform
   */
   public static async getSupportedCurrencies(
  ): Promise<string[]> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(Settings as AbiItem[], SETTINGS_ADDRESS_ALFAJORES)
    const supportedCurrencies = await instance.methods.getAvailableCurrencies().call()
    return supportedCurrencies
  }

  /**
   * Returns the address of each pool available
   */
   public static async getAvailablePools(
  ): Promise<string[]> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(PoolFactory as AbiItem[], POOL_FACTORY_ADDRESS_ALFAJORES)
    const availablePools = await instance.methods.getAvailablePools().call()
    return availablePools
  }

  /**
   * Given an array of addresses, fetches the token data for each address
   * @param addresses array of token addresses
   */
   public static async fetchTokensFromAddresses(
    addresses: string[],
  ): Promise<Token[]> {
    let tokens:Promise<Token>[] = new Array(addresses.length);
    for (var i = 0; i < addresses.length; i++)
    {
        tokens[i] = this.fetchTokenData(addresses[i]);
    }
    
    let output:Token[] = new Array(addresses.length)
    await Promise.all(tokens).then((results:Token[]) => {
        output = results
    });

    return output
  }

  /**
   * Given an array of addresses, fetches the pool data for each address
   * @param addresses array of pool addresses
   */
   public static async fetchPoolsFromAddresses(
    addresses: string[]
  ): Promise<Pool[]> {
    let pools:Promise<Pool>[] = new Array(addresses.length);
    for (var i = 0; i < addresses.length; i++)
    {
        pools[i] = this.fetchPoolData(addresses[i]);
    }
    
    let output:Pool[] = new Array(addresses.length)
    await Promise.all(pools).then((results:Pool[]) => {
        output = results
    });

    return output
  }
}