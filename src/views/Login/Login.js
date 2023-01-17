import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Card, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { userpassLogin } from '../../api/user'
import './Login.css'

export default function Login () {
  const navigate = useNavigate()
  const onFinish = (values) => {
    userpassLogin(values).then((res) => {
      if (res.length === 0) {
        //登录失败
        message.error('用户名或密码不匹配')
      } else {
        localStorage.setItem('token', 'mockToken')
        navigate('/')
      }
    })
  }
  return (
    <div style={{ height: '100vh' }}>
      <Card className='LoginFormContainer'>
        <div className='LoginFormTitle'>登录</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="http://www.baidu.com">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            Or <Button type='primary' onClick={() => { navigate('/login') }}>现在注册!</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
