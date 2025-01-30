import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { message } from 'antd';
import axiosInstance from '../../../axiosInterceptor/index';

const Login = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(''); // State to store the email error message

  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post('/api/login', values);
      console.log('Backend Response:', response); // Log the backend response

      if (response.status === 200 && response.data.success) {
        message.success('Login Successful');
        localStorage.setItem('token', response.data.token); // Store the token
        navigate('/home');  // Redirect to home page
      } else if (response.data.message === 'Please verify your email to log in.') {
        setEmailError('Please verify your email first.');
      } else {
        setEmailError('');
        message.error(response.data.message || 'Login failed, please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        if (errorMessage === 'Please verify your email to log in.') {
          setEmailError('Please verify your email first.');
        } else {
          setEmailError('');
          message.error(errorMessage || 'Login failed, please try again.');
        }
      } else {
        console.error('Error during login:', error);
        message.error('Login failed, please try again.');
      }
    }
  };

  return (
    <div className="main">
      <div className="section1">
        <h3 className="heading1">Work on big ideas,<br />without the busywork.</h3>
      </div>
      <div className="section2">
        <h3 className="logo-heading">RemoteSync</h3>
        <h2 className="login-heading">Login to your Account</h2>
        <h6 className="login-subheading">See what is going on with your business</h6>
        <Form
          name="login"
          onFinish={onFinish} // Handles form submission
          initialValues={{ remember: true }}
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'The input is not a valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
            help={emailError} // Display the email error if any
            validateStatus={emailError ? 'error' : ''} // Apply error style if emailError is set
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              className="input"
              onChange={() => setEmailError('')} // Clear the error when user types again
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              className="input"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="checkbox">Remember me</Checkbox>
            </Form.Item>
            <a href="https://ant.design/components/form" className="forgot-password">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button className="login-btn1" type="primary" htmlType="submit">
              Log in
            </Button>
            or <a href="/Signup">Register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
