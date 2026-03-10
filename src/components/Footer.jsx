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
    { label: 'Service', href: '/service' },
    { label: 'Podcast', href: '/podcast' },
    { label: 'Our Workshop', href: '/workshop' },
    { label: 'About Us', href: '/about' },
  ]

  const getInvolvedLinks = [
    { label: 'Get Involved (All Actions)', href: 'https://linktr.ee/onefocusafrica' },
    { label: 'Become a Mentor', href: 'https://linktr.ee/onefocusafrica' },
    { label: 'Volunteer Opportunities', href: 'https://linktr.ee/onefocusafrica' },
    { label: 'Donate', href: 'https://linktr.ee/onefocusafrica' },
    { label: 'Partner with Us', href: 'https://linktr.ee/onefocusafrica' }
  ]

  const programLinks = [
    { label: 'Mentorship', href: 'https://linktr.ee/onefocusafrica' },
    { label: 'School Outreach', href: 'https://linktr.ee/onefocusafrica' },
    { label: 'Our Workshops', href: 'https://linktr.ee/onefocusafrica' },
    { label: 'Contact Us', href: 'https://linktr.ee/onefocusafrica' }
  ]

  return (
    <Footer style={{ backgroundColor: '#000', color: '#fff', padding: '48px 24px 24px' }}>
      <div className="max-w-7xl mx-auto">
        <Row gutter={[24, 32]}>
          {/* Brand Section */}
          <Col xs={24} sm={12} md={6} lg={6}>
            <Title level={4} style={{ color: '#ffffff', textAlign: 'left', marginBottom: '16px', fontSize: '18px' }}>
              ONEFOCUS AFRICA
            </Title>
            <Text style={{ color: '#fff', display: 'block', marginBottom: '16px', fontWeight: '500', fontSize: '12px', textAlign: 'left', lineHeight: '1.6' }}>
              Empowering the Next Generation Through Skills, Mentorship, and Expression of African Changemakers
            </Text>

            <Text style={{ color: '#fff', display: 'block', marginBottom: '12px', textAlign: 'left', fontSize: '12px' }}>Follow Us on Social Media</Text>
            <div style={{ textAlign: 'left' }}>
              <Space size="middle">
                <a href="https://www.instagram.com/onefocusafrica?igsh=emcyM2F4dHc5emxh" style={{ color: '#fff', background: '#E1306C', padding: '8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <InstagramOutlined style={{ fontSize: '18px' }} />
                </a>
                <a href="https://www.facebook.com/share/171HoeV9wm/" style={{ color: '#fff', background: '#1877F2', padding: '8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FacebookOutlined style={{ fontSize: '18px' }} />
                </a>
                <a href="https://x.com/alainhlavin?t=SgzfR0z8PLgucHqOaUjmJA&s=09" style={{ color: '#fff', background: '#1DA1F2', padding: '8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TwitterOutlined style={{ fontSize: '18px' }} />
                </a>
                <a href="www.linkedin.com/in/onefocus-77ba3536a" style={{ color: '#fff', background: '#0A66C2', padding: '8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LinkedinOutlined style={{ fontSize: '18px' }} />
                </a>
                <a href="https://www.youtube.com/@ONEFOCUSAFRICA" style={{ color: '#fff', background: '#FF0000', padding: '8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <YoutubeOutlined style={{ fontSize: '18px' }} />
                </a>
              </Space>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={12} md={6} lg={4}>
            <Title level={5} style={{ color: '#1F99ED', fontSize: '14px', textAlign: 'left', marginBottom: '16px' }}>
              Quick Links
            </Title>
            <div style={{ textAlign: 'left' }}>
              {quickLinks.map((link, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <Link href={link.href} style={{ color: '#fff', fontSize: '12px', display: 'inline-block', textAlign: 'left' }}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </Col>

          {/* Programs */}
          <Col xs={12} sm={12} md={6} lg={4}>
            <Title level={5} style={{ color: '#1F99ED', fontSize: '14px', textAlign: 'left', marginBottom: '16px' }}>
              Programs
            </Title>
            <div style={{ textAlign: 'left' }}>
              {programLinks.map((link, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <Link href={link.href} style={{ color: '#fff', fontSize: '12px', display: 'inline-block', textAlign: 'left' }}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </Col>

          {/* Get Involved */}
          <Col xs={12} sm={12} md={6} lg={5}>
            <Title level={5} style={{ color: '#1F99ED', fontSize: '14px', textAlign: 'left', marginBottom: '16px' }}>
              Get Involved
            </Title>
            <div style={{ textAlign: 'left' }}>
              {getInvolvedLinks.map((link, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <Link href={link.href} style={{ color: '#fff', fontSize: '12px', display: 'inline-block', textAlign: 'left' }}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={12} lg={5}>
            <Title level={5} style={{ color: '#1F99ED', fontSize: '14px', textAlign: 'left', marginBottom: '16px' }}>
              Contact Us
            </Title>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                <EnvironmentOutlined style={{ color: '#1F99ED', marginRight: '8px', marginTop: '2px', flexShrink: 0 }} />
                <Text style={{ color: '#fff', fontSize: '12px', textAlign: 'left', lineHeight: '1.5' }}>
                Norseken Kigali, Rwanda | Regional Offices Across Africa
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <MailOutlined style={{ color: '#1F99ED', marginRight: '8px', flexShrink: 0 }} />
                <Link href="mailto:info@onefocusfoundation.org" style={{ color: '#fff', fontSize: '12px', textAlign: 'left' }}>
                  info@onefocus.org.rw
                </Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <PhoneOutlined style={{ color: '#1F99ED', marginRight: '8px', flexShrink: 0 }} />
                <Link href="tel:+250781102667" style={{ color: '#fff', fontSize: '12px', textAlign: 'left' }}>
                  +250 781 102 667
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ height: '1px', backgroundColor: '#1F99ED', marginBottom: '16px', width: '100%' }}></div>
          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: '#fff', fontSize: '12px' }}>
              © {currentYear} ONEFOCUS AFRICA. All rights reserved. | Built for Africa's Youth
            </Text>
          </div>
        </div>
      </div>
    </Footer>
  )
}
