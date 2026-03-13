'use client'

import { useState } from 'react'
import { Layout, Card, Row, Col, Form, Input, Button, Typography, message, Divider } from 'antd'
import { LockOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from '@/config/api'

const { Title, Text, Paragraph } = Typography

const DEMO_CREDENTIALS = [
  { email: 'admin@demo.com', password: 'Admin@123', role: 'admin', label: 'Admin', color: '#2E3192' },
  { email: 'editor@demo.com', password: 'Editor@123', role: 'editor', color: '#1F99ED' },
  { email: 'user@demo.com', password: 'User@123', role: 'user', color: '#52c41a' },
]

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const router = useRouter()

  const handleDemoClick = (credential) => {
    form.setFieldsValue({
      email: credential.email,
      password: credential.password
    })
    message.info(`Filled in ${credential.label} credentials`)
  }

  const handleLogin = async (values) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }),
      })

      const data = await response.json()

      if (response.ok && data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        
        let userRoleValue = 'user'
        let userName = values.email.split('@')[0]
        
        if (data.user) {
          userName = data.user.fullName || data.user.name || userName
          userRoleValue = data.user.role || 'user'
          localStorage.setItem('username', userName)
          localStorage.setItem('email', data.user.email || values.email)
        }
        
        localStorage.setItem('user_role', userRoleValue)
        
        message.success(`Welcome back, ${userName}!`)
        form.resetFields()
        
        // Redirect based on role
        if (userRoleValue === 'admin') {
          router.push('/admin/dashboard')
        } else if (userRoleValue === 'editor') {
          router.push('/editor/dashboard')
        } else {
          router.push('/user/dashboard')
        }
      } else {
        message.error(data.message || 'Invalid credentials. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      message.error('Cannot connect to server. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2E3192, #1F99ED)',
      padding: '20px'
    }}>
      <Row gutter={[32, 0]} style={{ maxWidth: 900, width: '100%' }}>
        {/* Left Side - Branding */}
        <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center', padding: '20px' }}>
          <SafetyCertificateOutlined style={{ fontSize: 80, marginBottom: 24 }} />
          <Title level={1} style={{ color: 'white', marginBottom: 16 }}>OneFocus Africa</Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, maxWidth: 400 }}>
            Access your personalized dashboard to manage content, users, and more.
          </Paragraph>
          <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 32 }}>
            Select a role below to auto-fill credentials
          </Text>
        </Col>

        {/* Right Side - Login Form */}
        <Col xs={24} md={12}>
          <Card style={{ borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <LockOutlined style={{ fontSize: 40, color: '#2E3192', marginBottom: 16 }} />
              <Title level={3} style={{ margin: 0, color: '#2E3192' }}>Dashboard Login</Title>
              <Text type="secondary">Enter your credentials to access the dashboard</Text>
            </div>

            {/* Demo Credentials */}
            <div style={{ 
              marginBottom: 24, 
              padding: 16, 
              backgroundColor: '#f0f5ff', 
              borderRadius: 8,
              border: '1px solid #d6e4ff'
            }}>
              <Text strong style={{ color: '#2E3192', display: 'block', marginBottom: 12 }}>
                Demo Credentials - Click to Auto-fill
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DEMO_CREDENTIALS.map((cred) => (
                  <div
                    key={cred.email}
                    onClick={() => handleDemoClick(cred)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      backgroundColor: 'white',
                      borderRadius: 6,
                      cursor: 'pointer',
                      border: '1px solid #e8e8e8',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 'bold', color: cred.color }}>{cred.label}</span>
                      <span style={{ fontSize: 12, color: '#666' }}>{cred.email}</span>
                    </div>
                    <span style={{ fontSize: 11, color: '#999', fontFamily: 'monospace' }}>{cred.password}</span>
                  </div>
                ))}
              </div>
            </div>

            <Form form={form} layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email address" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} block size="large">
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Form.Item>
            </Form>

            <Divider plain>
              <Text type="secondary" style={{ fontSize: 12 }}>Or</Text>
            </Divider>

            <Button block onClick={() => router.push('/')}>
              Back to Website
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
