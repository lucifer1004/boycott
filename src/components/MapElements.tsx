import React, {useContext, useEffect, useState} from 'react'
import {
  Marker,
  GoogleMapContext,
  InfoWindow,
} from '@lucifer1004/react-google-map'

export default () => {
  const {state} = useContext(GoogleMapContext)
  const [show, setShow] = useState(false)
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  } as google.maps.LatLngLiteral)
  const [content, setContent] = useState('This is an info window')
  const marker = state.markers.find(marker => marker.getLabel() === 'hello')
  const handleMarkerClick = () => setShow(prevShow => !prevShow)
  const handleMarkerDragEnd = (event: google.maps.MouseEvent) => {
    setCenter(event.latLng.toJSON())
    setContent(`Current position: ${event.latLng.toString()}`)
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
          position: center,
        }}
        onClick={handleMarkerClick}
        onDragEnd={handleMarkerDragEnd}
      />
      <InfoWindow
        anchor={marker}
        opts={{
          content: content,
        }}
        visible={show}
        onCloseClick={() => {
          setShow(false)
        }}
      />
    </>
  )
}
