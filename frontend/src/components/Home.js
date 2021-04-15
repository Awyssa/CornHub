import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Home = () => {
  const [plantData, setPlantData] = useState(null)

  useEffect(() => {
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
          <p>{plantData[0].id}</p>
        <p>{plantData[0].name}</p>
        <p>{plantData[0].image}</p>
        <p>{plantData[0].sunlight}</p>
        <p>{plantData[0].owner.username}</p>
        </div>
      }
    </div>
  )
}

export default Home
