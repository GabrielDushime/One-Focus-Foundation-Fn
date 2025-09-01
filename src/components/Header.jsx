'use client'

import { Layout, Button, Drawer } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const { Header } = Layout

export default function HeaderComponent() {
  const [selectedItem, setSelectedItem] = useState('home')
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isLargeScreen, setIsLargeScreen] = useState(true)
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
    { key: 'media', label: 'MEDIA & EVENTS', route: '/media' },
    { key: 'about', label: 'ABOUT US', route: '/about' },
    { key: 'contact', label: 'CONTACT US', route: '/contact' },
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
    const selectedMenuItem = menuItems.find(item => item.key === key)
    if (selectedMenuItem) {
      setSelectedItem(key)
      router.push(selectedMenuItem.route)
      setDrawerVisible(false)
    }
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
        {/* Logo + Text  */}
        <div
          style={{
            paddingLeft: 24,
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

        {/* Right: Navigation */}
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
                marginLeft: '200px'
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

      {/* Mobile Drawer */}
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
    </div>
  )
}