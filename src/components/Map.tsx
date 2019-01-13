import React from 'react'
import {GoogleAPI, GoogleApiWrapper} from 'google-maps-react'

interface MapContainerProps {
  google: GoogleAPI
}

const MapContainer: React.FunctionComponent<MapContainerProps> = () => <div />

export default GoogleApiWrapper(props => ({
  apiKey: 'AIzaSyC6I-uL4lzPx0CzyOzyYSdnibxVrsfVy6g',
  language: props.language,
}))(MapContainer)
