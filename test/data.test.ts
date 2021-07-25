import { Fetcher } from '../src/fetcher'
import { ChainId } from '../src/constants'
import { CELO, UBE, TGEN, POOF, Token } from '../src/entities/token'

describe('data', () => {
  it('Token', async () => {
    const token = await Fetcher.fetchTokenData(ChainId.ALFAJORES, CELO[ChainId.ALFAJORES].address) // CELO
    expect(token.decimals).toEqual(18)
  })

  it('Supported currencies', async () => {
    const supportedCurrencies:string[] = await Fetcher.getSupportedCurrencies(ChainId.ALFAJORES)
    expect(supportedCurrencies.length).toEqual(4)
    expect(supportedCurrencies[0]).toEqual(TGEN[ChainId.ALFAJORES].address)
    expect(supportedCurrencies[1]).toEqual(CELO[ChainId.ALFAJORES].address)
    expect(supportedCurrencies[2]).toEqual(UBE[ChainId.ALFAJORES].address)
    expect(supportedCurrencies[3]).toEqual(POOF[ChainId.ALFAJORES].address)
  })

  it('Token data from array of addresses', async () => {
    let addresses:string[] = new Array(4);
    addresses[0] = TGEN[ChainId.ALFAJORES].address
    addresses[1] = CELO[ChainId.ALFAJORES].address
    addresses[2] = UBE[ChainId.ALFAJORES].address
    addresses[3] = POOF[ChainId.ALFAJORES].address

    const tokens:Token[] = await Fetcher.fetchTokensFromAddresses(ChainId.ALFAJORES, addresses)
    expect(tokens.length).toEqual(4)
    expect(tokens[0].address).toEqual(TGEN[ChainId.ALFAJORES].address)
    expect(tokens[1].address).toEqual(CELO[ChainId.ALFAJORES].address)
    expect(tokens[2].address).toEqual(UBE[ChainId.ALFAJORES].address)
    expect(tokens[3].address).toEqual(POOF[ChainId.ALFAJORES].address)
  })

})