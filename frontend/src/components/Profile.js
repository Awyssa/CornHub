import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const token = window.localStorage.getItem('token')
      const id = window.localStorage.getItem('id')
      console.log('id of user', token)
      const response = await axios.get(`/api/auth/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      setUserData(response.data)
    }
    getUser()
  }, [])

  console.log('console log of user data', userData)
  return (
    <div>
     {userData.username}
    </div>
  )
}

export default Profile
