import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserNavigation} from 'navi'
import pages from './pages/index'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const main = async () => {
  let navigation = createBrowserNavigation({pages})

  // Wait until async content is ready, or has failed.
  await navigation.steady()

  ReactDOM.render(
    <App navigation={navigation} />,
    document.getElementById('root'),
  )

  serviceWorker.register()
}

main()
