import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'

const Login = () => {
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
      const response = await axios.post('/api/auth/login/', formData)
      window.localStorage.setItem('token', response.data.token)
      console.log(response.data.token)
      history.push('/')
      location.reload()
    } catch (err) {
      // setErrors('Unauthorised')
    }
  }
  return (
  <Container>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
            className="text-muted"
            id="login-email"
            name="email"
            value={setFormData.email}
            onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
                  className="text-muted"
                  id="login-password"
                  type="text"
                  name="password"
                  value={setFormData.password}
                  onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
   </Container>
  )
}

export default Login
