import { Contract } from '@ethersproject/contracts'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'
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
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */
  public static async fetchTokenData(
    chainId: ChainId,
    address: string,
    provider = getDefaultProvider(getNetwork(chainId)),
    symbol?: string,
    name?: string
  ): Promise<Token> {
    const parsedDecimals =
      typeof TOKEN_DECIMALS_CACHE?.[chainId]?.[address] === 'number'
        ? TOKEN_DECIMALS_CACHE[chainId][address]
        : await new Contract(address, ERC20, provider).decimals().then((decimals: number): number => {
            TOKEN_DECIMALS_CACHE = {
              ...TOKEN_DECIMALS_CACHE,
              [chainId]: {
                ...TOKEN_DECIMALS_CACHE?.[chainId],
                [address]: decimals
              }
            }
            return decimals
          })
    return new Token(chainId, address, parsedDecimals, symbol, name)
  }

  /**
   * Fetch information for a given pool on the given chain, using the given ethers provider.
   * @param chainId chain of the pool
   * @param address address of the pool on the chain
   * @param provider provider used to fetch the pool
   * @param managerAddress optional address of the pool's manager
   * @param name optional name of the pool
   */
   public static async fetchPoolData(
    chainId: ChainId,
    address: string,
    provider = getDefaultProvider(getNetwork(chainId)),
    managerAddress?: string,
    name?: string
  ): Promise<Pool> {
    const parsedFee =
      typeof POOL_FEE_CACHE?.[chainId]?.[address] === 'number'
        ? POOL_FEE_CACHE[chainId][address]
        : await new Contract(address, AssetPool, provider).getPerformanceFee().then((fee: number): number => {
            POOL_FEE_CACHE = {
              ...POOL_FEE_CACHE,
              [chainId]: {
                ...POOL_FEE_CACHE?.[chainId],
                [address]: fee
              }
            }
            return fee
          })
    return new Pool(chainId, address, parsedFee, managerAddress, name)
  }

  /**
   * Gets the pool's available funds in USD
   * @param chainID chain of the pool
   * @param address the pool's address
   * @param provider the provider to use to fetch the data
   */
   public static async getPoolAvailableFunds(
    chainID: ChainId,
    address: string,
    provider = getDefaultProvider(getNetwork(chainID))
  ): Promise<number> {
    const balance = await new Contract(address, AssetPool, provider).getAvailableFunds()
    return balance
  }

  /**
   * Gets the user's balance in USD for the given pool
   * @param chainID chain of the pool
   * @param address the pool's address
   * @param user the address of user to get balance of
   * @param provider the provider to use to fetch the data
   */
   public static async getUserUSDBalance(
    chainID: ChainId,
    address: string,
    user: string,
    provider = getDefaultProvider(getNetwork(chainID))
  ): Promise<number> {
    const balance = await new Contract(address, AssetPool, provider).getUSDBalance(user)
    return balance
  }

  /**
   * Gets the pool's positions and total balance
   * @param chainID chain of the pool
   * @param address the pool's address
   * @param provider the provider to use to fetch the data
   */
   public static async getPoolPositionsAndTotal(
    chainID: ChainId,
    address: string,
    provider = getDefaultProvider(getNetwork(chainID))
  ): Promise<[string[], number[], number]> {
    const [positions, balances, total] = await new Contract(address, AssetPool, provider).getPositionsAndTotal()
    return [positions, balances, total]
  }

  /**
   * Returns the currencies available on the platform for the given chainID
   * @param chainID chain
   * @param provider the provider to use to fetch the data
   */
   public static async getSupportedCurrencies(
    chainID: ChainId,
    provider = getDefaultProvider(getNetwork(chainID))
  ): Promise<string[]> {
    const settingsAddress = chainID == ChainId.ALFAJORES ? SETTINGS_ADDRESS_ALFAJORES : '0x0';
    const supportedCurrencies = await new Contract(settingsAddress, Settings, provider).getAvailableCurrencies()
    return supportedCurrencies
  }

  /**
   * Returns the address of each pool available for the given chainID
   * @param chainID chain
   * @param provider the provider to use to fetch the data
   */
   public static async getAvailablePools(
    chainID: ChainId,
    provider = getDefaultProvider(getNetwork(chainID))
  ): Promise<string[]> {
    const poolProxyAddress = chainID == ChainId.ALFAJORES ? POOL_FACTORY_ADDRESS_ALFAJORES : '0x0';
    const availablePools = await new Contract(poolProxyAddress, PoolFactory, provider).getAvailablePools()
    return availablePools
  }

  /**
   * Given an array of addresses, fetches the token data for each address
   * @param chainID chain
   * @param addresses array of token addresses
   * @param provider the provider to use to fetch the data
   */
   public static async fetchTokensFromAddresses(
    chainID: ChainId,
    addresses: string[],
    provider = getDefaultProvider(getNetwork(chainID))
  ): Promise<Token[]> {
    let tokens:Promise<Token>[] = new Array(addresses.length);
    for (var i = 0; i < addresses.length; i++)
    {
        tokens[i] = this.fetchTokenData(chainID, addresses[i], provider);
    }
    
    let output:Token[] = new Array(addresses.length)
    Promise.all(tokens).then((results:Token[]) => {
        output = results
    });

    return output
  }

  /**
   * Given an array of addresses, fetches the pool data for each address
   * @param chainID chain
   * @param provider the provider to use to fetch the data
   * @param addresses array of pool addresses
   */
   public static async fetchPoolsFromAddresses(
    chainID: ChainId,
    provider = getDefaultProvider(getNetwork(chainID)),
    addresses: string[]
  ): Promise<Pool[]> {
    let pools:Promise<Pool>[] = new Array(addresses.length);
    for (var i = 0; i < addresses.length; i++)
    {
        pools[i] = this.fetchPoolData(chainID, addresses[i], provider);
    }
    
    let output:Pool[] = new Array(addresses.length)
    Promise.all(pools).then((results:Pool[]) => {
        output = results
    });

    return output
  }
}