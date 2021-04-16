import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MyNavbar from '../src/components/Navbar.js'
import Home from '../src/components/Home.js'
import Login from '../src/auth/Login.js'

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
        <Route exact path ="/login">
          <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
