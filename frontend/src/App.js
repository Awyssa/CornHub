import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MyNavbar from '../src/components/Navbar.js'
import Home from '../src/components/Home.js'
import Auth from '../src/auth/Auth'
import Profile from './components/Profile'
import Title from './components/Title'
import About from './components/About'
import Resources from './components/Resources'
import Footer from './components/Footer'
import Weather from './components/Weather'
import EditUserProfile from './components/EditUserProfile'
import PlantShow from './components/PlantShow.js'
import Paypal from './components/Paypal'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ="/">
          <Title/>
        </Route>
        <div>
        <MyNavbar />
        <Route path = "/plants/:id">
          <PlantShow />
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
        <Route exact path ="/profile/:id">
          <Profile/>
        </Route>
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
        <Route exact path ="/paypal">
          <Paypal />
        </Route>
        </div>
        <Footer />
      </Switch>
    </BrowserRouter>
  )
}

export default App
