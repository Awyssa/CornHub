import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { Form, Button, Container, Modal, Toast } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// import ImageUploadField from './ImageUploadField'
const EditUserProfile = () => {
  const [showA, setShowA] = useState(false)
  const toggleShowA = () => setShowA(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: ''
  })
  const history = useHistory()
  const [deleteCount, setDeleteCount] = useState('')
  const handleDelete = () => {
    setDeleteCount('delete')
  }
  const handleClose = () => {
    setDeleteCount('')
  }
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    history.push('/')
    location.reload()
  }
  const handleDeleteConfirm = async () => {
    const id = window.localStorage.getItem('id')
    await axios.delete(`/api/auth/${id}/`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`
      }
    }
    )
    handleLogout()
  }
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
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const id = window.localStorage.getItem('id')
      await axios.put(`/api/auth/${id}/`,
        formData, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        }
      )
      history.push(`/profile/${id}/`)
    } catch (err) {
      console.log(err.response.data)
      setErrorMessage(err.response.data)
      setShowA(true)
    }
  }
  return (
  <Container className="edit-profile-container">
    <Form className="edit-profile-form" onSubmit={handleSubmit}>
    <h2>Edit Profile</h2>
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
      <Container>
      <Toast className="toast-error" show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              alt=""
            />
            <strong className="mr-auto">Woah there!</strong>
          </Toast.Header>
          <Toast.Body className="toast.body">
            {errorMessage.email && errorMessage.email[0]}
            {errorMessage.password && errorMessage.password[0]}
            {errorMessage.username && errorMessage.username[0]}
            {errorMessage.password_confirmation && errorMessage.password_confirmation[0]}
            </Toast.Body>
        </Toast>
      </Container>
      {/* <Form.Group >
        <Form.Label>Profile Image</Form.Label>
        <ImageUploadField
            type="text"
            value={formData.profile_image}
            name="profile_image"
            onChange={handleChange}
          />
      </Form.Group> */}
      {/* <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control
                  placeholder="Enter password"
                  className="text-muted"
                  id="edit-password"
                  type="password"
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
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}/>
      </Form.Group> */}
      {!deleteCount &&
      <Container className="edit-profile-buttons">
      {formData.first_name && formData.last_name && formData.email && formData.username
        ? <Button className="edit-profile-button auth-button" type="submit">
        Submit
      </Button>
        : <Button className="edit-profile-button auth-button" disabled="true">
      Submit
    </Button>
      }
      <Button className="edit-profile-button auth-button" variant="danger" onClick={handleDelete} type="submit">
       Delete profile
      </Button>
      </Container>
    } <Button className="auth-button" onClick={() => history.goBack()}>Back to Profile</Button>
    {deleteCount &&
    <>
   <Modal
    show = {deleteCount}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
    keyboard="false"
   >
    <Modal.Dialog>
      <Modal.Header onClick={handleClose} closeButton>
        <Modal.Title>Delete your profile?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>  Are you sure you want to delete your profile?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">Close</Button>
        <Button onClick={handleDeleteConfirm} variant="primary">Delete?</Button>
      </Modal.Footer>
  </Modal.Dialog>
</Modal>
   </>
    }
    </Form>
   </Container>
  )
}
export default EditUserProfile
