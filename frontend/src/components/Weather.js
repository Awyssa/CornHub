import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
import CurrentWeather from '../weather/CurrentWeather'
import WeekWeather from '../weather/WeekWeather'

const Weather = () => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState('current')
  const [viewport, setViewport] = useState('')
  const [formData, setFormData] = useState(null)
  const [inputLocationChoice, setInputLocationChoice] = useState(null)

  // handlers for the manual location input form
  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setInputLocationChoice(formData.location)
  }

  // this is creating latitude and longitude based on the users current location
  useEffect(() => {
    // console.log(window.navigator)
    window.navigator.geolocation.getCurrentPosition(position => {
      console.log('position', position)
      const { longitude, latitude } = position.coords
      setViewport({ longitude, latitude })
    })
  }, [])

  // This is the request to geocode a place name into long and lat- i have made this link ot the form

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputLocationChoice}.json?access_token=pk.eyJ1IjoiandhcmQwMzk1IiwiYSI6ImNrbXFnM3l3azJvNHgyb256N2U3NGY1NnUifQ.j9Q8uNoEEO0GBonf6TLoew`)
      setViewport({ longitude: data.features[0].geometry.coordinates[0], latitude: data.features[0].geometry.coordinates[1] })
      console.log('data from geocoding', data)
    }
    getData()
  }, [inputLocationChoice])

  // this is the get request for the weather data for the location we have specified
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${viewport.latitude}&lon=${viewport.longitude}&exclude=hourly,minutely&appid=c7b22e378e8404d1ac5d214062e5f766`)
      setWeather(data)
    }
    getData()
  }, [viewport])

  // This allows us to switch between current weather and 7 day forecast
  const handleWeather = (event) => {
    if (event.target.value === 'current') setForecast('current')
    if (event.target.value === 'week') setForecast('week')
  }

  const weatherForecastFunction = () => {
    if (forecast === 'week') {
      return <WeekWeather
        weather = {weather}
      />
    }
  }

  if (!weather) return 'Loading'

  return (
<>
<Container>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicLocation">
        <Form.Label>Enter location</Form.Label>
        <Form.Control type="text" placeholder="Enter location"
            className="text-muted"
            id="location"
            name="location"
            value={setFormData.location}
            onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
      </Container>
    <div>
      <div className="ui buttons">
        <Button value="current" variant="primary" onClick={handleWeather}>Current Weather</Button>
        <div className="or"></div>
        <Button value="week" variant="primary"onClick={handleWeather}>7 Day Forecast</Button>
      </div>
      {forecast === 'current'
        ? <CurrentWeather
          weather = {weather}
        />
        : weatherForecastFunction()
      }
    </div>
    </>

  )
}

export default Weather
