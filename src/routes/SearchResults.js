import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { Trans } from 'react-i18next'

import { H2 } from '../components/Typography/Basic'
import DomainInfo from '../components/SearchName/DomainInfo'
import { validateName, parseSearchTerm } from '../utils/utils'
import SearchErrors from '../components/SearchErrors/SearchErrors'
import { useHistory } from 'react-router-dom'

const RESULTS_CONTAINER = gql`
  query getResultsContainer {
    isENSReady @client
  }
`

import {
  NonMainPageBannerContainer,
  DAOBannerContent
} from '../components/Banner/DAOBanner'
import { globalUtils } from 'globalUtils'
import { ensConfig } from 'ensConfig'

const useCheckValidity = (_searchTerm, isENSReady) => {
  const [errors, setErrors] = useState([])
  const [parsed, setParsed] = useState(null)

  useEffect(() => {
    const checkValidity = async () => {
      let _parsed, searchTerm
      setErrors([])

      if (_searchTerm.split('.').length === 1) {
        let tld = '.eth'
        if (globalUtils.currentChainId > 0) {
          const theConfig = ensConfig.ens[globalUtils.currentChainId]
          if (theConfig) {
            tld = '.' + theConfig.tld
          }
        }
        searchTerm = _searchTerm + tld
      } else {
        searchTerm = _searchTerm
      }

      const type = await parseSearchTerm(searchTerm)
      if (!['unsupported', 'invalid', 'short'].includes(type)) {
        _parsed = validateName(searchTerm)
        setParsed(_parsed)
      }
      document.title = `ENS Search: ${searchTerm}`

      if (type === 'unsupported') {
        setErrors(['unsupported'])
      } else if (type === 'short') {
        setErrors(['tooShort'])
      } else if (type === 'invalid') {
        setErrors(['domainMalformed'])
      }
    }
    if (isENSReady) {
      checkValidity()
    }
  }, [_searchTerm, isENSReady])

  return { errors, parsed }
}

const ResultsContainer = ({ searchDomain, match }) => {
  const [banners, setBanners] = useState(null)

  const {
    data: { isENSReady }
  } = useQuery(RESULTS_CONTAINER)
  const searchTerm = match.params.searchTerm
  const history = useHistory()
  const lowered = searchTerm.toLowerCase()
  if (history && lowered !== searchTerm) {
    history.push(`/search/${lowered}`)
  }

  useEffect(() => {
    const fetchBanners = async () => {
      const banners = await globalUtils.getBanners()
      const now = new Date()
      if (
        banners &&
        new Date(banners.start) < now &&
        new Date(banners.end) > now
      ) {
        setBanners(banners)
      }
    }

    fetchBanners()
  }, [])

  const { errors, parsed } = useCheckValidity(searchTerm, isENSReady)

  if (!isENSReady) {
    return <div>Loading</div>
  }

  if (errors[0] === 'tooShort') {
    return (
      <>
        <SearchErrors errors={errors} searchTerm={searchTerm} />
      </>
    )
  } else if (errors.length > 0) {
    return <SearchErrors errors={errors} searchTerm={searchTerm} />
  }
  if (parsed) {
    return (
      <>
        {banners && (
          <NonMainPageBannerContainer>
            <DAOBannerContent banners={banners} />
          </NonMainPageBannerContainer>
        )}

        <H2>
          <Trans i18nKey="singleName.search.title">Names</Trans>
        </H2>
        <DomainInfo searchTerm={parsed} />
      </>
    )
  } else {
    return ''
  }
}

export default ResultsContainer
