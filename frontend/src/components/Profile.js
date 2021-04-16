import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const token2 = window.localStorage.getItem('token')
      // const id2 = window.localStorage.getItem('sub')
      console.log('id of user', token2)
      const response = await axios.get('/api/auth/41/', {
        headers: {
          Authorization: `Bearer ${token2}`
        }
      }
      )
      setUserData(response.data)
    }
    getUser()
  }, [])

  console.log(userData)
  return (
    <div>
     profile
    </div>
  )
}

export default Profile
