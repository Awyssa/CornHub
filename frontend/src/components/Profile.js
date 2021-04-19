import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [userData, setUserData] = useState('')
  const [savedPlantData, setSavedPlantData] = useState('')

  const [wishlist, setUpdateWishlist] = useState({
    saved_plants: []
  })
  const [confirm, setConfirm] = useState(null)

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
  }, [])

  console.log('saved plant data', savedPlantData)

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
    // console.log('event.target.value', event.target.value)
    setConfirm('confirm')
    const filteredWishlistConst = userData.saved_plants.filter(filter => {
      // console.log(typeof (event.target.value))
      return filter !== parseFloat(event.target.value)
    })
    console.log('filtered wishlist ', filteredWishlistConst)
    const newWishList = { [event.target.name]: filteredWishlistConst }
    setUpdateWishlist(newWishList)
  }

  console.log('UPDATED WISH LIST =>>>>>>>>>>>', wishlist)
  console.log('saved plants =>>>>>>>>>>>', userData.saved_plants)

  const handleConfirm = async () => {
    const id = window.localStorage.getItem('id')
    console.log('updated wish list', wishlist)
    setConfirm('')
    try {
      await axios.put(
      `/api/auth/${id}/`,
      wishlist, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      }
      )
    } catch (err) {
      console.log('error', err)
    }
  }

  const handleCancel = () => {
    setConfirm('')
  }

  return (
    <div>
     <p>First Name: {userData.first_name}</p>
     <p>Username: {userData.username}</p>
     <p>Username: {userData.email}</p>
     <p>Last Name: {userData.last_name}</p>
     <p>Profile image:  {userData.profile_image}</p>
     <p>Saved plants:  {userData.saved_plants}</p>
     < div className="profile-wish-list">
     {mappedFilteredArray.map(item => {
       return (
         <div key={item.id} className="profile-wishlist-column">
        <Link to={`/plants/${item.id}`}>
         <p> {item.name} </p>
         <img className="chilli-image-profile" src={item.image} alt={item.name}key={item.id}/>
         </Link>

         {/* <button name="wishList" onClick={removeFromWishList} value={item.id}>Remove {item.name}?</button> */}

         {!confirm &&
          <>
           <Button name="saved_plants" value={item.id} onClick={removeFromWishlist} > Remove {item.name}?</Button>
                    </>
                  }
         </div>
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
    // size="lg"
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
      </div>
     <Link to="/editprofile">
     <Button >Edit user</Button>
     </Link>
    </div>
  )
}

export default Profile
