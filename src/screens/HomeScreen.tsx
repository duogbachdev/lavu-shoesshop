import handleAPI from '@/apis/handleAPI'
import { authSelector, refreshToken, removeAuth } from '@/redux/reducers/authReducers'
import { Button, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  console.log(auth);

  const logOut = () => {
    message.success('Logout successfully')
    dispatch(removeAuth({}))
  }

  const getProducts = async () => {
    const api = '/store/products'

    try {
      const res = await handleAPI(api)
      console.log(res);
    } catch (error: any) {
      console.log(error)
      if (error.message === "jwt expired") {
        handleRefreshToken()
      }
    }
  }

  const handleRefreshToken = async () => {
    const api = `auth/refresh-token?id=${auth._id}`
    try {
      const res = await handleAPI(api)
      dispatch(refreshToken(res.data.token))
      console.log(res.data);
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Button onClick={getProducts}>Logout</Button>
    </div >
  )
}

export default HomeScreen