import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { Button, Modal, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [userData, setUserData] = useState('')
  const [savedPlantData, setSavedPlantData] = useState('')
  const [wishlist, setUpdateWishlist] = useState({
    saved_plants: []
  })
  const [confirm, setConfirm] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/plants/')
      setSavedPlantData(response.data)
    }
    getData()
    const getUser = async () => {
      const id = window.localStorage.getItem('id')
      const response = await axios.get(`/api/auth/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      }
      )
      setUserData(response.data)
    }
    getUser()
    console.log(userData)
  }, [])

  if (!savedPlantData || !userData) return 'loading'
  let arrayOfSavedPlants = []
  // * for Each lopp to make array of parks in wishlist
  userData.saved_plants.forEach((saved, index) => {
    const filteredPlants = savedPlantData.filter((item) => {
      return item.id === saved
    })
    arrayOfSavedPlants = [...arrayOfSavedPlants, filteredPlants]
  })

  const mappedFilteredArray = arrayOfSavedPlants.map(item => {
    return item[0]
  })

  // * function to remove the item from the wishlist
  const removeFromWishlist = (event) => {
    setConfirm('confirm')
    const filteredWishlistConst = userData.saved_plants.filter(filter => {
      return filter !== parseFloat(event.target.value)
    })
    const newWishList = { [event.target.name]: filteredWishlistConst }
    setUpdateWishlist(newWishList)
  }

  const handleConfirm = async () => {
    const id = window.localStorage.getItem('id')
    setConfirm('')
    try {
      await axios.put(`/api/auth/${id}/`,
        wishlist, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        }
      )
    } catch (err) {
      console.log('error', err)
    }
    location.reload()
  }
  const handleCancel = () => {
    setConfirm('')
  }

  return (
    <Container className="profile-container">
      <Container className="user-profile-info">
      <h2>Your Profile</h2>
      <Container className="user-profile-info-outerbox">
    <Container className="user-profile-info-innerbox">
        <p><strong>Name: </strong> {userData.first_name} {userData.last_name} </p>
        <p><strong>Username: </strong> {userData.username}</p>
      </Container>
      <Container className="user-profile-info-innerbox">
        <p><strong>Email: </strong> {userData.email}</p>
        <p><strong>Saved Plants: </strong>{userData.saved_plants.length}</p>
      </Container>
      </Container>
      <Link to="/editprofile">
        <Button className="auth-button">Edit Profile</Button>
      </Link>
      </Container>
      {userData.saved_plants.length !== 0
        ? <Container className="profile-plants-container">
          <h2>Your Saved Plants</h2>
          <p><small>Click on Plant Image for more info</small></p>
          <input className="profile-search-bar" placeholder="Search by Plant Type" onChange={event => { setFilter(event.target.value.trim()) }}/>
          {mappedFilteredArray.filter((val) => {
            if (filter === '') {
              return val
            } else if (val.type.trim().toLowerCase().includes(filter.toLowerCase())) {
              return val
            }
            return null
          }).map((item, index) => {
            return (
              <Container key={item.id} className="profile-plant">
                  <Container className="profile-plant-card">
                  <Link to={`/plants/${item.id}`}>
                  <Image className="profile-plant-card-image" src={item.image} alt={item.name}key={item.id}/>
                  </Link>
                  <Container className="profile-plant-card-info">
                    <p> Name: {item.name} / <i>{item.subspecies}</i> </p>
                    <p> Type: {item.type} </p>
                    <p> Description: {item.description} </p>
                    <Container className="plant-info-box">
                      <Container className="plant-info-innerbox">
                        <p> Sow Month: {item.sow_month} </p>
                        <p> Plant Month: {item.plant_month} </p>
                        <p> Harvest Month: {item.harvest_month} </p>
                      </Container>
                      <Container className="plant-info-innerbox">
                        <p> Sow Month: {item.sunlight} </p>
                        <p> Plant Month: {item.soil_acidity} </p>
                        <p> Harvest Month: {item.fertilizing_frequency} </p>
                      </Container>
                    </Container>
                    </Container>
                  </Container>
                {!confirm &&
                <Container className="profile-blant-button-container">
                  <Button name="saved_plants" className="auth-button" value={item.id} onClick={removeFromWishlist} > Remove {item.name}?</Button>
                </Container>
                }
              </Container>
            )
          })}
          {confirm &&
          <>
            <Modal
              show = {confirm}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              backdrop="static"
              keyboard="false"
            >
            <Modal.Dialog>
              <Modal.Header onClick={handleCancel} closeButton>
                <Modal.Title>Delete plant from your wishlist?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>  Are you sure you want to delete this from your saved plants?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleCancel} variant="secondary">Close</Button>
                <Button onClick={handleConfirm} variant="primary">Delete?</Button>
              </Modal.Footer>
            </Modal.Dialog>
            </Modal>
          </>
          }
        </Container>
        : <p>You have no saved plants!</p>
      }
    </Container>
  )
}

export default Profile
