import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  console.log(formData)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      window.localStorage.setItem('token', response.data.token)
      console.log(response.data.token)
    } catch (err) {
      // setErrors('Unauthorised')
    }
  }
  return (
  <Container>
    <Form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      <Button className="auth-button" type="submit">
        Submit
      </Button>
    </Form>
   </Container>
  )
}

export default Register
