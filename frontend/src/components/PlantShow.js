import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'

const PlantShow = () => {
  const [onePlant, setOnePlant] = useState(null)
  const params = useParams()
  useEffect(() => {
    const getOnePlant = async () => {
      const response = await axios.get(`/api/plants/${params.id}`)
      setOnePlant(response.data)
    }
    getOnePlant()
  }, [])
  const handleClick = (event) => {
    console.log(event)
  }
  if (!onePlant) return null
  return (
    <>
    <h1>Hey, Im a plant!</h1>
    <h2>{onePlant.name}</h2>
    <Button variant="primary" size="sm" onClick={handleClick}>
      Save to Profile
    </Button>{' '}
    </>
  )
}
export default PlantShow
