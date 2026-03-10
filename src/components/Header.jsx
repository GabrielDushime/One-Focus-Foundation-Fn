'use client'

import { Layout, Button, Drawer } from 'antd'
import { MenuOutlined, CloseOutlined, HomeOutlined, ToolOutlined, CustomerServiceOutlined, PlayCircleOutlined, InfoCircleOutlined, FileTextOutlined } from '@ant-design/icons'
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
    { key: 'home', label: 'HOME', route: '/', icon: <HomeOutlined /> },
    { key: 'workshop', label: 'PROGRAMS & WORKSHOP', route: '/workshop', icon: <ToolOutlined /> },
    { key: 'service', label: 'SERVICES', route: '/service', icon: <CustomerServiceOutlined /> },
    { key: 'podcast', label: 'PODCAST', route: '/podcast', icon: <PlayCircleOutlined /> },
    { key: 'blogs', label: 'BLOGS', route: '/blog', icon: <FileTextOutlined /> },
    { key: 'about', label: 'ABOUT US', route: '/about', icon: <InfoCircleOutlined /> },
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
    if (selectedMenuItem && selectedMenuItem.route) {
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
            src="/official-01.png"
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
              color: '#1f99ed',
            }}
          >
            ONEFOCUS AFRICA
          </p>
        </div>

        <div className="flex-1 flex h-full min-w-0">
          {isLargeScreen ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '64px',
                marginBottom: '6px',
                flex: 1,
                justifyContent: 'center',
                minWidth: 0
              }}
            >
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.key)}
                  onMouseEnter={() => setHoveredItem(item.key)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    backgroundColor: hoveredItem === item.key 
                      ? '#1f99ed' 
                      : 'transparent',
                    color: hoveredItem === item.key ? '#ffffff' : '#2e3192',
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
                    fontFamily: 'inherit',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: selectedItem === item.key ? '16px' : '14px' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <a
                href="https://linktr.ee/onefocusafrica"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHoveredItem('linktree')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  backgroundColor: hoveredItem === 'linktree' ? '#1f99ed' : '#2e3192',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 20px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  borderRadius: '20px',
                  boxShadow: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  fontFamily: 'inherit',
                  gap: '6px',
                  marginLeft: '12px',
                  textDecoration: 'none'
                }}
              >
                📩 Get Involved
              </a>
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
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  )
}
