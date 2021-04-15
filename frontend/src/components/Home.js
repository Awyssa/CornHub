import React, { useEffect, useState } from 'react'
// import axios from 'axios'

export const Home = () => {
  const [plantData, setPlantData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('/api/plants')
        const json = await resp.json()
        if (json.sucess) {
          setPlantData(json.plants)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
    console.log(plantData)
  }, [])

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await axios.get('/api/plants')
  //     setPlantData(response.data)
  //     console.log('clog1', response.data)
  //   }
  //   getData()
  //   console.log('clog2', plantData)
  // }, [])

  return (
    <div>
      <p> welcome to the home page</p>
      {/* <p>{plantData.id}</p> */}
    </div>
  )
}

export default Home
