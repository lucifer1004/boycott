import React, {useState} from 'react'
import {YelpBusinessesSearchResults} from '../common'
import MapElements from './MapElements'

export default ({results}: {results: YelpBusinessesSearchResults}) => (
  <>
    {results.businesses.map(result => {
      const [infoDisplay, setInfoDisplay] = useState(false)
      return (
        <li key={result.id}>
          <p
            onClick={() => setInfoDisplay(value => !value)}
            className="search-result"
            style={{
              backgroundColor: infoDisplay ? '#e8ecef' : undefined,
            }}
          >
            {result.name}
          </p>
          <MapElements
            result={result}
            infoDisplay={infoDisplay}
            setInfoDisplay={setInfoDisplay}
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
