import React, { useState } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { useHistory } from 'react-router-dom'

const NewPlant = () => {
  const [formData, setFormData] = useState({
    plant_name: '',
    subspecies: '',
    type: '',
    sow_month: 12,
    plant_month: 12,
    harvest_month: 12,
    sunlight: '',
    soil_acidity: '',
    watering_frequency: 0,
    fertilizing_frequency: 1000,
    fertilizer_type: '',
    germination_temperature: 0,
    image: '',
    description: '',
    difficulty: 5,
    owner: '',
    verified_by_admin: false
  })
  const [success, setSuccess] = useState(false)
  const [showA, setShowA] = useState(false)
  const history = useHistory()
  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }
  const handleMonth = (event) => {
    const newFormData = { ...formData, [event.target.name]: Number(event.target.value) }
    console.log(newFormData)
    setFormData(newFormData)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/plants/', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      console.log(response)
      setSuccess(true)
      setShowA(false)
    } catch (err) {
      console.log('err', err.response.data)
      setShowA(true)
    }
  }
  const handleClick = () => {
    history.goBack()
  }
  const handleMore = () => {
    setSuccess(false)
  }

  return (
    <Container className="login-box add-plant">
      {!success
        ? <Form className="auth-form" onSubmit={handleSubmit}>
        <h2>Help us make our app better by contributing more plants.</h2>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter plant name"
            className="text-muted"
            id="post-plant-name"
            name="plant_name"
            value={setFormData.plant_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSubspecies">
        <Form.Label>Subspecies</Form.Label>
        <Form.Control
          placeholder="Enter subspecies"
          className="text-muted"
          id="post-plant-subspecies"
          type="text"
          name="subspecies"
          value={setFormData.subspecies}
          onChange={handleChange}
        />
        </Form.Group>
        <Form.Group controlId="formBasicType">
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" placeholder="Enter type of plant"
            className="text-muted"
            id="post-plant-type"
            name="type"
            value={setFormData.type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSowMonth">
        <Form.Label>Sowing Month</Form.Label>
        {/* <Form.Control
          placeholder="Enter sowing month"
          className="text-muted"
          id="post-plant-sow-month"
          type="number"
          name="sow_month"
          value={setFormData.sow_month}
          onChange={handleChange}
        /> */}
        <Form.Control
        as="select"
        name="sow_month"
        onChange={handleMonth}>
    <option value="12">Please select</option>
    <option value="0">January</option>
    <option value="1">February</option>
    <option value="2">March</option>
    <option value="3">April</option>
    <option value="4">May</option>
    <option value="5">June</option>
    <option value="6">July</option>
    <option value="7">August</option>
    <option value="8">September</option>
    <option value="9">October</option>
    <option value="10">November</option>
    <option value="11">December</option>
  </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicPlantMonth">
        <Form.Label>Planting Month</Form.Label>
        {/* <Form.Control
          placeholder="Enter planting month"
          className="text-muted"
          id="post-plant-plant-month"
          type="number"
          name="plant_month"
          value={setFormData.plant_month}
          onChange={handleChange}
        /> */}
        <Form.Control
        as="select"
        name="plant_month"
        onChange={handleMonth}>
    <option value="12">Please select</option>
    <option value="0">January</option>
    <option value="1">February</option>
    <option value="2">March</option>
    <option value="3">April</option>
    <option value="4">May</option>
    <option value="5">June</option>
    <option value="6">July</option>
    <option value="7">August</option>
    <option value="8">September</option>
    <option value="9">October</option>
    <option value="10">November</option>
    <option value="11">December</option>
    </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicHarvestMonth">
        <Form.Label>Harvesting Month</Form.Label>
        {/* <Form.Control
          placeholder="Enter harvesting month"
          className="text-muted"
          id="post-plant-harvest-month"
          type="number"
          name="harvest_month"
          value={setFormData.harvest_month}
          onChange={handleChange}
        /> */}
         <Form.Control
        as="select"
        name="harvest_month"
        onChange={handleMonth}>
    <option value="12">Please select</option>
    <option value="0">January</option>
    <option value="1">February</option>
    <option value="2">March</option>
    <option value="3">April</option>
    <option value="4">May</option>
    <option value="5">June</option>
    <option value="6">July</option>
    <option value="7">August</option>
    <option value="8">September</option>
    <option value="9">October</option>
    <option value="10">November</option>
    <option value="11">December</option>
    </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicSunlight">
          <Form.Label>Sunlight Requirements</Form.Label>
          <Form.Control type="text" placeholder="Enter sunlight requirements"
            className="text-muted"
            id="post-plant-sunlight"
            name="sunlight"
            value={setFormData.sunlight}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAcidity">
        <Form.Label>Soil Acidity Requirements</Form.Label>
        <Form.Control
          placeholder="Enter soil acidity requirements"
          className="text-muted"
          id="post-plant-acidity"
          type="text"
          name="soil_acidity"
          value={setFormData.soil_acidity}
          onChange={handleChange}
        />
        </Form.Group>
        <Form.Group controlId="formBasicWatering">
        <Form.Label>Watering Frequency</Form.Label>
        <Form.Control
          placeholder="Enter watering frequency in days"
          className="text-muted"
          id="post-plant-plant-watering"
          min="1"
          type="number"
          name="watering_frequency"
          value={setFormData.watering_frequency}
          onChange={handleChange}
        />
        </Form.Group>
        <Form.Group controlId="formBasicFertFreq">
        <Form.Label>Fertilizing Frequency (enter 0 if only once before sowing)</Form.Label>
        <Form.Control
          placeholder="Enter fertilizing frequency in days"
          className="text-muted"
          id="post-plant-fert-freq"
          min="0"
          type="number"
          name="fertilizing_frequency"
          value={setFormData.fertilizing_frequency}
          onChange={handleChange}
        />
        </Form.Group>
        <Form.Group controlId="formBasicFertType">
          <Form.Label>Type of Fertilizer Required</Form.Label>
          <Form.Control type="text" placeholder="Enter fertilizer requirements"
            className="text-muted"
            id="post-plant-fert-type"
            name="fertilizer_type"
            value={setFormData.fertilizer_type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicGermination">
        <Form.Label>Germination Temperature</Form.Label>
        <Form.Control
          placeholder="Enter germination temperature in Celsius"
          className="text-muted"
          id="post-plant-germination"
          min="0"
          type="number"
          name="germination_temperature"
          value={setFormData.germination_temperature}
          onChange={handleChange}
        />
        </Form.Group>
        <Form.Group controlId="formBasicImage">
        <Form.Label>Add URL For Plant Image</Form.Label>
        <Form.Control
          placeholder="Enter image url"
          className="text-muted"
          id="post-plant-image"
          type="text"
          name="image"
          value={setFormData.image}
          onChange={handleChange}
        />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
    <Form.Label>Add a Description of Your Plant</Form.Label>
    <Form.Control
    as="textarea"
    rows={3}
    placeholder="Enter description"
    className="text-muted"
    type="text"
    name="description"
    value={setFormData.description}
    onChange={handleChange}
     />
  </Form.Group>
  <Form.Group controlId="formBasicDifficulty">
        <Form.Label>Difficulty Out of Five</Form.Label>
        <Form.Control
          placeholder="Enter difficulty (5 if left blank)"
          className="text-muted"
          id="post-plant-difficulty"
          min="1"
          max="5"
          type="number"
          name="difficulty"
          value={setFormData.difficulty}
          onChange={handleChange}
        />
        </Form.Group>
        <Button className="auth-button" type="submit">
          Submit
        </Button>
      </Form>
        : <div className="success">
      <h1>Thanks so much!</h1>
      <br></br>
      <h2>Add another?</h2>
      <Button className="auth-button" type="button" onClick={handleMore}>
          Add More!
        </Button>
        </div>
        }
        {!showA
          ? <p></p>
          : <p className="not-yet">Oops, I think you missed something.</p>
        }
      <Button className="auth-button back-button" type="button" onClick={handleClick}>
          Back to Profile
        </Button>
       </Container>
  )
}
export default NewPlant
