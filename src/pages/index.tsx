import React from 'react'
import {createPage, createSwitch} from 'navi'
import {NavLink} from 'react-navi'
import MapContainer from '../components/MapContainer'
import {MapBox} from '@lucifer1004/react-google-map'

export default createSwitch({
  paths: {
    '/': createPage({
      title: 'Navi',
      content: (
        <div>
          <h2>Navi</h2>
          <nav>
            <NavLink href="/reference">API Reference</NavLink>
          </nav>
          <p>A router/loader for React</p>
          <MapBox
            apiKey=""
            onClick={(event: google.maps.MouseEvent) => {
              console.log(event)
            }}
          />
        </div>
      ),
    }),
    '/reference': createPage({
      title: 'API Reference',
      getContent: () => import('./reference'),
    }),
  },
})
