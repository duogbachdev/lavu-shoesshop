import { Button, Card, Checkbox, Form, Input, message, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import handleAPI from '@/apis/handleAPI'
import { addAuth } from '@/redux/reducers/authReducers'
import { localDateNames } from '@/constants/appInfor'
import SocialLogin from './components/SocialLogin'

const { Title, Paragraph, Text } = Typography

const Login = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleLogin = async (values: { email: string; password: string }) => {
    console.log(values);
    setIsLoading(true)
    try {
      const res: any = await handleAPI('/auth/login', values, 'post');
      message.success(res.message)
      res.data && dispatch(addAuth(res.data))

      if (isRemember) {
        localStorage.setItem(localDateNames.authData, JSON.stringify(res.data))
      }
    } catch (error: any) {
      message.error(error.message)
      // toast.error(error.message)
      console.log(error.message);
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <>
      <Card style={{ width: '50%', border: 'none' }}>
        <div className="text-center">
          <img src={'https://firebasestorage.googleapis.com/v0/b/lavvu-shoesshop.appspot.com/o/lavu-logo.png?alt=media&token=9c03e1fe-833e-4072-92ae-e50e56a8979d'} alt="" style={{ width: '80px', height: '80px' }} />
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
            <Link to={'/forgot-password'} style={{ color: '#F15E2B' }}>Forgot password?</Link>
          </div>
        </div>

        <div className="mt-4 mb-3">
          <Button loading={isLoading} onClick={() => form.submit()} type='primary' style={{ width: '100%', backgroundColor: '#F15E2B' }} size='large'>Log in</Button>
        </div>

        <SocialLogin isRemember={isRemember} />
        <div className="mt-4 text-center">
          <Space>
            <Text type='secondary'>Don't have an account?</Text>
            <Link to={'/sign-up'} style={{ color: '#F15E2B' }}>Sign Up</Link>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default Login