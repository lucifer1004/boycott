import React, {useEffect, useState} from 'react'
import {MapBox} from '@googlemap-react/core'

export default () => {
  const [center, setCenter] = useState({lat: 40.7128, lng: -74.006})
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
        className="map-content"
        style={{}}
        usePlaces
      />
    </div>
  )
}
