/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { getTokenFromLocalStorage } from '../helpers/auth'
import axios from 'axios'

const PlantWishList = ({ plantId, userData }) => {
  const [wishlist] = useState({
    saved_plants: [...userData.saved_plants, plantId]
  })
  // const submit = async () => {
  //   const id = window.localStorage.getItem('id')
  //   console.log('updated wish list', wishlist)
  //   try {
  //     await axios.put(
  //     `/api/auth/${id}/`,
  //     wishlist, {
  //       headers: {
  //         Authorization: `Bearer ${getTokenFromLocalStorage()}`
  //       }
  //     }
  //     )
  //   } catch (err) {
  //     console.log('error', err)
  //   }
  // }
  if (!wishlist) return ''
  const addToWishlist = async () => {
    const id = window.localStorage.getItem('id')
    await axios.put(
          `/api/auth/${id}/`,
          wishlist, {
            headers: {
              Authorization: `Bearer ${getTokenFromLocalStorage()}`
            }
          }
    )
  }
  return (
    <Button variant="primary" className="about-button" size="sm" onClick={addToWishlist}>
      Save to Profile
    </Button>
  )
}
export default PlantWishList
