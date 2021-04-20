import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Form, FormControl, Carousel, Container } from 'react-bootstrap'
import PlantTile from './PlantTile'

export const Home = () => {
  const [plantData, setPlantData] = useState(null)
  const [thisDate, setThisDate] = useState(null)
  const [difficulty, setDifficulty] = useState(5)
  const [rightPlants, setRightPlants] = useState(null)
  // const [allTypes, setAllTypes] = useState(null)
  const [randomPlants, setRandomPlants] = useState(null)

  useEffect(() => {
    const now = new Date()
    setThisDate(now)
    const getData = async () => {
      const response = await axios.get('/api/plants/')
      setPlantData(response.data)
      setRightPlants(response.data)
      console.log('clog1', response.data)
      const randomNums = []
      for (let i = 0; randomNums.length <= 5; i++) {
        const num = Math.floor(Math.random() * response.data.length)
        if (!randomNums.includes(num)) {
          randomNums.push(num)
        }
      }
      console.log(randomNums)
      const coolPlants = response.data.filter((item, index) => {
        return randomNums.includes(index)
      })
      setRandomPlants(coolPlants)
      console.log(coolPlants)
      // const types = response.data.map(plant => {
      //   return plant.type
      // })
      // setAllTypes([...new Set(types)])
    }
    getData()
    console.log('clog2', plantData)
  }, [])
  const handleChange = (event) => {
    setDifficulty(Number(event.target.value))
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
    <>
      {!plantData || !rightPlants || !randomPlants
        ? <p> loading... </p>
        : <>
        <Container className="carousel-box">
          <Carousel>

            {randomPlants.map(plant => {
              return <Carousel.Item key={plant.id}>
              <img
                className="d-block w-100"
                src={plant.image}
                alt={plant.name}
              />
              <Carousel.Caption>
                <h3>{plant.name}</h3>
                <p>{plant.subspecies}</p>
              </Carousel.Caption>
            </Carousel.Item>
            })}
          </Carousel>
          </Container>
  {/* <thead> */}
    <div className="searches">
      <div className="dropdown">
    <Form.Label className="search-label">Choose By Difficulty!</Form.Label>
  <Form.Control as="select" onChange={handleChange}>
    <option value="5">Master (All Plants)</option>
    <option value="4">Hard</option>
    <option value="3">Medium</option>
    <option value="2">Easy</option>
    <option value="1">Beginner</option>
  </Form.Control>
  </div>
  <div className="dropdown">
  <Form.Label className="search-label">Search for a Plant!</Form.Label>
    <FormControl
      placeholder="Search"
      aria-label="Search"
      aria-describedby="basic-addon1"
      onChange={handleSearch}
    />
  </div>
  </div>
  {/* <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>Search for a Plant!</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="Search for a Plant!" onChange={handleSearch} />
  </InputGroup> */}
  {/* </tr>
  </thead> */}
  <Table responsive>
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
        </>
      }
    {!plantData
      ? <p> loading... </p>
      : <div>
    <Table responsive>
    <tr>
      <th className="month-scroll">Sow in {thisDate.toLocaleString('default', { month: 'long' })}:</th>
    </tr>
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
    <tr>
      <th className="month-scroll">Plant out in {thisDate.toLocaleString('default', { month: 'long' })}:</th>
    </tr>
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
    <tr>
      <th className="month-scroll">Harvest in {thisDate.toLocaleString('default', { month: 'long' })}:</th>
    </tr>
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
    </>
  )
}

export default Home
