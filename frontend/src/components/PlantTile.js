/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const PlantTile = (props) => {
  return (
<td>
  <Link to={`/plants/${props.id}`}>
          <p className="tile-title">{props.name}</p>
          <p>{props.type}</p>
          <p className="science">{props.subspecies}</p>
          <img src={props.image} className="plant-home-image"></img>
          </Link>
        </td>
  )
}
export default PlantTile
