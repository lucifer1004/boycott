import React, {useState, useEffect} from 'react'
import {useDebounce} from '../hooks'

export default () => {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 500)

  useEffect(() => {
    console.log(debouncedKeyword)
  }, [debouncedKeyword])

  return (
    <div className="filter">
      <form className="search" onSubmit={() => {}}>
        <input
          className="search-input"
          type="text"
          name="keyword"
          placeholder="Search for a place..."
          onChange={event => setKeyword(event.target.value)}
        />
        <input className="search-submit ripple" type="submit" value="GO!" />
      </form>
      <ul className="filter-result">
        <li>Highlight</li>
      </ul>
    </div>
  )
}
