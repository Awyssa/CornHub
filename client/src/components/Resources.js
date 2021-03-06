import React from 'react'
import { Container } from 'react-bootstrap'

const Resources = () => {
  return (
    <Container className="resources-page">
      <Container className="spotify">
        <p>CornHub Spotify Playlist</p>
        <iframe src="https://open.spotify.com/embed/playlist/3B73vSUPTr7RljzlpF1wcV" width="400" height="500" allowtransparency="true" allow="encrypted-media"></iframe>
        <img src="https://res.cloudinary.com/cornhub/image/upload/v1618923742/About/mushroom_cwmuus.webp" />
      </Container>
        <Container className="res-info">
          <Container className="resources-item">
          <p>Some of our Favourite Links</p>
          </Container>
        <Container className="resources-item">
        <a href="https://www.southdevonchillifarm.co.uk/" target="blank" >
        <img src="https://www.southdevonchillifarm.co.uk/images/logos/1/logo.png"/>
        </a>
        </Container>
        <Container className="resources-item">
        <a href="https://theplantwarehouse.co.uk/" target="blank" >
        <img src="https://cdn.shopify.com/s/files/1/0379/6015/5267/files/Plants_House_Logo-01_x100.png?v=1588625584"/>
        </a>
        </Container>
        <Container className="resources-item">
        <a href="https://n1gardencentre.co.uk/" target="blank" >
        <img src="https://n1gardencentre.co.uk/wp-content/uploads/2019/02/logo-3.png"/>
        </a>
        </Container>
        <Container className="resources-item">
        <a href="https://www.otterfarm.co.uk/" target="blank" >
        <img src="https://www.otterfarm.co.uk/wp-content/uploads/2016/10/otterfarmlogo-grey.png"/>
        </a>
        </Container>
      </Container>
    </Container>
  )
}

export default Resources
