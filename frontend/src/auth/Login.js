import React, { useState } from 'react'
import { Form, Button, Container, Toast, Row } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showA, setShowA] = useState(false)
  const toggleShowA = () => setShowA(!showA)

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/login/', formData)
      window.localStorage.setItem('token', response.data.token)
      window.localStorage.setItem('id', response.data.sub)
      history.push('/profile')
    } catch (err) {
      setShowA(true)
    }
  }
  return (
  <Container className="login-box">
      <Form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            className="text-muted"
            id="login-email"
            name="email"
            value={setFormData.email}
            onChange={handleChange}
          />
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
          onChange={handleChange}
        />
        </Form.Group>
        <Button className="auth-button" type="submit">
          Submit
        </Button>
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
            Not valid!
            </Toast.Body>
        </Toast>
        </Row>
        </Container>
    </Container>
  )
}

export default Login
