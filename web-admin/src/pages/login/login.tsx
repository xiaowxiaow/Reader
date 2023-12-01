import React from 'react';
import './login.css'
import { Button, Form, Input } from 'antd';
import axios from 'axios'
import { host } from '../../constant'

interface DataType {
  _id: string;
  first_name: string;
  family_name: string;
  email: string;
  password: string;
  identity: string;
}

const onFinish = (values: any) => {
  axios.post(host + '/users/login', values)
    .then(({ data }: { data: DataType }) => {
      window.localStorage.setItem('userInfo', JSON.stringify(data))
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  return <div className='login-page'>
    <div className='login-c'>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default Login;
