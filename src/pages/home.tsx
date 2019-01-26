import React from 'react'
import {MapBox, Marker} from '@lucifer1004/react-google-map'
import Filter from '../components/Filter'

export default () => (
  <div className="map">
    <Filter />
    <div className="box">
      <MapBox
        apiKey="AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g"
        mapClass="map-content"
        mapStyle={{}}
        zoom={6}
        LoadedComponent={() => null}
      >
        <Marker draggable position={{lat: 39, lng: 116}} label="1" />
      </MapBox>
    </div>
  </div>
)
