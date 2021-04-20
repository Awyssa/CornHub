import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import PlantWishList from './PlantWishList'
import { Button } from 'react-bootstrap'

const PlantShow = () => {
  const [onePlant, setOnePlant] = useState(null)
  const [userData, setUserData] = useState(null)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const params = useParams()
  const history = useHistory()
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
  const handleClick = () => {
    console.log(history)
    history.goBack()
  }
  if (!onePlant) return null
  return (
    <>
    <h2>{onePlant.name}</h2>
    <h3>{onePlant.type}</h3>
    <h3 className="science">{onePlant.subspecies}</h3>
    <img src={onePlant.image} />
    <p>{onePlant.description}</p>
    <p>Sow in: {monthNames[onePlant.sow_month]}</p>
    <p>Plant out in: {monthNames[onePlant.plant_month]}</p>
    <p>Harvest in: {monthNames[onePlant.harvest_month]}</p>
    <p>Sunlight requirements: {onePlant.sunlight}</p>
    <p>Soil type: {onePlant.soil_acidity}</p>
    <p>Water every {onePlant.watering_frequency} days</p>
    <p>Fertilize every {onePlant.fertilizing_frequency} days with {onePlant.fertilizer_type}</p>
    <p>Ideal germination temperature: {onePlant.germination_temperature}°C</p>
    <p>Difficulty rating: {onePlant.difficulty}/5</p>
    {onePlant.verified_by_admin === false
      ? <p>Not yet verified by CornHub</p>
      : <p>Verified by CornHub</p>
    }
    {!userData
      ? <h1>Log in to save to profile!</h1>
      : <PlantWishList
        userData={userData}
        plantId={params.id}
       />
}
<Button variant="primary" className="about-button" size="sm" onClick={handleClick}>
      Back to Plants!
    </Button>
    </>
  )
}
export default PlantShow
