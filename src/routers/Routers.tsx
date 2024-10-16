import React, { useEffect, useState } from 'react'
import MainRouter from './MainRouter'
import AuthRouter from './AuthRouter'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector, AuthState } from '../redux/reducers/authReducers'
import { localDateNames } from '../constants/appInfor'
import { Spin } from 'antd'

const Routers = () => {

  const [isLoading, setIsLoading] = useState(false)
  // Check login and password
  const auth: AuthState = useSelector(authSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const res = localStorage.getItem(localDateNames.authData)
      res && dispatch(addAuth(JSON.parse(res)))
    } catch (error) {

    }
  }

  const handleCheckToken = async () => {

  }
  return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />
}

export default Routers