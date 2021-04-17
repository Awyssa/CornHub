import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MyNavbar from '../src/components/Navbar.js'
import Home from '../src/components/Home.js'
import Auth from '../src/auth/Auth'
import Profile from './components/Profile'
import Weather from './components/Weather'

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Switch>
        <Route exact path ="/">
          <Home/>
        </Route>
        <Route path ="/home">
          <Home/>
          </Route>
        <Route path ="/auth">
          <Auth/>
        </Route>
        <Route path ="/profile">
          <Profile/>
        </Route>
        <Route path ="/weather">
          <Weather/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
