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
  }
}
