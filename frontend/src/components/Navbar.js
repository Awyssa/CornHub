import React from 'react'
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { userIsAuthenticated } from '../helpers/auth'

const MyNavbar = () => {
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    history.push('/')
    location.reload()
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">CornHub</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <NavDropdown title="Box of fun!" id="basic-nav-dropdown">
            <NavDropdown.Item href="/weather">Weather</NavDropdown.Item>
            <NavDropdown.Item href="/spotify">Spotify</NavDropdown.Item>
            <NavDropdown.Item href="/paypal">Paypal</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/about">About</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {!userIsAuthenticated() &&
          <Nav.Link href="/auth">Register/Login</Nav.Link>
        }
          {userIsAuthenticated() &&
          <>
          <Nav.Link href="/Profile">Profile</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </>
}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar
