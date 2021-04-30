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
      const response = await axios.get(`/api/plants/${params.id}/`)
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
  const handleLog = () => {
    history.push('/auth')
  }
  if (!onePlant) return null
  return (
    <div className="plantshow">
    <h2>{onePlant.plant_name}</h2>
    <h3>{onePlant.type}</h3>
    <h3 className="science">{onePlant.subspecies}</h3>
    <img src={onePlant.image} />
    <p className="science">{onePlant.description}</p>
    {onePlant.sow_month !== 12
      ? <p>Sow in: {monthNames[onePlant.sow_month]}</p>
      : <p></p>
}
{onePlant.plant_month !== 12
  ? <p>Plant out in: {monthNames[onePlant.plant_month]}</p>
  : <p></p>
}
{onePlant.harvest_month !== 12
  ? <p>Harvest in: {monthNames[onePlant.harvest_month]}</p>
  : <p></p>
}
    <p>Sunlight requirements: {onePlant.sunlight}</p>
    <p>Soil type: {onePlant.soil_acidity}</p>
    {onePlant.watering_frequency > 0
      ? <p>Water every {onePlant.watering_frequency} days</p>
      : <p></p>
}
    {onePlant.fertilizing_frequency > 0
      ? <p>Fertilize every {onePlant.fertilizing_frequency} days with {onePlant.fertilizer_type}</p>
      : <p>Fertilize once before sowing with {onePlant.fertilizer_type}</p>
    }
    {onePlant.germination_temperature !== 1000
      ? <p>Ideal germination temperature: {onePlant.germination_temperature}°C</p>
      : <p></p>
}
    <p>Difficulty rating: {onePlant.difficulty}/5</p>
    {onePlant.verified_by_admin === false
      ? <p className="not-yet">Not yet verified by CornHub</p>
      : <p></p>
    }
    <div className="button-holder">
    {!userData
      ? <Button variant="primary" className="about-button" size="sm" onClick={handleLog}>
      Log in to Save!
    </Button>
      : <PlantWishList
        userData={userData}
        plantId={params.id}
       />
}
<Button variant="primary" className="about-button" size="sm" onClick={handleClick}>
      Back
    </Button>
    </div>
    </div>
  )
}
export default PlantShow
