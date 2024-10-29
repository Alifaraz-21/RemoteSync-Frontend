import React, { useState } from 'react';
import { Row, Col, Button, Form, Input, Checkbox, Modal } from 'antd';
import axiosInstance from '../../../axiosInterceptor/index';
import '../Signup/Signup.css';

const Signup = () => {
    const [form] = Form.useForm();
    const [isChecked, setIsChecked] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onFinish = async (values) => {
        try {
            await axiosInstance.post('/api/register', values);
            // Show modal to inform user to verify email
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const onCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleLogin = () => {
        // Redirect to login page
        window.location.href = '/';
    };

    return (
        <div className='signup-section'>
            <div className='main1'>
                {/* Left side illustration */}
                <div className="image1-container">
                    <img src="https://i.ibb.co/ZhBVpcD/image2435.png" alt="left illustration" className="image1" />
                </div>

                {/* Center form */}
                <Row gutter={[16, 16]} justify="center" align="middle" style={{ width: '100%' }}>
                    <Col xs={24} sm={16} md={12} lg={12}>
                        <div className='container'>
                            <h3 className='logo'>RemoteSync</h3>
                            <h6 className='signup-heading'>Sign up to continue</h6>
                            <Form
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                style={{ maxWidth: '100%', margin: '0 auto' }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="userName"
                                    rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                                >
                                    <Input placeholder='Username' className='reg-input' />
                                </Form.Item>
                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
                                >
                                    <Input placeholder='First Name' className='reg-input' />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
                                >
                                    <Input placeholder='Last Name' className='reg-input' />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { type: 'email', message: 'The input is not valid E-mail!' },
                                        { required: true, message: 'Please input your E-mail!' }
                                    ]}
                                >
                                    <Input placeholder='Email' className='reg-input' />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    hasFeedback
                                >
                                    <Input.Password placeholder='Password' className='reg-input' />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder='Confirm Password' className='reg-input' />
                                </Form.Item>
                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[{ validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept the agreement'))) }]}
                                >
                                    <Checkbox onChange={onCheckboxChange} className='checkbox'>
                                        I have read the <a href="https://ant.design/components/form#API">agreement</a>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item shouldUpdate>
                                    {() => (
                                        <Button
                                            className='register-btn'
                                            type="primary"
                                            htmlType="submit"
                                            disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0 || !isChecked}
                                        >
                                            Register
                                        </Button>
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>

                {/* Right side illustration */}
                <div className="image2-container">
                    <img src="https://i.ibb.co/ZhBVpcD/image2435.png" alt="right illustration" className="image2" />
                </div>

                {/* Modal for email verification */}
                <Modal
                    title={null}
                    open={isModalVisible}
                    footer={null}
                    centered
                    onCancel={() => setIsModalVisible(false)}
                >
                    <div style={{ textAlign: 'center' }}>
                        <h3 className='modal-heading'>Please verify your email</h3>
                        <p className='modal-paragraph'>
                            A verification link has been sent to your email. Please verify your email to proceed.
                        </p>
                        <Button className='continue-btn' onClick={handleLogin}>
                            Go to Login Page
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Signup;
