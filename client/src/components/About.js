import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'

const About = () => {
  return (
  <Container className="about-container">
    <Container className="about-card">
      <Container className="about-image-container">
      <Card.Img fluid variant="top" src="https://res.cloudinary.com/cornhub/image/upload/v1618923591/About/img_4304_ldpygi.jpg"/>
      </Container>
      <Card.Body>
        <Card.Title> Patrick Tapio Johnson </Card.Title>
        <Card.Text>
          <p>Software Developer from London, England</p>
          <p>Likes: Cello, Dad Jokes</p>
        </Card.Text>
        <Container className="about-links">
          <Button className="about-button" variant="primary" href="https://www.linkedin.com/in/patrick-tapio-johnson/" target="_blank">LinkedIn</Button>
          <Button className="about-button" variant="primary" href="https://github.com/PaddyCello" target="_blank">GitHub</Button>
        </Container>
      </Card.Body>
    </Container>
    <Container className="about-card">
      <Container className="about-image-container">
      <Card.Img fluid variant="top" src="https://res.cloudinary.com/cornhub/image/upload/v1618756749/About/deae7c6d-be83-465f-a43e-2a63b0ad7c29_wfq8li.jpg"/>
      </Container>
      <Card.Body>
        <Card.Title> Jonty Ward </Card.Title>
        <Card.Text>
          <p>Software Developer from Greater Norwich Area, England</p>
          <p>Likes: Chillis, Goats</p>
        </Card.Text>
        <Container className="about-links">
          <Button className="about-button" href="https://www.linkedin.com/in/jonty-ward-b0236164/" target="_blank">LinkedIn</Button>
          <Button className="about-button" href="https://github.com/jonty-ward" target="_blank">GitHub</Button>
        </Container>
      </Card.Body>
    </Container>
    <Container className="about-card">
      <Container className="about-image-container">
      <Card.Img fluid variant="top" src="https://res.cloudinary.com/cornhub/image/upload/v1618753594/About/Plant1_l8f0jv.jpg"/>
      </Container>
      <Card.Body>
        <Card.Title> Michael Henderson </Card.Title>
        <Card.Text>
          <p>Software Developer from London, England</p>
          <p>Likes: Sunflowers, Kate Bush</p>
        </Card.Text>
        <Container className="about-links">
          <Button className="about-button" variant="primary" href="https://www.linkedin.com/in/mhenderson24/" target="_blank">LinkedIn</Button>
          <Button className="about-button" variant="primary" href="https://github.com/Awyssa" target="_blank">GitHub</Button>
        </Container>
      </Card.Body>
    </Container>
</Container>
  )
}

export default About
