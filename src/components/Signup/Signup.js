import React, { useState } from 'react';
import { Row, Col, Button, Form, Input, Checkbox, Modal, message } from 'antd';
import axiosInstance from '../../axiosInterceptor/index';
import './Signup.css';

const Signup = () => {
    const [form] = Form.useForm();
    const [isChecked, setIsChecked] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onFinish = async (values) => {
        try {
            console.log(values);
            axiosInstance.post('/api/register', values);
            message.success('Thank you! We will contact you soon');

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const onCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };
    const handleContinue = () => {
        setIsModalVisible(true);
    };
    const handlelogin = () => {
        window.location.href = '/login';  // Redirect to login page
    };

    return (
        <div className='signup-section'>
            <div className='main1'>
                <Row>
                    <Col>
                        <div className='image1-container'>
                            <img src='https://i.ibb.co/ZhBVpcD/image2435.png' alt='image1' className='image1' />
                        </div>
                    </Col>
                    <Col>
                        <div className='container'>
                            <h3 className='logo'>RemoteSync</h3>
                            <h6 className='signup-heading'>Sign up to continue</h6>
                            <Form
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="username"
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
                                    rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your E-mail!' }]}
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
                                            onClick={handleContinue}
                                            disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0 || !isChecked}
                                        >
                                            Register
                                        </Button>
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col>
                        <div className='image1-container'>
                            <img src='https://i.ibb.co/b3n01bH/Whats-App-Image-2024-09-29-at-00-16-58-3a09932d-removebg-preview.png' alt='image2' className='image1' />
                        </div>
                    </Col>
                </Row>

                {/* Modal for thank you message */}
                <Modal
                    title={null}
                    open={isModalVisible}  // Ensure this is correctly passed
                    footer={null}
                    centered
                    onCancel={() => setIsModalVisible(false)}
                >
                    <div style={{ textAlign: 'center' }}>
                        <h3 className='modal-heading'>Congratulations! Your Signup Form Has Been Successfully Submitted</h3>
                        <p className='modal-paragraph'>Welcome to the RemoteSync family! We’re excited to have you on board and can’t wait to start this amazing journey together. Your registration was successful, and we’ll be in touch soon. In the meantime, feel free to explore and get to know our community better. Welcome to the next chapter of collaboration and growth with RemoteSync!</p>
                        <Button className='continue-btn' onClick={handlelogin}>
                            Continue
                        </Button>
                    </div>
                </Modal>

            </div>
        </div>
    );
};

export default Signup;
