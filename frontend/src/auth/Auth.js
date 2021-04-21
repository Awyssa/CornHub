import React from 'react'
import Login from './Login'
import Register from './Register'

const Auth = () => {
  return (

    <div className="auth-container">
      <div className="auth-page">
      <Register/>
      </div>
      <div className="auth-page">
      <Login/>
      </div>
    </div>
  )
}

export default Auth
