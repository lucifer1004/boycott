import React from 'react'
import {
  NavLink,
  NavProvider,
  NavContent,
  NavLoading,
  NavNotFoundBoundary,
} from 'react-navi'
import './App.css'

const App = ({navigation}: {navigation: any}) => (
  <NavProvider navigation={navigation}>
    <NavLoading>
      {loadingRoute => (
        <div className="App">
          {loadingRoute && <div className="App-loading-bar" />}
          <header>
            <nav>
              <NavLink href="/">Home</NavLink>
            </nav>
            <nav>
              <NavLink href="/about">About</NavLink>
            </nav>
          </header>
          <NavNotFoundBoundary render={renderNotFound}>
            <NavContent />
          </NavNotFoundBoundary>
        </div>
      )}
    </NavLoading>
  </NavProvider>
)

const renderNotFound = () => {
  return (
    <div className="App-error">
      <h1>404 - Not Found</h1>
    </div>
  )
}

App.displayName = 'NeighborhoodMap'

export default App
