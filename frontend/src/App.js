import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MyNavbar from '../src/components/Navbar.js'
import Home from '../src/components/Home.js'
import Auth from '../src/auth/Auth'
import Profile from './components/Profile'

import Weather from './components/Weather'
import EditUserProfile from './components/EditUserProfile'
import About from './components/About'
import Resources from './components/Resources'
import Footer from './components/Footer'
import Title from './components/Title'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ="/">
          <Title/>
        </Route>
        <div>
        <MyNavbar />
        <Route exact path ="/home">
          <Home/>
          </Route>
        <Route path ="/auth">
          <Auth/>
        </Route>
        <Route path ="/profile">
          <Profile/>
        </Route>
        </div>
        <Route path ="/weather">
          <Weather/>
        </Route>
        <Route path ="/editprofile">
          <EditUserProfile/>
        </Route>
        <Route exact path ="/about">
          <About />
        </Route>
        <Route exact path ="/Resources">
          <Resources />
        </Route>
        <Footer />
      </Switch>
    </BrowserRouter>
  )
}

export default App
