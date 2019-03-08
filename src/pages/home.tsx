import React from 'react'
import {GoogleMapProvider} from '@googlemap-react/core'
import InfoPanel from '../components/InfoPanel'
import MapContainer from '../components/MapContainer'

export default () => (
  <div className="content">
    <GoogleMapProvider>
      <InfoPanel />
      <MapContainer />
    </GoogleMapProvider>
  </div>
)
