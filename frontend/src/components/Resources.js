import React from 'react'
import { Container } from 'react-bootstrap'

const Resources = () => {
  return (
    <Container className="resources-page">
      <Container className="spotify">
        <iframe src="https://open.spotify.com/embed/playlist/3B73vSUPTr7RljzlpF1wcV" width="300" height="380" allowtransparency="true" allow="encrypted-media"></iframe>
      </Container>
        <Container className="res-info">
        <Container className="resources-item">
        <img src="https://www.southdevonchillifarm.co.uk/images/logos/1/logo.png"/>
        <a href="https://www.southdevonchillifarm.co.uk/" target="blank" >South Devon Chilli Farm </a>
        </Container>
        <Container className="resources-item">
        <img src="https://cdn.shopify.com/s/files/1/0379/6015/5267/files/Plants_House_Logo-01_x100.png?v=1588625584"/>
        <a href="https://theplantwarehouse.co.uk/" target="blank" >Plant Warehouse London</a>
        </Container>
        <Container className="resources-item">
        <img src="https://n1gardencentre.co.uk/wp-content/uploads/2019/02/logo-3.png"/>
        <a href="https://n1gardencentre.co.uk/" target="blank" >N1 Garden Center</a>
        </Container>
      </Container>
    </Container>
  )
}

export default Resources
