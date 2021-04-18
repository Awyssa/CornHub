import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'

const Profile = () => {
  const [userData, setUserData] = useState('')
  const [savedPlantData, setSavedPlantData] = useState('')

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
  let arrayOfFilteredPark = []

  // * for Each lopp to make array of parks in wishlist
  userData.saved_plants.forEach((saved, index) => {
    const filteredParks = savedPlantData.filter((item) => {
      return item.id === saved
    })
    arrayOfFilteredPark = [...arrayOfFilteredPark, filteredParks]
  })

  const mappedFilteredArray = arrayOfFilteredPark.map(item => {
    return item[0]
  })
  return (
    <div>
     <p>Username: {userData.username}</p>
     <p>First Name: {userData.first_name}</p>
     <p>Last Name: {userData.last_name}</p>
     <p>Profile image:  {userData.profile_image}</p>
     <p>Saved plants:  {userData.saved_plants}</p>
     <p>{mappedFilteredArray.map(item => {
       return (
         <>
         <p key={item.id}> {item.name} </p>
         <img className="chilli-image-profile" src={item.image} alt={item.name}key={item.id}/>
         </>
       )
     })}</p>
    </div>
  )
}

export default Profile
