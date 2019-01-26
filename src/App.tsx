import React from 'react'
import {
  NavLink,
  NavProvider,
  NavContent,
  NavLoading,
  NavNotFoundBoundary,
} from 'react-navi'
import './App.css'

export default ({navigation}: {navigation: any}) => (
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

  // <NavProvider navigation={navigation}>
  //   <div className="App">
  //     <header className="App-header">
  //       <h1 className="App-title">
  //         <NavLink href="/">Navi</NavLink>
  //       </h1>
  //     </header>
  //     <NavNotFoundBoundary render={renderNotFound}>
  //       <NavContent />
  //     </NavNotFoundBoundary>
  //   </div>
  // </NavProvider>
)

const renderNotFound = () => {
  return (
    <div className="App-error">
      <h1>404 - Not Found</h1>
    </div>
  )
}
