import { formatsByName } from '@ensdomains/address-encoder'
import COIN_LIST from 'constants/coinList'
import { ensConfig } from 'ensConfig'
import { EMPTY_ADDRESS } from 'utils/records'
import TEXT_RECORD_KEYS from './constants/textRecords'

export const globalUtils = {
  currentChainId: 0,
  getCurrentTld: function() {
    const theEnsConfig = ensConfig.ens[globalUtils.currentChainId]
    if (theEnsConfig) {
      return theEnsConfig.tld
    } else {
      return 'eth'
    }
  },
  getCurrency: function() {
    const theEnsConfig = ensConfig.ens[globalUtils.currentChainId]
    if (theEnsConfig) {
      return theEnsConfig.currency
    } else {
      return 'ETH'
    }
  },
  getPlaceholderRecords: function() {
    const theEnsConfig = ensConfig.ens[globalUtils.currentChainId]

    console.log(
      'globalUtils.getPlaceholderRecords()',
      globalUtils.currentChainId,
      theEnsConfig
    )

    if (theEnsConfig) {
      return theEnsConfig.placeholderRecords
    } else {
      return ['ETH', ...COIN_LIST.slice(0, 3)]
    }
  },
  getCoinOptions: function() {
    const theEnsConfig = ensConfig.ens[globalUtils.currentChainId]

    console.log(
      'globalUtils.getCoinOptions()',
      globalUtils.currentChainId,
      theEnsConfig
    )

    if (theEnsConfig) {
      return theEnsConfig.placeholderRecords.sort().map(key => ({
        label: key,
        value: key
      }))
    } else {
      return COIN_LIST.slice()
        .sort()
        .map(key => ({
          label: key,
          value: key
        }))
    }
  },
  getBlockExplorer: function(subdomain) {
    const theEnsConfig = ensConfig.ens[globalUtils.currentChainId]
    if (theEnsConfig) {
      return theEnsConfig.blockExplorer
    } else {
      return {
        subdomain,
        domain: 'etherscan.io'
      }
    }
  },
  getDecoder: function() {
    const theEnsConfig = ensConfig.ens[globalUtils.currentChainId]
    if (theEnsConfig) {
      return theEnsConfig.decoder
    } else {
      return formatsByName['ETH'].decoder
    }
  },
  getDNSRegistrar: function() {
    const theEnsConfig = ensConfig.ens[globalUtils.currentChainId]
    if (theEnsConfig) {
      return theEnsConfig.dnsRegistrar
    } else {
      return EMPTY_ADDRESS
    }
  },
  getTextRecordsKeys: function(name) {
    let keys = TEXT_RECORD_KEYS
    if (!keys.includes(name)) {
      keys.push(name)
    }
    return keys
  },
  getBanners: async function() {
    const response = await (await fetch('/d/banners.json')).json()
    return response[globalUtils.currentChainId]
  }
}
