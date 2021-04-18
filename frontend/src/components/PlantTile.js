/* eslint-disable react/prop-types */
import React from 'react'

const PlantTile = (props) => {
  return (
<td>
          <p>{props.name}</p>
          <p>{props.type}</p>
          <p>{props.subspecies}</p>
          <img src={props.image}></img>
        </td>
  )
}
export default PlantTile
