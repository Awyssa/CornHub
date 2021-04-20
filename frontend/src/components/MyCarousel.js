/* eslint-disable react/prop-types */
import React from 'react'
import { Carousel } from 'react-bootstrap'

const MyCarousel = (props) => {
  const { image, name, subspecies } = props
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image}
          alt={name}
        />
        <Carousel.Caption>
          <h3>{name}</h3>
          <p>{subspecies}</p>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>

  )
}
export default MyCarousel
