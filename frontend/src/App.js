import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NavBar from '../src/components/Navbar.js'
import Home from '../src/components/Home.js'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path ="/">
          <Home/>
        </Route>
        <Route exact path ="/home">
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
