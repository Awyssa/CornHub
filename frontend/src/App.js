import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MyNavbar from '../src/components/Navbar.js'
import Home from '../src/components/Home.js'
import Auth from '../src/auth/Auth'
import Profile from './components/Profile'
import About from './components/About'

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Switch>
        <Route exact path ="/">
          <Home/>
        </Route>
        <Route exact path ="/home">
          <Home/>
          </Route>
        <Route exact path ="/auth">
          <Auth/>
        </Route>
        <Route exact path ="/profile">
          <Profile/>
        </Route>
        <Route exact path ="/about">
          <About />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
