import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import PlantWishList from './PlantWishList'

const PlantShow = () => {
  const [onePlant, setOnePlant] = useState(null)
  const [userData, setUserData] = useState(null)
  // const [wishlist, setUpdateWishlist] = useState({
  //   saved_plants: []
  // })
  const params = useParams()
  useEffect(() => {
    const getOnePlant = async () => {
      const response = await axios.get(`/api/plants/${params.id}`)
      setOnePlant(response.data)
    }
    getOnePlant()
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
  // const addToWishlist = (event) => {
  //   // console.log('event.target.value', params.id)
  //   const filteredWishlistConst = userData.saved_plants.push(params.id)
  //   // // wishlist.push(params.id)
  //   // console.log('wishlist', wishlist)
  //   // console.log('filtered wishlist ', filteredWishlistConst)
  //   const newWishList = { saved_plants: filteredWishlistConst }
  //   // setUpdateWishlist(newWishList)
  //   setUpdateWishlist(newWishList)
  //   console.log(wishlist)
  //   submit(wishlist)
  // }
  if (!onePlant) return null
  return (
    <>
    <h2>{onePlant.name}</h2>
    <h3>{onePlant.type}</h3>
    <h3 className="science">{onePlant.subspecies}</h3>
    {!userData
      ? <h1>Log in to save to profile!</h1>
      : <PlantWishList
        userData={userData}
        plantId={params.id}
       />
}
    </>
  )
}
export default PlantShow
