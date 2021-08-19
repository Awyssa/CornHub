/* eslint-disable react/prop-types */
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const CurrentWeather = ({ weather }) => {
  return (
    <div className="day-weather">
      <>
      <Row xs={2} md={4} lg={6}>
        <Col>
          <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].description}/>
          <p> Weather: {weather.current.weather[0].main} </p>
        </Col>
        <Col>
          <p> Temp: {Math.round((weather.current.temp - 273.15) * 10) / 10} &deg;C  </p>
          <p>Humidity: {weather.current.humidity} % </p>
          <p> Sunrise { new Date(weather.current.sunrise * 1000).toLocaleTimeString() }</p>
          <p> Sunset { new Date(weather.current.sunset * 1000).toLocaleTimeString() }</p>
        </Col>
      </Row>
      </>
    </div>
  )
}

export default CurrentWeather
