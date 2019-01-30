import React from 'react'
import {GoogleMapProvider} from '@lucifer1004/react-google-map'
import InfoPanel from '../components/InfoPanel'
import MapContainer from '../components/MapContainer'
import MapElements from '../components/MapElements'

export default () => (
  <div className="content">
    <GoogleMapProvider>
      <InfoPanel />
      <MapContainer />
      <MapElements />
    </GoogleMapProvider>
  </div>
)
