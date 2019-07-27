import React from 'react'
import {Link, NotFoundBoundary, useLoadingRoute} from 'react-navi'
import './App.css'

const renderNotFound = () => (
  <div className="Layout-error">
    <h1>404 - Not Found</h1>
  </div>
)

const App = ({children}: {children: React.ReactNode}) => {
  let loadingRoute = useLoadingRoute()

  return (
    <div className="App">
      {loadingRoute && <div className="App-loading-bar" />}
      <header>
        <nav>
          <Link href="/">Home</Link>
        </nav>
        <nav>
          <Link href="/places">Places</Link>
        </nav>
        <nav>
          <Link href="/about">About</Link>
        </nav>
      </header>
      <main>
        <NotFoundBoundary render={renderNotFound}>{children}</NotFoundBoundary>
      </main>
    </div>
  )
}

App.displayName = 'NeighborhoodMap'

export default App
