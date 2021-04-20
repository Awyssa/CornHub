import React from 'react'
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { userIsAuthenticated } from '../helpers/auth'
import logo from '../assets/logo.png'

const MyNavbar = () => {
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    history.push('/')
    location.reload()
  }

  return (
    <Navbar className="navbar" bg="black" expand="lg">
      <Navbar.Brand href="/home">
        <img src={logo}
        width="100"
        height="40"
        className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Container className="nav-container">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="navbar-home" href="/home"><p className="home-link">Home</p></Nav.Link>
          <NavDropdown title="Box of fun!" id="basic-nav-dropdown">
            <NavDropdown.Item href="/weather">Weather</NavDropdown.Item>
            <NavDropdown.Item href="/resources">Resources</NavDropdown.Item>
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
      </Container>
    </Navbar>
  )
}

export default MyNavbar
