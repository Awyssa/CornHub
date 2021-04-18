import React from 'react'
import { Container } from 'react-bootstrap'

const Spotify = () => {
  return (
    <Container className="spotify">
      <iframe src="https://open.spotify.com/embed/playlist/3B73vSUPTr7RljzlpF1wcV" width="300" height="380" allowtransparency="true" allow="encrypted-media"></iframe>
      <Container className="spotify-resource">
      <img src="https://www.southdevonchillifarm.co.uk/images/logos/1/logo.png"/>
      <a href="https://www.southdevonchillifarm.co.uk/" target="blank" >South Devon Chilli Farm </a>
      </Container>
    </Container>
  )
}

export default Spotify
