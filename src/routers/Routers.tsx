import React from 'react'
import MainRouter from './MainRouter'
import AuthRouter from './AuthRouter'

const Routers = () => {
  // Check login and password
  return 1 < 2 ? <AuthRouter /> : <MainRouter />
}

export default Routers