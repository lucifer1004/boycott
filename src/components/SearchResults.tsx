import React, {useState} from 'react'
import {YelpBusinessesSearchResults} from '../common'
import MapElements from './MapElements'

interface SearchResultsProps {
  results: YelpBusinessesSearchResults
  filter: string
}

interface SearchResultsState {
  infoDisplay: Map<string, boolean>
}

export default ({results, filter}: SearchResultsProps) => {
  const [state, setState] = useState<SearchResultsState>({
    infoDisplay: new Map<string, boolean>(),
  })
  const setInfoDisplayOfId = (id: string, show?: boolean) => {
    setState(prevState => {
      return show === undefined
        ? {
            infoDisplay: prevState.infoDisplay.set(
              id,
              !prevState.infoDisplay.get(id),
            ),
          }
        : {infoDisplay: prevState.infoDisplay.set(id, show)}
    })
  }
  return (
    <>
      {results.businesses
        .filter(result => {
          switch (filter) {
            case 'all':
              return result
            case 'open':
              return result.is_closed === false
            case 'highRating':
              return result.rating && result.rating >= 4
            case 'lowPrice':
              return result.price === '$' || result.price === '$$'
            default:
              return {}
          }
        })
        .map(result => {
          return (
            <li key={result.id}>
              <p
                onClick={() => setInfoDisplayOfId(result.id)}
                className="search-result"
                style={{
                  backgroundColor: state.infoDisplay.get(result.id)
                    ? '#e8ecef'
                    : undefined,
                }}
              >
                {result.name}
              </p>
              <MapElements
                result={result}
                infoDisplay={state.infoDisplay.get(result.id) || false}
                setInfoDisplay={(show?: boolean) => {
                  setInfoDisplayOfId(result.id, show)
                }}
              />
              <hr
                style={{
                  margin: 0,
                }}
              />
            </li>
          )
        })}
    </>
  )
}
