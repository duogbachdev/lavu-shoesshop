import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Typography } from 'antd'
import { Login, SignUp } from '@/screens'

const { Title } = Typography

const AuthRouter = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-none d-lg-block text-center" style={{ marginTop: '15%' }}>
          <div>
            <img src={'https://firebasestorage.googleapis.com/v0/b/lavvu-shoesshop.appspot.com/o/lavu-logo.png?alt=media&token=9c03e1fe-833e-4072-92ae-e50e56a8979d'} alt="" style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
          </div>
          <div>
            <Title style={{ color: 'rgb(241, 94, 43)' }}>LAVU's SHOESSHOP</Title>
          </div>
        </div>

        <div className="col content-center">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/sign-up' element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default AuthRouter