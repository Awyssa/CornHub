/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'

const uploadUrl = 'https://api.cloudinary.com/v1_1/cornhub/image/upload'
const uploadPreset = 'eagiqpce'

export const ImageUploadField = () => {
  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    console.log(data)
    const res = await axios.post(uploadUrl, data)
    console.log(res)
  }
  return (
    <>
      <label> Profile Image</label>
      <input
        className="input"
        type="file"
        onChange={handleUpload}
        />
    </>
  )
}
