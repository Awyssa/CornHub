/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const WeatherJobs = ({ weather }) => {
  const [savedPlantData, setSavedPlantData] = useState('')
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/plants/')
      setSavedPlantData(response.data)
    }
    getData()
  }, [])
  console.log('savedPlantData', savedPlantData)

  // Working out the average temperature for the week
  const weeklyDayTempAverage = Math.round((weather.daily.map(item => {
    return item.temp.day
  }).reduce((acc, num) => {
    return acc + num
  }, 0) / 8) - 273.15)
  console.log('weeklyDayTempAverage >>>', weeklyDayTempAverage)

  // array of plants that can be germinated at this temp

  if (!savedPlantData) return ''
  const plantsToGerminateBasedOnTemp = savedPlantData.filter(item => {
    return item.germination_temperature <= weeklyDayTempAverage
  })

  return (
    <div>
      <h5 className="weather-jobs-description">The average temperature this week is going to be {weeklyDayTempAverage} &deg;C, here are some ideas of what you can germinate outside!  </h5>
      < div className="wearther-jobs-carousel">
      {plantsToGerminateBasedOnTemp.map(item => {
        return (
          <div key={item.id} className="profile-wishlist-column">
        <Link to={`/plants/${item.id}`}>
         <p> {item.name} </p>
         <img className="chilli-image-profile" src={item.image} alt={item.name}key={item.id}/>
         </Link>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default WeatherJobs
