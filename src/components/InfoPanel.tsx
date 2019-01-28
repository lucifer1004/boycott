import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react'
import {GoogleMapContext} from '@lucifer1004/react-google-map'
import {useDebounce} from '../hooks'

const handleClick = (
  markers: google.maps.Marker[] | undefined,
  filter: string,
) => {
  if (markers === undefined) return
  markers
    .filter(marker => marker.getLabel() === filter)
    .forEach(marker => marker.setVisible(!marker.getVisible()))
}

const Button = ({
  markers,
  text,
  filter,
  onClick,
}: {
  markers: google.maps.Marker[]
  text: string
  filter: string
  onClick: (markers: google.maps.Marker[] | undefined, filter: string) => void
}) => (
  <button
    className="search-submit-button"
    onClick={() => onClick(markers, filter)}
  >
    {text}
  </button>
)

export default () => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 1000)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
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
        <Button
          markers={state.markers}
          text="GO!"
          filter="hello"
          onClick={handleClick}
        />
      </div>
      <ul className="search-result">
        <li>Highlight</li>
      </ul>
    </div>
  )
}
