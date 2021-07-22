import { getAddress } from '@ethersproject/address'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import warning from 'tiny-warning'
import { BigintIsh, ChainId, CHAIN_INFO, SolidityType, SOLIDITY_TYPE_MAXIMA, ZERO } from './constants'

export function validateSolidityTypeInstance(value: JSBI, solidityType: SolidityType): void {
  invariant(JSBI.greaterThanOrEqual(value, ZERO), `${value} is not a ${solidityType}.`)
  invariant(JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]), `${value} is not a ${solidityType}.`)
}

// warns if addresses are not checksummed
export function validateAndParseAddress(address: string): string {
  try {
    const checksummedAddress = getAddress(address)
    warning(address === checksummedAddress, `${address} is not checksummed.`)
    return checksummedAddress
  } catch (error) {
    invariant(false, `${address} is not a valid address.`)
  }
}

export function parseBigintIsh(bigintIsh: BigintIsh): JSBI {
  return bigintIsh instanceof JSBI
    ? bigintIsh
    : typeof bigintIsh === 'bigint'
    ? JSBI.BigInt(bigintIsh.toString())
    : JSBI.BigInt(bigintIsh)
}

/**
 * Parses a Celo chain ID number into a ChainId enum instance.
 * @param chainId The chain ID as a number.
 */
export const parseNetwork = (chainId: number): ChainId => {
  if (!Object.values(ChainId).includes(chainId)) {
    throw new Error(`Unknown Celo chain ID: ${chainId}`)
  }
  return chainId as ChainId
}

export function getBlockscoutLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  const prefix = CHAIN_INFO[chainId].blockscoutURL

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/tokens/${data}`
    }
    case 'block': {
      return `${prefix}/blocks/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}