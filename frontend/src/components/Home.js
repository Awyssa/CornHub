import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Home = () => {
  const [plantData, setPlantData] = useState(null)
  const [month, setMonth] = useState(null)

  useEffect(() => {
    const currentMonth = new Date().getMonth()
    setMonth(currentMonth)
    const getData = async () => {
      const response = await axios.get('/api/plants/')
      setPlantData(response.data)
      console.log('clog1', response.data)
    }
    getData()
    console.log('clog2', plantData)
  }, [])

  return (
    <div>
      <p> welcome to the home page</p>
      {!plantData
        ? <p> loading... </p>
        : <div>
          {plantData.map(plant => {
            return (
              <>
            <p key={plant.id}>{plant.name}</p>
            <img className="plant-home-image" src={plant.image}></img>
            <p>{plant.description}</p>
            </>
            )
          })}
        </div>
      }
      {!plantData
        ? <p> loading... </p>
        : <div>
      {plantData.filter(plant => {
        return plant.sow_month === month
      }).map(filteredPlant => {
        return <p key={filteredPlant.id}>{filteredPlant.name}</p>
      })}
      </div>
    }
    </div>
  )
}

export default Home
