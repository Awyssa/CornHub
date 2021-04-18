import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'

export const Home = () => {
  const [plantData, setPlantData] = useState(null)
  const [thisDate, setThisDate] = useState(null)
  const [allTypes, setAllTypes] = useState(null)

  useEffect(() => {
    const now = new Date()
    setThisDate(now)
    const getData = async () => {
      const response = await axios.get('/api/plants/')
      setPlantData(response.data)
      console.log('clog1', response.data)
      const types = response.data.map(plant => {
        return plant.type
      })
      setAllTypes([...new Set(types)])
    }
    getData()
    console.log('clog2', plantData)
  }, [])

  if (!allTypes) return null
  console.log(allTypes)
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
    <Table responsive>
  <thead>
    <tr>
      <th>Sow in {thisDate.toLocaleString('default', { month: 'long' })}:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      {plantData.filter(plant => {
        return plant.sow_month === thisDate.getMonth()
      }).map(plant => (
        <td key={plant.id}>
          <p>{plant.name}</p>
          <img src={plant.image}></img>
        </td>
      ))}
    </tr>
    </tbody>
</Table>
</div>
}
{!plantData
  ? <p> loading... </p>
  : <div>
    <Table responsive>
  <thead>
    <tr>
      <th>Plant out in {thisDate.toLocaleString('default', { month: 'long' })}:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      {plantData.filter(plant => {
        return plant.plant_month === thisDate.getMonth()
      }).map(plant => (
        <td key={plant.id}>
          <p>{plant.name}</p>
          <img src={plant.image}></img>
        </td>
      ))}
    </tr>
    </tbody>
</Table>
</div>
}
{!plantData
  ? <p> loading... </p>
  : <div>
    <Table responsive>
  <thead>
    <tr>
      <th>Harvest in {thisDate.toLocaleString('default', { month: 'long' })}:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      {plantData.filter(plant => {
        return plant.harvest_month === thisDate.getMonth()
      }).map(plant => (
        <td key={plant.id}>
          <p>{plant.name}</p>
          <img src={plant.image}></img>
        </td>
      ))}
    </tr>
    </tbody>
</Table>
</div>
}
    </div>
  )
}

export default Home
