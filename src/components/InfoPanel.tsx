import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react'
import {GoogleMapContext} from '@lucifer1004/react-google-map'
import {useDebounce} from '../hooks'

export default () => {
  const {state} = useContext(GoogleMapContext)
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 1000)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }
  const handleClick = (id: string) => {
    const marker = state.markers.get(id)
    if (marker === undefined) return
    marker.setVisible(!marker.getVisible())
  }

  useEffect(() => {
    console.log(debouncedKeyword)
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
      <ul className="search-result">
        <li>Highlight</li>
      </ul>
    </div>
  )
}
