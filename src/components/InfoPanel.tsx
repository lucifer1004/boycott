import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react'
import {GoogleMapContext, Marker} from '@lucifer1004/react-google-map'
import {useDebounce} from '../hooks'
import {businessesSearch} from '../helpers/YelpAPI'
import MapElements from './MapElements'
import {YelpBusinessesSearchResults} from '../common'
import {initialBusinesses} from '../common/defaultData'

export default () => {
  const {state} = useContext(GoogleMapContext)
  const [keyword, setKeyword] = useState('')
  // const [results, setResults] = useState<google.maps.places.PlaceResult[]>([])
  const [results, setResults] = useState<YelpBusinessesSearchResults>(
    initialBusinesses,
  )
  const debouncedKeyword = useDebounce(keyword, 500)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }
  const handleClick = (id: string) => {
    const marker = state.markers.get(id)
    if (marker === undefined) return
    marker.setVisible(!marker.getVisible())
  }

  // useEffect(() => {
  //   if (debouncedKeyword === '') return
  //   console.log('state', state)
  //   console.log('results', results)
  //   if (state.service) {
  //     if (!state.map) return
  //     const request = {
  //       location: state.map.getCenter(),
  //       radius: 500,
  //       query: debouncedKeyword,
  //     }
  //     state.service.textSearch(request, (results, status) => {
  //       if (status === google.maps.places.PlacesServiceStatus.OK) {
  //         console.log(results)
  //         setResults(results)
  //       } else setResults([])
  //     })
  //   }
  // }, [debouncedKeyword])

  const fetchData = async () => {
    if (debouncedKeyword === '') return
    console.log('state', state)
    console.log('results', results)
    if (state.service) {
      if (!state.map) return
      const query = {
        latitude: state.map.getCenter().lat(),
        longitude: state.map.getCenter().lng(),
        radius: 1000,
        term: debouncedKeyword,
      }
      const results = await businessesSearch(query)
      setResults(results.businesses)
    }
  }

  useEffect(() => {
    fetchData()
  }, [debouncedKeyword])

  return (
    <div className="info-panel">
      <div className="search">
        <input
          className="search-input"
          type="text"
          name="keyword"
          placeholder="Search for a place..."
          autoFocus
          value={keyword}
          onChange={handleChange}
        />
        <button
          className="search-submit-button"
          onClick={() => handleClick('marker')}
        >
          GO!
        </button>
      </div>
      <ul className="search-results">
        {Array.isArray(results.businesses) && results.businesses.length > 0 ? (
          results.businesses.map((result: any, index: number) => (
            <li key={index} className="search-result">
              <p>{result.name}</p>
              <MapElements
                id={result.id}
                info={result.name}
                latitude={result.coordinates.latitude}
                longitude={result.coordinates.longitude}
              />
            </li>
          ))
        ) : debouncedKeyword === '' ? null : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  )
}
