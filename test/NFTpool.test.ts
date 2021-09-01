import { NFTPoolFetcher } from '../src/NFTPool_fetcher'
import { TEST_NFT_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS } from '../src/constants'
import { NFTPool } from '../src/entities/NFTPool'

describe('NFT Pool data', () => {
  it('Available pools', async () => {
    const availablePools:string[] = await NFTPoolFetcher.getAvailablePools()

    console.log("Available pools:")
    console.log(availablePools)

    expect(availablePools.length).toBeGreaterThanOrEqual(1)
    expect(availablePools[0]).toEqual(TEST_NFT_POOL_ADDRESS_ALFAJORES)
  })

  it('Pool', async () => {
    const pool = await NFTPoolFetcher.fetchPoolData(TEST_NFT_POOL_ADDRESS_ALFAJORES)
    expect(pool.maxSupply).toEqual("1000")
  })

  it('Token price', async () => {
    const price = await NFTPoolFetcher.getTokenPrice(TEST_NFT_POOL_ADDRESS_ALFAJORES)
    console.log(price)
  })

  it('Balance of user', async () => {
    const balance = await NFTPoolFetcher.balanceOf(TEST_NFT_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS, 1)
    expect(balance).toEqual("0")
  })

  it('Total supply', async () => {
    const supply = await NFTPoolFetcher.totalSupply(TEST_NFT_POOL_ADDRESS_ALFAJORES)
    expect(supply).toEqual("0")
  })

  it('Get name', async () => {
    const name = await NFTPoolFetcher.getName(TEST_NFT_POOL_ADDRESS_ALFAJORES)
    expect(name).toEqual("CELO exclusive pool");
  })

  it('Available funds', async () => {
    const funds = await NFTPoolFetcher.getPoolAvailableFunds(TEST_NFT_POOL_ADDRESS_ALFAJORES)
    expect(funds).toEqual("0")
  })

  it('User USD balance', async () => {
    const balance = await NFTPoolFetcher.getUserUSDBalance(TEST_NFT_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS)
    expect(balance).toEqual("0")
  })

  it('Pool data from array of addresses', async () => {
    let addresses:string[] = new Array(1);
    addresses[0] = TEST_NFT_POOL_ADDRESS_ALFAJORES

    const pools:NFTPool[] = await NFTPoolFetcher.fetchPoolsFromAddresses(addresses)

    expect(pools.length).toEqual(1)
    expect(pools[0].address).toEqual(TEST_NFT_POOL_ADDRESS_ALFAJORES)
  })

  it('Pool positions and total balance', async () => {
    const [positions, balances, total] = await NFTPoolFetcher.getPoolPositionsAndTotal(TEST_NFT_POOL_ADDRESS_ALFAJORES)

    console.log("Positions, balances, and total:")
    console.log(positions)
    console.log(balances)
    console.log(total)

    expect(positions.length).toBeGreaterThanOrEqual(0)
    expect(balances.length).toBeGreaterThanOrEqual(0)
    expect(parseInt(total)).toBeGreaterThanOrEqual(0)
  })

  it('User token balance per class', async () => {
    const balances = await NFTPoolFetcher.getTokenBalancePerClass(TEST_NFT_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS)
    console.log(balances);
    expect(balances.length).toEqual(4)
  })

  it('Available tokens per class', async () => {
    const balances = await NFTPoolFetcher.getAvailableTokensPerClass(TEST_NFT_POOL_ADDRESS_ALFAJORES)
    console.log(balances);
    expect(balances.length).toEqual(4)
  })

  it('User total token balance', async () => {
    const balance = await NFTPoolFetcher.getUserTokenBalance(TEST_NFT_POOL_ADDRESS_ALFAJORES, TEST_USER_ADDRESS)
    console.log(balance);
  })

  it('Get seed price', async () => {
    const price = await NFTPoolFetcher.seedPrice(TEST_NFT_POOL_ADDRESS_ALFAJORES)
    console.log(price)
  })

  it('Get farm address', async () => {
    const farm = await NFTPoolFetcher.getFarmAddress(TEST_NFT_POOL_ADDRESS_ALFAJORES)
    console.log(farm)
  })
})