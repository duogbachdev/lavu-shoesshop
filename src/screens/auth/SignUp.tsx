import { Button, Card, Checkbox, Form, Image, Input, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin'

const { Title, Paragraph, Text } = Typography

const SignUp = () => {
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
          <Title level={2}>Create an account</Title>
          <Paragraph type='secondary'>
            Start your 30-day free trial.
          </Paragraph>
        </div>

        <Form layout='vertical' form={form} onFinish={handleLogin} disabled={isLoading} size='large'>
          <Form.Item
            name={'name'}
            label='Name' rules={[
              {
                required: true,
                message: 'Please input your name!'
              },
            ]}>
            <Input allowClear placeholder='Enter your name' />
          </Form.Item>

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
            <Input.Password max={100} type='email' placeholder='Create a password' />
          </Form.Item>
        </Form>



        <div className="mt-4 mb-3">
          <Button onClick={() => form.submit()} type='primary' style={{ width: '100%', backgroundColor: 'rgb(241, 94, 43)' }} size='large'>Login</Button>
        </div>

        <SocialLogin />
        <div className="mt-4 text-center">
          <Space>
            <Text type='secondary'>Already have an account?</Text>
            <Link to={'/login'} style={{ color: 'rgb(241, 94, 43)' }}>Log in</Link>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default SignUp