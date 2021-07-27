import { Fetcher } from '../src/fetcher'
import { ChainId, TEST_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS } from '../src/constants'
import { CELO, UBE, TGEN, POOF, Token } from '../src/entities/token'
import { Pool } from '../src/entities/pool'

describe('Token data', () => {
  it('Token', async () => {
    const token = await Fetcher.fetchTokenData(CELO[ChainId.ALFAJORES].address) // CELO
    expect(token.decimals).toEqual("18")
  })

  it('Supported currencies', async () => {
    const supportedCurrencies:string[] = await Fetcher.getSupportedCurrencies()
    expect(supportedCurrencies.length).toEqual(4)
    expect(supportedCurrencies[0]).toEqual(CELO[ChainId.ALFAJORES].address)
    expect(supportedCurrencies[1]).toEqual(UBE[ChainId.ALFAJORES].address)
    expect(supportedCurrencies[2]).toEqual(POOF[ChainId.ALFAJORES].address)
    expect(supportedCurrencies[3]).toEqual(TGEN[ChainId.ALFAJORES].address)
  })

  it('Token data from array of addresses', async () => {
    let addresses:string[] = new Array(4);
    addresses[0] = TGEN[ChainId.ALFAJORES].address
    addresses[1] = CELO[ChainId.ALFAJORES].address
    addresses[2] = UBE[ChainId.ALFAJORES].address
    addresses[3] = POOF[ChainId.ALFAJORES].address

    const tokens:Token[] = await Fetcher.fetchTokensFromAddresses(addresses)

    expect(tokens.length).toEqual(4)
    expect(tokens[0].address).toEqual(TGEN[ChainId.ALFAJORES].address)
    expect(tokens[1].address).toEqual(CELO[ChainId.ALFAJORES].address)
    expect(tokens[2].address).toEqual(UBE[ChainId.ALFAJORES].address)
    expect(tokens[3].address).toEqual(POOF[ChainId.ALFAJORES].address)
  })
})

describe('Pool data', () => {
  it('Available pools', async () => {
    const availablePools:string[] = await Fetcher.getAvailablePools()

    console.log("Available pools:")
    console.log(availablePools)

    expect(availablePools.length).toBeGreaterThanOrEqual(1)
    expect(availablePools[0]).toEqual(TEST_POOL_ADDRESS_ALFAJORES)
  })

  it('Pool data from array of addresses', async () => {
    let addresses:string[] = new Array(1);
    addresses[0] = TEST_POOL_ADDRESS_ALFAJORES

    const pools:Pool[] = await Fetcher.fetchPoolsFromAddresses(addresses)

    expect(pools.length).toEqual(1)
    expect(pools[0].address).toEqual(TEST_POOL_ADDRESS_ALFAJORES)
  })

  it('Pool positions and total balance', async () => {
    const [positions, balances, total] = await Fetcher.getPoolPositionsAndTotal(TEST_POOL_ADDRESS_ALFAJORES)

    console.log("Positions, balances, and total:")
    console.log(positions)
    console.log(balances)
    console.log(total)

    expect(positions.length).toBeGreaterThanOrEqual(1)
    expect(balances.length).toBeGreaterThanOrEqual(1)
    expect(parseInt(total)).toBeGreaterThanOrEqual(0)
    expect(parseInt(balances[0])).toBeGreaterThanOrEqual(0)
  })

  it('Get pool available funds', async () => {
    const funds:string = await Fetcher.getPoolAvailableFunds(TEST_POOL_ADDRESS_ALFAJORES)

    console.log("Pool's available funds: ")
    console.log(funds)

    expect(parseInt(funds)).toBeGreaterThanOrEqual(0)
  })

  it('Get pool available funds', async () => {
    const funds:string = await Fetcher.getPoolAvailableFunds(TEST_POOL_ADDRESS_ALFAJORES)

    console.log("Pool's available funds: ")
    console.log(funds)

    expect(parseInt(funds)).toBeGreaterThanOrEqual(0)
  })

  it('Get user USD balance', async () => {
    const balance:string = await Fetcher.getUserUSDBalance(TEST_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS)

    console.log("User USD balance in test pool: ")
    console.log(balance)

    expect(parseInt(balance)).toBeGreaterThanOrEqual(0)
  })
})