import React from 'react'
import {NavLink, NavProvider, NavContent} from 'react-navi'
import logo from './logo.svg'
import './App.css'

export default ({navigation}: {navigation: any}) => (
  <NavProvider navigation={navigation}>
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          <NavLink href="/">Navi</NavLink>
        </h1>
      </header>
      <NavContent />
    </div>
  </NavProvider>
)
