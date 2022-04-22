import { setupENS } from '@ensdomains/ui'
import { globalUtils } from 'globalUtils'
import { isENSReadyReactive } from '../reactiveVars'

const INFURA_ID =
  window.location.host === 'app.ens.domains'
    ? '90f210707d3c450f847659dc9a3436ea'
    : '58a380d3ecd545b2b5b3dad5d2b18bf0'

let ens = {},
  registrar = {},
  ensRegistryAddress = undefined

export async function setup({
  networkId,
  reloadOnAccountsChange,
  enforceReadOnly,
  enforceReload,
  customProvider,
  ensAddress
}) {
  let option = {
    reloadOnAccountsChange: false,
    enforceReadOnly,
    enforceReload,
    customProvider,
    ensAddress
  }
  if (enforceReadOnly) {
    option.infura = INFURA_ID
  }

  console.log('最终参数option', option)

  const ensResult = await setupENS(option)

  console.log('返回结果ensResult', ensResult)

  const {
    ens: ensInstance,
    registrar: registrarInstance,
    network,
    providerObject
  } = ensResult
  ens = ensInstance
  registrar = registrarInstance
  ensRegistryAddress = ensAddress
  globalUtils.currentChainId = network.chainId

  console.log('network =', network)

  isENSReadyReactive(true)
  return { ens, registrar, providerObject }
}

export function getRegistrar() {
  return registrar
}

export function getEnsAddress() {
  return ensRegistryAddress
}

export default function getENS() {
  return ens
}
