import React, { useState } from 'react'
import { Form, Button, Container, Row, Toast } from 'react-bootstrap'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: ''
  })
  const [showA, setShowA] = useState(false)
  const toggleShowA = () => setShowA(false)
  const [showB, setShowB] = useState(false)
  const toggleShowB = () => setShowB(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [reg, setReg] = useState(false)

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      window.localStorage.setItem('token', response.data.token)
      setReg(true)
    } catch (err) {
      console.log('err', err.response.data)
      setErrorMessage(err.response.data)
      setShowA(true)
    }
  }
  return (
  <Container className="login-outerbox">
    {reg === false
      ? <Container className="login-box">
    <Form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter First Name"
            className="text-muted"
            id="register-first-name"
            name="first_name"
            value={setFormData.first_name}
            onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Last Name"
            className="text-muted"
            id="register-last-name"
            name="last_name"
            value={setFormData.last_name}
            onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
            className="text-muted"
            id="register-email"
            name="email"
            value={setFormData.email}
            onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
                  placeholder="Enter username"
                  className="text-muted"
                  id="register-username"
                  type="text"
                  name="username"
                  value={setFormData.username}
                  onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
                  placeholder="Enter password"
                  className="text-muted"
                  id="login-password"
                  type="password"
                  name="password"
                  value={setFormData.password}
                  onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formBasicPasswordConfirmation">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
                  placeholder="Confirm password"
                  className="text-muted"
                  id="resgister-password-confirmation"
                  type="password"
                  name="password_confirmation"
                  value={setFormData.password_confirmation}
                  onChange={handleChange}/>
      </Form.Group>
      {formData.first_name && formData.last_name && formData.email && formData.username && formData.password && formData.password_confirmation
        ? <Button className="auth-button" type="submit">
        Submit
      </Button>
        : <Button className="auth-button-disabled" onClick={() => setShowB(true)}>
      Submit
    </Button>
    }
    </Form>
    <Container className="login-toast">
    <Row>
      <Toast className="toast-error" show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              alt=""
            />
            <strong className="mr-auto">Woah there!</strong>
          </Toast.Header>
          <Toast.Body>
            {errorMessage.email && errorMessage.email[0]}
            {errorMessage.password && errorMessage.password[0]}
            {errorMessage.username && errorMessage.username[0]}
            {errorMessage.password_confirmation && errorMessage.password_confirmation[0]}
            </Toast.Body>
        </Toast>
        <Toast className="toast-error" show={showB} onClose={toggleShowB}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              alt=""
            />
            <strong className="mr-auto">Woah there!</strong>
          </Toast.Header>
          <Toast.Body>
            Missing information
            </Toast.Body>
        </Toast>
        </Row>
        </Container>
      </Container>
      : <div className="please-login">
      <p><strong> Welcome {formData.first_name}{formData.last_name}! </strong></p>
      <p>Registration successful</p>
      <p>Your email address is {formData.email}</p>
      </div>
      }
   </Container>
  )
}

export default Register
