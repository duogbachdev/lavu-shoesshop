import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../redux/reducers/authReducers'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(removeAuth({}))
  }
  return (
    <div>
      <Button onClick={logOut}>Logout</Button>
    </div>
  )
}

export default HomeScreen