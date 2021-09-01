import { PoolFetcher } from '../src/pool_fetcher'
import { TEST_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS } from '../src/constants'
import { Pool } from '../src/entities/pool'
/*
describe('Pool data', () => {
  it('Available pools', async () => {
    const availablePools:string[] = await PoolFetcher.getAvailablePools()

    console.log("Available pools:")
    console.log(availablePools)

    expect(availablePools.length).toBeGreaterThanOrEqual(1)
    expect(availablePools[0]).toEqual(TEST_POOL_ADDRESS_ALFAJORES)
  })

  it('Pool', async () => {
    const pool = await PoolFetcher.fetchPoolData(TEST_POOL_ADDRESS_ALFAJORES)
    expect(pool.performanceFee).toEqual("1000")
  })

  it('Token price', async () => {
    const price = await PoolFetcher.getTokenPrice(TEST_POOL_ADDRESS_ALFAJORES)
    console.log(price)
  })

  it('Balance of user', async () => {
    const balance = await PoolFetcher.balanceOf(TEST_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS)
    expect(balance).toEqual("0")
  })

  it('Total supply', async () => {
    const supply = await PoolFetcher.totalSupply(TEST_POOL_ADDRESS_ALFAJORES)
    expect(supply).toEqual("0")
  })

  it('Get name', async () => {
    const name = await PoolFetcher.getName(TEST_POOL_ADDRESS_ALFAJORES)
    expect(name).toEqual("UBE holder");
  })

  it('Available funds', async () => {
    const funds = await PoolFetcher.getPoolAvailableFunds(TEST_POOL_ADDRESS_ALFAJORES)
    expect(funds).toEqual("0")
  })

  it('User USD balance', async () => {
    const balance = await PoolFetcher.getUserUSDBalance(TEST_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS)
    expect(balance).toEqual("0")
  })

  it('Pool data from array of addresses', async () => {
    let addresses:string[] = new Array(1);
    addresses[0] = TEST_POOL_ADDRESS_ALFAJORES

    const pools:Pool[] = await PoolFetcher.fetchPoolsFromAddresses(addresses)

    expect(pools.length).toEqual(1)
    expect(pools[0].address).toEqual(TEST_POOL_ADDRESS_ALFAJORES)
  })

  it('Pool positions and total balance', async () => {
    const [positions, balances, total] = await PoolFetcher.getPoolPositionsAndTotal(TEST_POOL_ADDRESS_ALFAJORES)

    console.log("Positions, balances, and total:")
    console.log(positions)
    console.log(balances)
    console.log(total)

    expect(positions.length).toBeGreaterThanOrEqual(0)
    expect(balances.length).toBeGreaterThanOrEqual(0)
    expect(parseInt(total)).toBeGreaterThanOrEqual(0)
  })
})*/