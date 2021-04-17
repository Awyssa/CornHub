/* eslint-disable react/prop-types */
import React from 'react'

const CurrentWeather = ({ weather }) => {
  return (
    <div className="ui raised segment">
      <>

        <div className="ui grid celled center aligned">
          <div className="sixteen wide column">
            <div className="ui three column divided grid middle aligned">
              <div className="column">
                <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].description}/>
              </div>
              <div className="column">
                <p> Temperature: {Math.round((weather.current.temp - 273.15) * 10) / 10} &deg;C  </p>
              </div>
              <div className="column">
                <p> Weather: {weather.current.weather[0].main} </p>
              </div>
            </div>
          </div>
          <div className="eight wide column middle aligned">
            <p>Humidity: {weather.current.humidity} % </p>
          </div>
          <div className="eight wide column middle aligned">
            <p> Sunrise { new Date(weather.current.sunrise * 1000).toLocaleTimeString() }</p>
            <p> Sunset { new Date(weather.current.sunset * 1000).toLocaleTimeString() }</p>
          </div>

        </div>

      </>
    </div>
  )
}

export default CurrentWeather
