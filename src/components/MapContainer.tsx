import React, {useContext, useLayoutEffect, useState, useEffect} from 'react'
import {
  MapBox,
  Marker,
  GoogleMapContext,
  InfoWindow,
} from '@lucifer1004/react-google-map'

export default () => {
  const {state, dispatch} = useContext(GoogleMapContext)
  const [show, setShow] = useState(false)
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

  useEffect(() => {
    console.log('show is', show)
  })

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
        onClick={() => {
          console.log(show)
          setShow(!show)
        }}
      />
      <InfoWindow
        anchor={state.markers.find(marker => marker.getLabel() === 'hello')}
        opts={{
          content: 'My info window',
        }}
        visible={show}
      />
    </div>
  )
}
