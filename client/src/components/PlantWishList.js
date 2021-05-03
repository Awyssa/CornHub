/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { getTokenFromLocalStorage } from '../helpers/auth'
import axios from 'axios'

const PlantWishList = ({ plantId, userData }) => {
  console.log('plant id', plantId)
  const [wishlist] = useState({
    saved_plants: [...userData.saved_plants, plantId]
  })
  const [savedText, setSavedText] = useState('Save to Profile')

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
    setSavedText('Saved!')
  }
  return (
    <Button variant="primary" className="about-button" size="sm" onClick={addToWishlist}>
      {savedText}
    </Button>
  )
}
export default PlantWishList
