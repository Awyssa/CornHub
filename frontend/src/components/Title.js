import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

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
    <div className="titleContainer">
      <div className="imageBox"></div>
      <h1 className="subtitle">{subtitle}</h1>
      <Button size="lg" href="/home" className="enterButton">Enter</Button>
    </div>
  )
}

export default Title
