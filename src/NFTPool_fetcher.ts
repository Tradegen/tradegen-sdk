import { newKit } from '@celo/contractkit'
import { AbiItem } from 'web3-utils'
import NFTPoolContract from './abis/NFTPool.json'
import NFTPoolFactory from './abis/NFTPoolFactory.json'
import { ChainId, NFT_POOL_FACTORY_ADDRESS_ALFAJORES } from './constants'
import { NFTPool } from './entities/NFTPool'

let SUPPLY_CAP_CACHE: { [chainId: number]: { [address: string]: number } } = {}

/**
 * Contains methods for constructing instances of pools and tokens from on-chain data.
 */
export abstract class NFTPoolFetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Fetch information for a given pool on the given chain, using the given ethers provider.
   * @param address address of the pool on the chain
   * @param managerAddress optional address of the pool's manager
   * @param name optional name of the pool
   * @param seedPrice pool's seed price
   */
   public static async fetchPoolData(
    address: string,
    managerAddress?: string,
    name?: string,
    seedPrice?: number,
  ): Promise<NFTPool> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const supplyCap =
      typeof SUPPLY_CAP_CACHE?.[ChainId.ALFAJORES]?.[address] === 'number'
        ? SUPPLY_CAP_CACHE[ChainId.ALFAJORES][address]
        : await instance.methods.maxSupply().call().then((cap: number): number => {
            SUPPLY_CAP_CACHE = {
              ...SUPPLY_CAP_CACHE,
              [ChainId.ALFAJORES]: {
                ...SUPPLY_CAP_CACHE?.[ChainId.ALFAJORES],
                [address]: cap
              }
            }
            return cap
          })
    return new NFTPool(ChainId.ALFAJORES, address, supplyCap, seedPrice, managerAddress, name)
  }

  /**
   * Gets the pool's token price in USD
   * @param address the pool's address
   */
   public static async getTokenPrice(
    address: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const price = await instance.methods.tokenPrice().call()
    return price
  }

  /**
   * Gets the user's token balance in the pool
   * @param address the pool's address
   * @param user address of the user
   * @param tokenClass the pool token's class (C1 - C4)
   */
   public static async balanceOf(
    address: string,
    user: string,
    tokenClass: number
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const balance = await instance.methods.balanceOf(user, tokenClass).call()
    return balance
  }

  /**
   * Gets the pool's manager address
   * @param address the pool's address
   */
   public static async getManagerAddress(
    address: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const managerAddress = await instance.methods.manager().call()
    return managerAddress
  }

  /**
   * Gets the pool's total supply of tokens
   * @param address the pool's address
   */
   public static async totalSupply(
    address: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const supply = await instance.methods.totalSupply().call()
    return supply
  }

  /**
   * Gets the name of the pool
   * @param address the pool's address
   */
   public static async getName(
    address: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const name = await instance.methods.name().call()
    return name
  }

  /**
   * Gets the pool's available funds in USD
   * @param address the pool's address
   */
   public static async getPoolAvailableFunds(
    address: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
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
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const balance = await instance.methods.getUSDBalance(user).call()
    return balance
  }

  /**
   * Gets the user's balance token balance for the given pool
   * @param address the pool's address
   * @param user the address of user
   */
   public static async getUserTokenBalance(
    address: string,
    user: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const balance = await instance.methods.balance(user).call()
    return balance
  }

  /**
   * Gets the pool's seed price
   * @param address the pool's address
   */
   public static async seedPrice(
    address: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const price = await instance.methods.seedPrice().call()
    return price
  }

  /**
   * Gets the pool's farm address
   * @param address the pool's address
   */
   public static async getFarmAddress(
    address: string,
  ): Promise<string> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const farm = await instance.methods.farm().call()
    return farm
  }

  /**
   * Gets the pool's positions and total balance
   * @param address the pool's address
   */
   public static async getPoolPositionsAndTotal(
    address: string,
  ): Promise<[string[], string[], string]> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const data = await instance.methods.getPositionsAndTotal().call()

    return [data['0'], data['1'], data['2']]
  }

  /**
   * Gets the number of tokens the pool has available for each class
   * @param address the pool's address
   */
   public static async getAvailableTokensPerClass(
    address: string,
  ): Promise<[string, string, string, string]> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const data = await instance.methods.getAvailableTokensPerClass().call()

    return [data['0'], data['1'], data['2'], data['3']]
  }

  /**
   * Gets the number of tokens the user has in the pool for each class
   * @param address the pool's address
   * @param user address of the user
   */
   public static async getTokenBalancePerClass(
    address: string,
    user: string
  ): Promise<[string, string, string, string]> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolContract as AbiItem[], address);
    const data = await instance.methods.getTokenBalancePerClass(user).call()

    return [data['0'], data['1'], data['2'], data['3']]
  }

  /**
   * Returns the address of each pool available
   */
   public static async getAvailablePools(
  ): Promise<string[]> {
    const kit = newKit('https://alfajores-forno.celo-testnet.org')
    let instance = new kit.web3.eth.Contract(NFTPoolFactory as AbiItem[], NFT_POOL_FACTORY_ADDRESS_ALFAJORES)
    const availablePools = await instance.methods.getAvailablePools().call()
    return availablePools
  }

  /**
   * Given an array of addresses, fetches the pool data for each address
   * @param addresses array of pool addresses
   */
   public static async fetchPoolsFromAddresses(
    addresses: string[]
  ): Promise<NFTPool[]> {
    let pools:Promise<NFTPool>[] = new Array(addresses.length);
    for (var i = 0; i < addresses.length; i++)
    {
        pools[i] = this.fetchPoolData(addresses[i]);
    }
    
    let output:NFTPool[] = new Array(addresses.length)
    await Promise.all(pools).then((results:NFTPool[]) => {
        output = results
    });

    return output
  }
}