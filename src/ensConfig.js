import { formatsByName } from '@ensdomains/address-encoder'

export const ensConfig = {
  ens: {
    '20': {
      ensAddress: '0xb9930eF91BADBC650269c382E3B5877574e6a7fc',
      tld: 'ela',
      currency: 'ELA',
      placeholderRecords: ['ELA', 'DID', 'DOGE', 'LTC', 'BTC'],
      blockExplorer: {
        subdomain: 'eth',
        domain: 'elastos.io'
      },
      decoder: formatsByName['ETH'].decoder
    }
  }
}
