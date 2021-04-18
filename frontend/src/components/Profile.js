import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { Button } from 'react-bootstrap'
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
    console.log('event.target.value', event.target.value)
    setConfirm('confirm')
    const filteredWishlistConst = userData.saved_plants.filter(filter => {
      console.log(typeof (event.target.value))
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
         <p> {item.name} </p>
         <img className="chilli-image-profile" src={item.image} alt={item.name}key={item.id}/>

         {/* <button name="wishList" onClick={removeFromWishList} value={item.id}>Remove {item.name}?</button> */}

         {!confirm
           ? <button name="saved_plants" value={item.id} onClick={removeFromWishlist} > Remove {item.name} from your wishlist</button>
           : <div className="park-buttons">
                      <button value={item.id} onClick={handleConfirm} > Confirm? </button>
                      <button className="ui red basic right floated button" value={item.id} onClick={handleCancel} > Cancel </button>
                    </div>
                  }
         </div>
       )
     })}
      </div>
     <Link to="/editprofile">
     <Button >Edit user</Button>
     </Link>
    </div>
  )
}

export default Profile
