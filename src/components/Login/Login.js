import React from 'react'
import './Login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Row, Col,message } from 'antd';
import axiosInstance from '../../axiosInterceptor/index';

const onFinish = async (values) => {
    try {
        console.log(values);
        axiosInstance.post('/api/login', values);
        message.success('Login Successful');

    } catch (error) {
        message.warning('Wrong Credentials');
        console.error('Error submitting form:', error);
    }
};


function Login() {
    return (
        <div className='main'>
            <Row>
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                    <div className='section1'>
                        <h3 className='heading1'>Work on big ideas,<br />without the busywork.</h3>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <div className='section2'>
                        <h3 className='logo-heading'>RemoteSync</h3>
                        <h2 className='login-heading'>Login to your Account </h2>
                        <h6 className='login-subheading'>See what is going on with your business</h6>
                        <Form
                            name="login"
                            onFinish={onFinish}
                            initialValues={{
                                remember: true,
                            }}
                            style={{
                                maxWidth: 400,
                            }}
                        >
                            <Form.Item
                                name="email"
                                rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your E-mail!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Email" className='input' />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input prefix={<LockOutlined />} type="password" placeholder="Password" className='input'/>
                            </Form.Item>
                            <Form.Item>
                                <Flex justify="space-between" align="center">
                                    <Form.Item name="remember" valuePropName="checked" noStyle >
                                        <Checkbox className='checkbox'>Remember me</Checkbox>
                                    </Form.Item>
                                    <a href="https://ant.design/components/form" className='forgot-password'>Forgot password</a>
                                </Flex>
                            </Form.Item>

                            <Form.Item>
                                <Button className='login-btn1' htmlType="submit">
                                    Log in
                                </Button>
                                or <a href="http://localhost:3000/">Register now!</a>
                            </Form.Item>
                        </Form>

                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login;