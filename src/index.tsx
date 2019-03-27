import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserNavigation} from 'navi'
import routes from './routes/index'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const main = async () => {
  let navigation = createBrowserNavigation({routes})

  // Wait until async content is ready, or has failed.
  await navigation.getRoute()

  ReactDOM.render(
    <App navigation={navigation} />,
    document.getElementById('root'),
  )

  serviceWorker.register()
}

main()
