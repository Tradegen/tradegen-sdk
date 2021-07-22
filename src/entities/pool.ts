import { ChainId} from '../constants'
import { validateAndParseAddress} from '../utils'

/**
 * Represents a user-managed pool.
 */
export class Pool {
  public readonly managerAddress?: string
  public readonly performanceFee?: number
  public readonly name?: string

  public readonly chainId: ChainId
  public readonly address: string

  /**
   * Constructs an instance of the base class `Pool`.
   * @param managerAddress address of the pool's manager
   * @param performanceFee the pool's performance fee
   * @param name name of the pool
   */
  public constructor(chainId: ChainId, address: string, managerAddress?: string, performanceFee?: number, name?: string) {
    this.managerAddress = managerAddress
    this.performanceFee = performanceFee
    this.name = name

    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two pools are equivalent, i.e. have the same chainId and address.
   * @param other other pool to compare
   */
  public equals(other: Pool): boolean {
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }
}

/**
 * Compares two pools for equality
 */
export function poolEquals(poolA: Pool, poolB: Pool): boolean {
  return poolA.equals(poolB)
}