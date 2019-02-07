import React, {useContext, useEffect, useState} from 'react'
import {GoogleMapContext} from '@lucifer1004/react-google-map'
import {useDebounce} from '../hooks'
import {businessesSearch} from '../helpers/YelpAPI'
import SearchResults from './SearchResults'
import {YelpBusinessesSearchResults} from '../common'
import {initialBusinesses} from '../common/defaultData'

export default () => {
  const {state} = useContext(GoogleMapContext)
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<YelpBusinessesSearchResults>(
    initialBusinesses,
  )
  const [filter, setFilter] = useState('all')
  const debouncedKeyword = useDebounce(keyword, 500)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value)
  }

  const fetchData = async () => {
    if (debouncedKeyword === '') return
    if (state.service) {
      if (!state.map) return
      const query = {
        latitude: state.map.getCenter().lat(),
        longitude: state.map.getCenter().lng(),
        radius: 1000,
        term: debouncedKeyword,
      }
      const results = await businessesSearch(query)
      setResults(results)
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
          onChange={handleInputChange}
        />
        <select className="search-submit-button" onChange={handleSelectChange}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="highRating">High rating</option>
          <option value="lowPrice">Low price</option>
        </select>
      </div>
      <ul className="search-results">
        {Array.isArray(results.businesses) && results.businesses.length > 0 ? (
          <SearchResults results={results} filter={filter} />
        ) : (
          debouncedKeyword !== '' && <li>No results found</li>
        )}
      </ul>
    </div>
  )
}
