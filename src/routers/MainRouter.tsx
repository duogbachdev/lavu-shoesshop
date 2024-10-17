import { HeaderComponent } from '@/components'
import SiderComponent from '@/components/SiderComponent'
import { ManagerStore, Order, Report, Supplier } from '@/screens'
import HomeScreen from '@/screens/HomeScreen'
import Inventory from '@/screens/Inventory'
import { Layout } from 'antd'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const { Content, Footer, Header, Sider } = Layout

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <SiderComponent />
        <Layout>
          <HeaderComponent />
          <Content className='mt-3 container bg-white'>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/inventory' element={<Inventory />} />
              <Route path='/report' element={<Report />} />
              <Route path='/supplier' element={<Supplier />} />
              <Route path='/order' element={<Order />} />
              <Route path='/manage-store' element={<ManagerStore />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default MainRouter