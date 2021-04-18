import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const EditUserProfile = () => {
  // const [userData, setUserData] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    profile_image: '',
    password: '',
    password_confirmation: ''
  })
  // console.log('userData>>>>>', userData, setUserData)
  console.log('form data>>>>>', formData)

  useEffect(() => {
    const getUser = async () => {
      const id = window.localStorage.getItem('id')
      const response = await axios.get(`/api/auth/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      }
      )
      setFormData(response.data)
    }
    getUser()
  }, [])

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  console.log(formData)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const id = window.localStorage.getItem('id')
      await axios.put(
        `/api/auth/${id}/`,
        formData, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        }
      )
    } catch (err) {
      // setErrors('Unauthorised')
    }
  }
  return (
  <Container>
    <Form onSubmit={handleSubmit}>
      <Form.Group >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
            className="text-muted"
            id="edit-email"
            name="email"
            value={formData.email}
            onChange={handleChange}/>
      </Form.Group>
      <Form.Group >
        <Form.Label>Username</Form.Label>
        <Form.Control
                  placeholder="Enter username"
                  className="text-muted"
                  id="edit-username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}/>
      </Form.Group>
      <Form.Group >
        <Form.Label>First Name</Form.Label>
        <Form.Control
                  placeholder="Edit first name"
                  className="text-muted"
                  id="edit-first-name"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}/>
      </Form.Group>
      <Form.Group >
        <Form.Label>Last Name</Form.Label>
        <Form.Control
                  placeholder="Edit last name"
                  className="text-muted"
                  id="edit-last-name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}/>
      </Form.Group>
      <Form.Group >
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
                  placeholder="Edit profile image"
                  className="text-muted"
                  id="edit-last-name"
                  type="text"
                  name="profile_image"
                  value={formData.profile_image}
                  onChange={handleChange}/>
      </Form.Group>
      <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control
                  placeholder="Enter password"
                  className="text-muted"
                  id="edit-password"
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}/>
      </Form.Group>
      <Form.Group >
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
                  placeholder="Confirm password"
                  className="text-muted"
                  id="eddit-password-confirmation"
                  type="text"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}/>
      </Form.Group>
      <Link to="/profile">
      <Button variant="primary" type="submit">
        Save changes
      </Button>
      </Link>
    </Form>
   </Container>
  )
}

export default EditUserProfile
