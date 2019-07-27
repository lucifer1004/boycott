import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {Router, View} from 'react-navi'
import routes from './routes/index'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const main = async () => {
  ReactDOM.render(
    <Router routes={routes}>
      <App>
        <Suspense fallback={null}>
          <View />
        </Suspense>
      </App>
    </Router>,
    document.getElementById('root'),
  )

  serviceWorker.register()
}

main()
