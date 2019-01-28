import React, {useContext, useLayoutEffect, useState} from 'react'
import {MapBox, Marker, GoogleMapContext} from '@lucifer1004/react-google-map'

export default () => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [center, setCenter] = useState({lat: 0, lng: 0})
  useLayoutEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position: Position) =>
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      )
  }, [])

  const getPosition = (position: Position) => {
    return {lat: position.coords.latitude, lng: position.coords.longitude}
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition)
  }

  return (
    <div className="map-container">
      <MapBox
        apiKey="AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g"
        opts={{
          center: center,
          zoom: 15,
        }}
        mapClass="map-content"
        mapStyle={{}}
        usePlaces
        LoadedComponent={() => null}
      />
      <Marker
        opts={{
          draggable: true,
          label: 'hello',
          position: center,
        }}
      />
    </div>
  )
}
