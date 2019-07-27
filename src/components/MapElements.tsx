import React from 'react'
import {delay} from 'lodash'
import {Marker, InfoWindow} from '@googlemap-react/core'
import {YelpBusinessesSearchResult} from '../common'

interface MapElementsProps {
  result: YelpBusinessesSearchResult
  infoDisplay: boolean
  setInfoDisplay: (show?: boolean) => void
}

export default ({result, infoDisplay, setInfoDisplay}: MapElementsProps) => {
  const decoratedContent = (content: string) => `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <strong style="font-size: calc(12px + 0.8vh); text-align: center; padding: 0 0 5px 0;">
        <a href=${result.url}>
          ${content}
        </a>
      </strong>
      <img src=${result.image_url} alt=${result.name} width="100px" />
    </div>
  `

  // Set handlers
  const handleClick = () => {
    setInfoDisplay()
  }
  const handleMouseOver = (event: google.maps.MouseEvent) => {
    setInfoDisplay(true)
  }
  const handleMouseOut = (event: google.maps.MouseEvent) => {
    delay(() => setInfoDisplay(false), 200)
  }

  return (
    <>
      <Marker
        id={result.id}
        opts={{
          position: {
            lat: result.coordinates.latitude,
            lng: result.coordinates.longitude,
          },
        }}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <InfoWindow
        anchorId={result.id}
        opts={{
          content: decoratedContent(result.name),
        }}
        visible={infoDisplay}
        onCloseClick={() => {
          setInfoDisplay(false)
        }}
      />
    </>
  )
}
