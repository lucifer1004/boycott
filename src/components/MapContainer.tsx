import React, {useState} from 'react'
import {
  GoogleAPI,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Map,
} from 'google-maps-react'

interface MapContainerProps {
  google: GoogleAPI
}

const MapContainer: React.FunctionComponent<MapContainerProps> = ({google}) => {
  const [selectedPlace, selectPlace] = useState({name: ''})

  return (
    <Map
      google={google}
      zoom={14}
      initialCenter={{
        lat: 42.39,
        lng: -72.52,
      }}
    >
      <Marker />

      {/* <InfoWindow google={google} map={map} marker={}>
        <div>
          <h1>{selectedPlace.name}</h1>
        </div>
      </InfoWindow> */}
    </Map>
  )
}

export default GoogleApiWrapper(props => ({
  apiKey: 'AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g',
  language: props.language,
}))(MapContainer)
