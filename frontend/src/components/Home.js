import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Form, FormControl, InputGroup } from 'react-bootstrap'
import PlantTile from './PlantTile'

export const Home = () => {
  const [plantData, setPlantData] = useState(null)
  const [thisDate, setThisDate] = useState(null)
  const [difficulty, setDifficulty] = useState(5)
  const [rightPlants, setRightPlants] = useState(null)
  // const [allTypes, setAllTypes] = useState(null)

  useEffect(() => {
    const now = new Date()
    setThisDate(now)
    const getData = async () => {
      const response = await axios.get('/api/plants/')
      setPlantData(response.data)
      setRightPlants(response.data)
      console.log('clog1', response.data)
      // const types = response.data.map(plant => {
      //   return plant.type
      // })
      // setAllTypes([...new Set(types)])
    }
    getData()
    console.log('clog2', plantData)
  }, [])
  // if (!allTypes) return null
  // console.log(allTypes)
  const handleChange = (event) => {
    setDifficulty(Number(event.target.value))
    // const appropriatePlants = plantData.filter(plant => {
    //   return plant.difficulty <= Number(event.target.value)
    // })
    // setRightPlants(appropriatePlants)
  }
  const handleSearch = (event) => {
    const searchList = plantData.filter(plant => {
      return plant.name.toUpperCase().includes(event.target.value.toUpperCase()) ||
      plant.subspecies.toUpperCase().includes(event.target.value.toUpperCase()) ||
      plant.type.toUpperCase().includes(event.target.value.toUpperCase())
    })
    setRightPlants(searchList)
  }
  return (
    <div>
      <p> welcome to the home page</p>
      {!plantData || !rightPlants
        ? <p> loading... </p>
        : <div>
  <Table responsive>
  <thead>
    <tr>
    <Form.Label>Choose By Difficulty!</Form.Label>
  <Form.Control as="select" onChange={handleChange}>
    <option value="5">Master (All Plants)</option>
    <option value="4">Hard</option>
    <option value="3">Medium</option>
    <option value="2">Easy</option>
    <option value="1">Beginner</option>
  </Form.Control>
  </tr>
  <tr>
  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>Search for a Plant!</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="Search for a Plant!" onChange={handleSearch} />
  </InputGroup>
  </tr>
  </thead>
  <tbody>
    <tr>
          {rightPlants.filter(plant => {
            return plant.difficulty <= difficulty
          }).map(plant => {
            return (
              <PlantTile
              key={plant.id}
              { ...plant}
              />
            )
          })}
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
      <th>Sow in {thisDate.toLocaleString('default', { month: 'long' })}:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      {plantData.filter(plant => {
        return plant.sow_month === thisDate.getMonth()
      }).map(plant => (
        <PlantTile
        key={plant.id}
        { ...plant}
        />
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
        <PlantTile
        key={plant.id}
        { ...plant}
        />
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
        <PlantTile
        key={plant.id}
        { ...plant}
        />
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
