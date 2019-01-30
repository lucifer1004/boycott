import React, {useContext, useEffect, useState} from 'react'
import {debounce, throttle} from 'lodash'
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
  const [markerState, setMarkerState] = useState<MarkerState>({
    center: {lat: 0, lng: 0},
    content: 'Lat: 0 Lng: 0',
    dragging: false,
    showInfoWindow: false,
  })

  const marker = state.markers.find(marker => marker.getLabel() === 'hello')

  // Set dispatchers
  const changeInfoWindowState = () =>
    setMarkerState(prevState => {
      return prevState.dragging
        ? prevState
        : {...prevState, showInfoWindow: !prevState.showInfoWindow}
    })
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
        content: `Lat: ${center.lat.toFixed(4)} Lon: ${center.lng.toFixed(4)}`,
      }
    })
  }

  // Set handlers
  const handleMarkerClick = () => {
    changeInfoWindowState()
  }
  const handleMarkerDragStart = (event: google.maps.MouseEvent) => {
    setDragging(true)
  }
  const handleMarkerDrag = throttle((event: google.maps.MouseEvent) => {
    setCenter(event.latLng.toJSON())
  }, 100)
  const handleMarkerDragEnd = (event: google.maps.MouseEvent) => {
    setDragging(false)
    setCenter(event.latLng.toJSON())
  }
  const handleMouseOver = throttle((event: google.maps.MouseEvent) => {
    setInfoWindow(true)
  }, 100)
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
        opts={{
          draggable: true,
          label: 'hello',
          position: markerState.center,
        }}
        onClick={handleMarkerClick}
        onDrag={handleMarkerDrag}
        onDragStart={handleMarkerDragStart}
        onDragEnd={handleMarkerDragEnd}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <InfoWindow
        anchor={marker}
        opts={{
          content: markerState.content,
        }}
        visible={markerState.showInfoWindow}
        onCloseClick={() => setInfoWindow(false)}
      />
    </>
  )
}
