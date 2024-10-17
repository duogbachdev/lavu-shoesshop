import { appInfo } from '@/constants/appInfor'
import { Layout, Menu, MenuProps, Typography } from 'antd'
import { Box, ChartSquare, DocumentCode, Home2, ProfileCircle } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom'


type MenuItem = Required<MenuProps>['items'][number]
const { Sider } = Layout
const { Text } = Typography

const SiderComponent = () => {
  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: <Link to={'/'}>Dashboard</Link>,
      icon: <Home2 size={20} />
    },
    {
      key: 'inventory',
      label: <Link to={'/inventory'}>Inventory</Link>,
      icon: <Box size={20} />
    },
    {
      key: 'report',
      label: <Link to={'/report'}>Reports</Link>,
      icon: <ChartSquare size={20} />
    },
    {
      key: 'supplier',
      label: <Link to={'/supplier'}>Suppliers</Link>,
      icon: <ProfileCircle size={20} />
    },
    {
      key: 'order',
      label: <Link to={'/order'}>Orders</Link>,
      icon: <Box size={20} />
    },
    {
      key: 'manage-store',
      label: <Link to={'/manage-store'}>Manage Store</Link>,
      icon: <DocumentCode size={20} />
    }
  ]
  return (
    <Sider theme='light' style={{ height: '100vh' }} width={260}>
      <div className="p-2 d-flex align-items-center">
        <img src={appInfo.logo} alt="" style={{ width: '50px', height: '50px' }} />
        <Text style={{
          fontWeight: 600,
          fontSize: '20px',
          color: '#F15E2B'
        }}>{appInfo.title}</Text>
      </div>
      <Menu items={items} theme='light' />
    </Sider>
  )
}

export default SiderComponent