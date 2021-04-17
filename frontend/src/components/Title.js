import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'

const Title = () => {
  const subtitles = ['For hardcore gardeners.', 'Nothing seedy... only plants.', 'Full of photos of dirty, filthy... root vegetables.']
  const [subtitle, setSubtitle] = useState(subtitles[0])

  useEffect(() => {
    const changeSub = () => {
      setSubtitle(subtitles[Math.floor(Math.random() * 3)])
    }
    changeSub()
  }, [])

  return (
    <Container className="titleContainer">
      <div className="imageBox"></div>
      <h1>{subtitle}</h1>
      <Button variant="secondary" size="lg" href='/home'>Enter</Button>
    </Container>
  )
}

export default Title
