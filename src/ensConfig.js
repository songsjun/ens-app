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
      decoder: formatsByName['ETH'].decoder,
      dnsRegistrar: '0x6A489732c0fd78940759cde49fb24d6FEBA6AecB'
    },
    '80001': {
      ensAddress: '0x28fE6F94566e39d22C82906b42c17fe9e44362b0',
      tld: 'matic',
      currency: 'MATIC',
      placeholderRecords: ['MATIC', 'DID', 'DOGE', 'LTC', 'BTC'],
      blockExplorer: {
        subdomain: 'mumbai',
        domain: 'polygonscan.com'
      },
      decoder: formatsByName['ETH'].decoder,
      dnsRegistrar: '0x6A489732c0fd78940759cde49fb24d6FEBA6AecB'
    }
  }
}
