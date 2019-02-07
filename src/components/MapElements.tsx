import React, {useContext, useEffect, useState} from 'react'
// import {delay, debounce, throttle} from 'lodash'
import {
  Marker,
  GoogleMapContext,
  InfoWindow,
} from '@lucifer1004/react-google-map'

interface MarkerProps {
  id: string
  info: string
  latitude: number
  longitude: number
}

interface MarkerState {
  position: google.maps.LatLngLiteral
  content: string
  showInfoWindow: boolean
}

export default ({id, info, latitude, longitude}: MarkerProps) => {
  const {state} = useContext(GoogleMapContext)
  const decoratedContent = (content: string) =>
    `<strong style="font-size: 24px; color: darkcyan;">${content}</strong>`
  const [markerState, setMarkerState] = useState<MarkerState>({
    position: {lat: latitude, lng: longitude},
    content: decoratedContent(info),
    showInfoWindow: false,
  })

  // Set dispatchers
  const setInfoWindow = (show?: boolean) =>
    setMarkerState(prevState => {
      return {
        ...prevState,
        showInfoWindow: show === undefined ? !prevState.showInfoWindow : show,
      }
    })

  // Set handlers
  const handleClick = () => {
    setInfoWindow()
  }
  const handleMouseOver = (event: google.maps.MouseEvent) => {
    setInfoWindow(true)
  }
  const handleMouseOut = (event: google.maps.MouseEvent) => {
    setInfoWindow(false)
  }

  return (
    <>
      <Marker
        id={id}
        opts={{
          position: markerState.position,
        }}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <InfoWindow
        anchor={state.markers.get(id)}
        opts={{
          content: markerState.content,
        }}
        visible={markerState.showInfoWindow}
      />
    </>
  )
}
