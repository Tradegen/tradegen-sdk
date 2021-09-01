import { ChainId} from '../constants'
import { validateAndParseAddress} from '../utils'

/**
 * Represents an NFT pool.
 */
export class NFTPool {
  public readonly managerAddress?: string
  public readonly maxSupply: number
  public readonly seedPrice?: number
  public readonly name?: string

  public readonly chainId: ChainId
  public readonly address: string

  /**
   * Constructs an instance of the base class `NFTPool`.
   * @param maxSupply the pool's supply cap
   * @param seedPrice the pool's initial price
   * @param managerAddress address of the pool's manager
   * @param name name of the pool
   */
  public constructor(chainId: ChainId, address: string, maxSupply: number, seedPrice?: number, managerAddress?: string, name?: string) {
    this.managerAddress = managerAddress
    this.maxSupply = maxSupply
    this.seedPrice = seedPrice
    this.name = name

    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two pools are equivalent, i.e. have the same chainId and address.
   * @param other other pool to compare
   */
  public equals(other: NFTPool): boolean {
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }
}

/**
 * Compares two pools for equality
 */
export function poolEquals(poolA: NFTPool, poolB: NFTPool): boolean {
  return poolA.equals(poolB)
}