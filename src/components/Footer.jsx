'use client'

import { Layout, Row, Col, Typography, Space } from 'antd'
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined
} from '@ant-design/icons'

const { Footer } = Layout
const { Title, Text, Link } = Typography

export default function FooterComponent() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'What we build', href: '/what-we-build' },
    { label: 'Career', href: '/career' },
    { label: 'Our workshop', href: '/workshop' },
    { label: 'Media & Event', href: '/media' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' }
  ]

  const getInvolvedLinks = [
    { label: 'Register for Workshops', href: '#' },
    { label: 'Become a Mentor', href: '#' },
    { label: 'Volunteer Opportunities', href: '#' },
    { label: 'Donate', href: '#' },
    { label: 'Partner with Us', href: '#' }
  ]

  const programLinks = [
    { label: 'Mentorship', href: '#' },
    { label: 'School Outreach', href: '#' },
    { label: 'Our Workshops', href: '#' },
    { label: 'Contact Us', href: '#' }
  ]

  return (
    <Footer style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Row gutter={[32, 32]}>
          {/* Brand Section */}
          <Col xs={24} sm={24} md={12} lg={6}>
            <Title level={3} style={{ color: '#1F99ED', textAlign: 'left' }}>
              ONEFOCUS
            </Title>
            <Text style={{ color: '#fff', display: 'block', marginBottom: '24px', fontWeight: '600', fontSize: '12px', textAlign: 'left' }}>
              Empowering the Next Generation Through Skills, <br />
              Mentorship, and Expression of African Changemakers
            </Text>

            <Text style={{ color: '#fff', display: 'block', marginBottom: '12px', textAlign: 'left' }}>Follow Us on social Media Platform</Text>
            <div style={{ textAlign: 'left' }}>
              <Space size="middle">
                <a href="#" className="bg-pink-600 text-white p-2 rounded">
                  <InstagramOutlined style={{ fontSize: '20px' }} />
                </a>
                <a href="#" className="bg-blue-600 text-white p-2 rounded">
                  <FacebookOutlined style={{ fontSize: '20px' }} />
                </a>
                <a href="#" className="bg-blue-400 text-white p-2 rounded">
                  <TwitterOutlined style={{ fontSize: '20px' }} />
                </a>
                <a href="#" className="bg-blue-700 text-white p-2 rounded">
                  <LinkedinOutlined style={{ fontSize: '20px' }} />
                </a>
                <a href="#" className="bg-red-600 text-white p-2 rounded">
                  <YoutubeOutlined style={{ fontSize: '20px' }} />
                </a>
                <a href="#" className="bg-black text-white p-2 rounded">
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>♪</span>
                </a>
              </Space>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <Title style={{ color: '#1F99ED', fontSize: '15px', textAlign: 'left', marginBottom: '16px' }}>
              Quick Links
            </Title>
            <div style={{ textAlign: 'left' }}>
              {quickLinks.map((link, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <Link 
                    href={link.href} 
                    style={{ 
                      color: '#fff', 
                      fontSize: '12px', 
                      display: 'inline-block',
                      textAlign: 'left'
                    }} 
                    className="hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </Col>

          {/* Programs */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <Title level={4} style={{ color: '#1F99ED', fontSize: '15px', textAlign: 'left', marginBottom: '16px' }}>
              Programs
            </Title>
            <div style={{ textAlign: 'left' }}>
              {programLinks.map((link, i) => (
                <div key={i}>
                  <Link 
                    href={link.href} 
                    style={{ 
                      color: '#fff', 
                      fontSize: '12px', 
                      display: 'inline-block',
                      textAlign: 'left'
                    }} 
                    className="hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </Col>

          {/* Get Involved */}
          <Col xs={24} sm={12} md={6} lg={5}>
            <Title level={4} style={{ color: '#1F99ED', fontSize: '15px', textAlign: 'left', marginBottom: '16px' }}>
              Get Involved
            </Title>
            <div style={{ textAlign: 'left' }}>
              {getInvolvedLinks.map((link, i) => (
                <div key={i}>
                  <Link 
                    href={link.href} 
                    style={{ 
                      color: '#fff', 
                      fontSize: '12px', 
                      display: 'inline-block',
                      textAlign: 'left'
                    }} 
                    className="hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={12} lg={5}>
            <Title level={4} style={{ color: '#1F99ED', fontSize: '15px', textAlign: 'left', marginBottom: '16px' }}>
              Contact Us
            </Title>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                <EnvironmentOutlined style={{ color: '#1F99ED', marginRight: '8px', marginTop: '2px' }} />
                <Text style={{ color: '#fff', fontSize: '12px', textAlign: 'left' }}>
                  Address: Kigali, Rwanda | Regional Offices Across Africa
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <MailOutlined style={{ color: '#1F99ED', marginRight: '8px' }} />
                <Link 
                  href="mailto:info@onefocusfoundation.org" 
                  style={{ color: '#fff', fontSize: '12px', textAlign: 'left' }} 
                  className="hover:text-blue-400"
                >
                  info@onefocusfoundation.org
                </Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <PhoneOutlined style={{ color: '#1F99ED', marginRight: '8px' }} />
                <Link 
                  href="tel:+250781102667" 
                  style={{ color: '#fff', fontSize: '12px', textAlign: 'left' }} 
                  className="hover:text-blue-400"
                >
                  +250 781 102 667
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div className="mt-8">
          <div style={{ 
            height: '0.5px', 
            backgroundColor: '#1F99ED', 
            marginTop: '10px',
            marginBottom: '10px',
            maxWidth: '100%'
          }}></div>
          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: '#fff', fontSize: '12px' }}>
              © {currentYear} ONEFOCUS. All rights reserved. | Built for Africa's Youth
            </Text>
          </div>
        </div>
      </div>
    </Footer>
  )
}