import React, {useEffect, useState} from 'react'
import {MapBox} from '@lucifer1004/react-google-map'

export default () => {
  const [center, setCenter] = useState({lat: 0, lng: 0})
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
    </div>
  )
}
