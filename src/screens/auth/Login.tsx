import { Button, Card, Checkbox, Form, Image, Input, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin'

const { Title, Paragraph, Text } = Typography

const Login = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  const [form] = Form.useForm()

  const handleLogin = (values: { email: string, password: string }) => {
    console.log(values);
  }
  return (
    <>
      <Card style={{ width: '50%', border: 'none' }}>
        <div className="text-center">
          <Title level={2}>Log in to your account</Title>
          <Paragraph type='secondary'>
            Welcome back! Please enter your details.
          </Paragraph>
        </div>

        <Form layout='vertical' form={form} onFinish={handleLogin} disabled={isLoading} size='large'>
          <Form.Item
            name={'email'}
            label='Email' rules={[
              {
                required: true,
                message: 'Please input your email!'
              },
            ]}>
            <Input allowClear max={100} type='email' placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            name={'password'}
            label='Password' rules={[
              {
                required: true,
                message: 'Please input your password!'
              },
            ]}>
            <Input.Password max={100} type='email' placeholder='••••••••' />
          </Form.Item>
        </Form>

        <div className="row">
          <div className="col">
            <Checkbox checked={isRemember} onChange={e => setIsRemember(e.target.checked)}>Remember for 30 days</Checkbox>
          </div>
          <div className="col text-right">
            <Link to={'/forgot-password'} style={{ color: 'rgb(241, 94, 43)' }}>Forgot password?</Link>
          </div>
        </div>

        <div className="mt-4 mb-3">
          <Button onClick={() => form.submit()} type='primary' style={{ width: '100%', backgroundColor: 'rgb(241, 94, 43)' }} size='large'>Login</Button>
        </div>

        <SocialLogin />
        <div className="mt-4 text-center">
          <Space>
            <Text type='secondary'>Don't have an account?</Text>
            <Link to={'/sign-up'} style={{ color: 'rgb(241, 94, 43)' }}>Sign Up</Link>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default Login