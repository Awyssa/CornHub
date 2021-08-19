/* eslint-disable react/prop-types */

import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'

const WeekWeather = ({ weather }) => {
  return (
  <>
    <p className="scroll-message-weather">Scoll on the box to see more weather information!</p>
      <Table responsive>
    <tr>
    <div className="weatherContainer">

<div className="day">

      { weather.daily.map((item, i) => (

        <>
                  <div className="weather-day" key={i}>
          <Container>
          <>
                  <Row>
                    <Col>
                      <p>{ new Date(item.dt * 1000).toLocaleDateString() }</p>
                      <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description}/>
                      <p>{item.weather[0].description}</p>
                    </Col>
                    <Col>
                      <p>Day:  { Math.round((item.temp.day - 273.15) * 10) / 10 } &deg;C,<br/> Feels like: { Math.round((item.feels_like.day - 273.15) * 10) / 10 } &deg;C  </p>
                      <p>Evening: { Math.round((item.temp.eve - 273.15) * 10) / 10 } &deg;C,<br/> Feels like: { Math.round((item.feels_like.eve - 273.15) * 10) / 10 } &deg;C  </p>
                    </Col>

                  <Col>
                    <p>Max: { Math.round((item.temp.max - 273.15) * 10) / 10 } &deg;C <br/>Min: { Math.round((item.temp.min - 273.15) * 10) / 10 } &deg;C  </p>
                    <p>Humidity: { item.humidity}%</p>
                    <p> Sunrise { new Date(item.sunrise * 1000).toLocaleTimeString() }</p>
                    <p> Sunset { new Date(item.sunset * 1000).toLocaleTimeString() }</p>

              </Col>
            </Row>
          </>
        </Container>
        </div>
        </>
      ))}
      </div>
      </div>
    </tr>
</Table>
</>

  )
}

export default WeekWeather
