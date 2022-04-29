import COIN_LIST from 'constants/coinList'
import { ensConfig } from 'ensConfig'

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
    if (theEnsConfig) {
      return theEnsConfig.placeholderRecords
    } else {
      return ['ETH', ...COIN_LIST.slice(0, 3)]
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
  }
}
