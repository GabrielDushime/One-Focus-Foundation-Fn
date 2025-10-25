'use client'

import { Layout, Button, Drawer, Modal, Form, Input, message } from 'antd'
import { MenuOutlined, CloseOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { API_BASE_URL } from '@/config/api' 

const { Header } = Layout

export default function HeaderComponent() {
  const [selectedItem, setSelectedItem] = useState('home')
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isLargeScreen, setIsLargeScreen] = useState(true)
  const [loginModalVisible, setLoginModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) 
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const menuItems = [
    { key: 'home', label: 'HOME', route: '/' },
    { key: 'what-we-build', label: 'WHAT WE ARE BUILD', route: '/what-we-build' },
    { key: 'career', label: 'CAREER', route: '/career' },
    { key: 'workshop', label: 'OUR WORKSHOP', route: '/workshop' },
    { key: 'service', label: 'SERVICE', route: '/service' },
    { key: 'media', label: 'MEDIA & EVENTS', route: '/media' },
    { key: 'about', label: 'ABOUT US', route: '/about' },
    { key: 'contact', label: 'CONTACT US', route: '/contact' },
    { key: 'login', label: 'ADMIN LOGIN', route: null },
  ]

  useEffect(() => {
    const currentMenuItem = menuItems.find(item => item.route === pathname)
    if (currentMenuItem) {
      setSelectedItem(currentMenuItem.key)
    }
  }, [pathname])

  const showDrawer = () => setDrawerVisible(true)
  const closeDrawer = () => setDrawerVisible(false)

  const handleMenuClick = (key) => {
    if (key === 'login') {
      setLoginModalVisible(true)
      setDrawerVisible(false)
      return
    }

    const selectedMenuItem = menuItems.find(item => item.key === key)
    if (selectedMenuItem && selectedMenuItem.route) {
      setSelectedItem(key)
      router.push(selectedMenuItem.route)
      setDrawerVisible(false)
    }
  }

  const handleLogin = async (values) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON response')
      }

      const data = await response.json()

      if (response.ok && data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        
        message.success('Login successful!')
        setLoginModalVisible(false)
        form.resetFields()
        
        router.push('/admin/dashboard')
      } else {
        message.error(data.message || 'Invalid credentials. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      
      if (error.message === 'Failed to fetch') {
        message.error('Cannot connect to server. Please check your internet connection.')
      } else if (error.message === 'Server did not return JSON response') {
        message.error('Server error. Please try again later.')
      } else {
        message.error('An error occurred during login. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalCancel = () => {
    setLoginModalVisible(false)
    form.resetFields()
  }

  return (
    <div 
      className="w-full"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        backgroundColor: 'white'
      }}
    >
      <Header
        style={{
          backgroundColor: 'white',
          padding: 0,
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',          
        }}
      >
        <div
          style={{
            paddingLeft: 25,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            whiteSpace: 'nowrap',      
            flexShrink: 0,             
            height: '64px',
          }}
        >
          <img
            src="/logo.svg"
            alt="OneFocus Logo"
            style={{
              width: 50,
              height: 50,
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              margin: 0,               
              lineHeight: 1,           
              fontWeight: 700,
              fontSize: 15,
              color: '#2E3192',
            }}
          >
            ONEFOCUS
          </p>
        </div>

        <div className="flex-1 flex h-full min-w-0">
          {isLargeScreen ? (
            <div
              style={{
                backgroundColor: '#1F99ED',
                display: 'flex',
                alignItems: 'center',
                height: '64px',
                marginBottom: '6px',
                flex: 1,
                justifyContent: 'flex-start',
                minWidth: 0,
                marginLeft: '70px'
              }}
            >
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.key)}
                  onMouseEnter={() => setHoveredItem(item.key)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    backgroundColor: selectedItem === item.key 
                      ? '#ffffff' 
                      : hoveredItem === item.key 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'transparent',
                    color: selectedItem === item.key ? '#1F99ED' : '#ffffff',
                    fontWeight: 'bold',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: selectedItem === item.key ? '0 42px' : '0 12px',
                    fontSize: selectedItem === item.key 
                      ? '14px' 
                      : hoveredItem === item.key 
                        ? 'inherit' 
                        : '13px',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                    boxShadow: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    fontFamily: 'inherit'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <div 
              style={{
                flex: 1,
                position: 'relative'
              }}
            >
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: '18px' }} />}
                onClick={showDrawer}
                style={{
                  color: 'black',
                  border: 'none',
                  boxShadow: 'none',
                  background: 'transparent',
                  float: 'right',
                  height: '64px',
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                size="large"
              />
            </div>
          )}
        </div>
      </Header>

      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">ONEFOCUS</span>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={280}
        closeIcon={<CloseOutlined />}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px 0'}}>
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              onMouseEnter={() => setHoveredItem(`mobile-${item.key}`)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                backgroundColor: selectedItem === item.key 
                  ? '#1F99ED' 
                  : hoveredItem === `mobile-${item.key}` 
                    ? '#f5f5f5' 
                    : 'transparent',
                color: selectedItem === item.key ? '#ffffff' : '#000000',
                fontWeight: selectedItem === item.key ? 'bold' : 'normal',
                padding: '12px 16px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease-in-out',
                fontFamily: 'inherit',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Drawer>

      <Modal
        title={
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#1F99ED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <LockOutlined style={{ fontSize: '28px', color: 'white' }} />
            </div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#2E3192' }}>
              Admin Login
            </h2>
            <p style={{ margin: '8px 0 0', color: '#666', fontSize: '14px' }}>
              Enter your credentials to access the dashboard
            </p>
          </div>
        }
        open={loginModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={450}
        centered
        closable={true}
      >
        <Form
          form={form}
          name="admin_login"
          onFinish={handleLogin}
          layout="vertical"
          style={{ marginTop: '24px' }}
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#1F99ED' }} />}
              placeholder="admin@example.com"
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1F99ED' }} />}
              placeholder="Enter your password"
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
              style={{
                backgroundColor: '#1F99ED',
                borderColor: '#1F99ED',
                borderRadius: '8px',
                height: '48px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
              <p
    style={{
      marginTop: '10px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#555',
      textAlign:'center'
    }}
  >
    Access Restricted: Authorized Admins Only
  </p>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}