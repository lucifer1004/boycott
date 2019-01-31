import React, {useContext, useEffect, useState} from 'react'
// import {delay, debounce, throttle} from 'lodash'
import {
  Marker,
  GoogleMapContext,
  InfoWindow,
} from '@lucifer1004/react-google-map'

interface MarkerState {
  center: google.maps.LatLngLiteral
  content: string
  dragging: boolean
  showInfoWindow: boolean
}

export default () => {
  const {state} = useContext(GoogleMapContext)
  const decoratedContent = (content: string) =>
    `<strong style="font-size: 24px; color: darkcyan;">${content}</strong>`
  const [markerState, setMarkerState] = useState<MarkerState>({
    center: {lat: 0, lng: 0},
    content: decoratedContent('Lat: 0 Lon: 0'),
    dragging: false,
    showInfoWindow: false,
  })

  // Set dispatchers
  const setInfoWindow = (show: boolean) =>
    setMarkerState(prevState => {
      return prevState.dragging
        ? prevState
        : {...prevState, showInfoWindow: show}
    })
  const setDragging = (dragging: boolean) =>
    setMarkerState(prevState => {
      return {...prevState, dragging: dragging}
    })
  const setCenter = (center: google.maps.LatLngLiteral) => {
    setMarkerState(prevState => {
      return {
        ...prevState,
        center: center,
        content: decoratedContent(
          `Lat: ${center.lat.toFixed(4)} Lon: ${center.lng.toFixed(4)}`,
        ),
      }
    })
  }

  // Set handlers
  const handleMarkerDragStart = (event: google.maps.MouseEvent) => {
    setDragging(true)
  }
  const handleMarkerDrag = (event: google.maps.MouseEvent) => {
    setCenter(event.latLng.toJSON())
  }
  const handleMarkerDragEnd = (event: google.maps.MouseEvent) => {
    setDragging(false)
  }
  const handleMouseOver = (event: google.maps.MouseEvent) => {
    setInfoWindow(true)
  }
  const handleMouseOut = (event: google.maps.MouseEvent) => {
    setInfoWindow(false)
  }

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position: Position) =>
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      )
  }, [])

  return (
    <>
      <Marker
        id="marker"
        opts={{
          draggable: true,
          label: 'hello',
          position: markerState.center,
        }}
        onDrag={handleMarkerDrag}
        onDragStart={handleMarkerDragStart}
        onDragEnd={handleMarkerDragEnd}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <InfoWindow
        anchor={state.markers.get('marker')}
        opts={{
          content: markerState.content,
        }}
        visible={markerState.showInfoWindow}
      />
    </>
  )
}
