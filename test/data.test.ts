import { Fetcher } from '../src/fetcher'
import { ChainId } from '../src/constants'
import { CELO } from '../src/entities/token'
/*
describe('Get data', () => {
  it('Token', async () => {
    const token = await Fetcher.fetchTokenData(CELO[ChainId.ALFAJORES].address) // CELO
    expect(token.decimals).toEqual("18")
  })

  it('Parameter value', async () => {
    const value:string = await Fetcher.getParameterValue("MarketplaceProtocolFee")
    expect(value).toEqual("100")
  })

  it('Check for valid asset', async () => {
    const valid:boolean = await Fetcher.isValidAsset(CELO[ChainId.ALFAJORES].address)
    expect(valid).toBeTruthy;
  })

  it('Get USD price', async () => {
    const price:string = await Fetcher.getUSDPrice(CELO[ChainId.ALFAJORES].address)
    console.log(price);
  })

  it('Get available assets for type', async () => {
    const assets:string[] = await Fetcher.getAvailableAssetsForType(1)
    console.log(assets);
    expect(assets.length).toBeGreaterThan(0);
  })
})*/