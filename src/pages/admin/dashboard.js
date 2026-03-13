'use client'
export const dynamic = 'force-dynamic'
import { Layout, Card, Row, Col, Statistic, Table, Tag, Button, Typography, Avatar, Menu, Tabs, Progress, List, Modal, Form, Input, Select, DatePicker, message, Drawer } from 'antd'
import { UserOutlined, FileTextOutlined, EyeOutlined, TeamOutlined, CalendarOutlined, EditOutlined, DeleteOutlined, PlusOutlined, BarChartOutlined, SettingOutlined, SafetyCertificateOutlined, DollarOutlined, MenuOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import HeaderComponent from '../../components/Header'

const { Content, Sider } = Layout
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

// Sample admin data
const recentActivities = [
  { key: '1', action: 'New user registered', user: 'john.doe@email.com', time: '2 mins ago' },
  { key: '2', action: 'Blog post published', user: 'Editor Team', time: '15 mins ago' },
  { key: '3', action: 'New donation received', user: 'Anonymous', time: '1 hour ago' },
  { key: '4', action: 'Workshop registration', user: 'Jane Smith', time: '2 hours ago' },
  { key: '5', action: 'Volunteer application', user: 'Mike Johnson', time: '3 hours ago' },
]

const blogPosts = [
  { key: '1', title: 'Annual Report 2024 Released', author: 'Editor Team', status: 'published', views: 1250, date: '2024-01-15' },
  { key: '2', title: 'New Workshop Series Announced', author: 'Admin', status: 'draft', views: 0, date: '2024-01-14' },
  { key: '3', title: 'Partnership with Local Schools', author: 'Editor', status: 'published', views: 890, date: '2024-01-12' },
  { key: '4', title: 'Volunteer Opportunities Update', author: 'Admin', status: 'review', views: 0, date: '2024-01-10' },
  { key: '5', title: 'Community Impact Story', author: 'Editor', status: 'published', views: 567, date: '2024-01-08' },
]

const users = [
  { key: '1', name: 'John Doe', email: 'john@demo.com', role: 'admin', status: 'active', joined: '2024-01-01' },
  { key: '2', name: 'Jane Smith', email: 'jane@demo.com', role: 'editor', status: 'active', joined: '2024-01-05' },
  { key: '3', name: 'Mike Johnson', email: 'mike@demo.com', role: 'user', status: 'active', joined: '2024-01-10' },
  { key: '4', name: 'Sarah Wilson', email: 'sarah@demo.com', role: 'user', status: 'inactive', joined: '2023-12-20' },
]

const upcomingEvents = [
  { key: '1', name: 'Monthly Community Meetup', date: 'Jan 20, 2024', attendees: 45, status: 'upcoming' },
  { key: '2', name: 'Leadership Workshop', date: 'Jan 25, 2024', attendees: 30, status: 'upcoming' },
  { key: '3', name: 'Mentorship Program Launch', date: 'Jan 28, 2024', attendees: 0, status: 'draft' },
]

const contentStats = [
  { key: '1', category: 'Blog Posts', total: 45, published: 38, draft: 7 },
  { key: '2', category: 'Events', total: 12, published: 8, draft: 4 },
  { key: '3', category: 'Workshops', total: 8, published: 6, draft: 2 },
  { key: '4', category: 'Podcasts', total: 24, published: 20, draft: 4 },
]

// Table columns
const blogColumns = [
  { title: 'Title', dataIndex: 'title', key: 'title', render: (text) => <strong>{text}</strong> },
  { title: 'Author', dataIndex: 'author', key: 'author' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { 
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status',
    render: (status) => {
      const colors = { published: 'green', draft: 'default', review: 'orange' }
      return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>
    }
  },
  { title: 'Views', dataIndex: 'views', key: 'views', render: (v) => v.toLocaleString() },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button type="link" icon={<EyeOutlined />} size="small">View</Button>
        <Button type="link" icon={<EditOutlined />} size="small">Edit</Button>
        <Button type="link" danger icon={<DeleteOutlined />} size="small">Delete</Button>
      </div>
    )
  }
]

const userColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name', render: (text, record) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Avatar size="small" icon={<UserOutlined />} />
      <span>{text}</span>
    </div>
  )},
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { 
    title: 'Role', 
    dataIndex: 'role', 
    key: 'role',
    render: (role) => {
      const colors = { admin: '#2E3192', editor: '#1F99ED', user: '#52c41a' }
      return <Tag color={colors[role]}>{role.toUpperCase()}</Tag>
    }
  },
  { 
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status',
    render: (status) => <Tag color={status === 'active' ? 'success' : 'default'}>{status.toUpperCase()}</Tag>
  },
  { title: 'Joined', dataIndex: 'joined', key: 'joined' },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button type="link" size="small">Edit</Button>
        <Button type="link" danger size="small">Remove</Button>
      </div>
    )
  }
]

const eventColumns = [
  { title: 'Event Name', dataIndex: 'name', key: 'name' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Attendees', dataIndex: 'attendees', key: 'attendees' },
  { 
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status',
    render: (status) => <Tag color={status === 'upcoming' ? 'blue' : 'default'}>{status.toUpperCase()}</Tag>
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button type="link" size="small">Manage</Button>
      </div>
    )
  }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Get user info from localStorage
  const [userInfo, setUserInfo] = useState({ username: 'Admin', role: 'admin', email: 'admin@demo.com' })
  
  useEffect(() => {
    // Load user info from localStorage
    const username = localStorage.getItem('username') || 'Admin'
    const role = localStorage.getItem('user_role') || 'admin'
    const email = localStorage.getItem('email') || 'admin@demo.com'
    setUserInfo({ username, role, email })

    // Handle responsive sidebar — window is only available client-side, never during SSR
    const checkMobile = () => setIsMobile(window.innerWidth < 992)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Responsive sidebar menu items
  const menuItems = [
    { key: 'overview', icon: <BarChartOutlined />, label: 'Overview' },
    { key: 'content', icon: <FileTextOutlined />, label: 'Content' },
    { key: 'users', icon: <TeamOutlined />, label: 'Users' },
    { key: 'events', icon: <CalendarOutlined />, label: 'Events' },
    { key: 'donations', icon: <DollarOutlined />, label: 'Donations' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
  ]

  const handleCreateContent = (values) => {
    console.log('Creating content:', values)
    message.success('Content created successfully!')
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <Layout style={{ minHeight: '100vh', marginTop: '70px' }}>
      <HeaderComponent />
      <Layout>
        {/* Mobile Sidebar */}
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SafetyCertificateOutlined style={{ fontSize: '20px', color: '#1F99ED' }} />
              <span style={{ fontWeight: 'bold', color: '#2E3192' }}>Admin Panel</span>
            </div>
          }
          placement="left"
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          width={250}
          styles={{ body: { padding: 0 } }}
        >
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            onClick={(e) => {
              setActiveTab(e.key)
              setMobileMenuVisible(false)
            }}
            items={menuItems}
            style={{ borderRight: 0 }}
          />
        </Drawer>

        {/* Desktop Sidebar — uses isMobile state instead of window directly (safe for SSR) */}
        <Sider 
          collapsible 
          collapsed={collapsed} 
          onCollapse={setCollapsed}
          width={220}
          style={{ background: '#fff', marginTop: '0px', display: isMobile ? 'none' : 'block' }}
          breakpoint="lg"
          className="desktop-sider"
        >
          <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#1F99ED' }} />
              {!collapsed && <span style={{ fontWeight: 'bold', color: '#2E3192', fontSize: '14px' }}>Admin Panel</span>}
            </div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            onClick={(e) => setActiveTab(e.key)}
            items={menuItems}
            style={{ borderRight: 0 }}
          />
        </Sider>

        <Layout style={{ padding: '0' }}>
          {/* Mobile Header with Menu Button */}
          <div style={{ 
            padding: '12px 16px', 
            background: '#fff', 
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }} className="mobile-admin-header">
            <Button 
              type="text" 
              icon={<MenuOutlined />} 
              onClick={() => setMobileMenuVisible(true)}
              className="mobile-menu-btn"
              style={{ display: 'none' }}
            />
            <Title level={5} style={{ margin: 0, color: '#2E3192' }}>Admin Dashboard</Title>
            <Tag color="#2E3192">{userInfo.role.toUpperCase()}</Tag>
          </div>

          <Content style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
            {/* Welcome Banner */}
            <Card 
              style={{ marginBottom: '16px', background: 'linear-gradient(135deg, #2E3192, #1F99ED)', border: 'none' }}
              bodyStyle={{ padding: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  {/* fontSize moved to CSS media query below — avoids window access at render time */}
                  <Title level={4} className="welcome-title" style={{ color: 'white', margin: 0, fontSize: '20px' }}>
                    Welcome back, {userInfo.username}! 👋
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                    Here&apos;s what&apos;s happening with your organization today.
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Tag 
                    color="#fff" 
                    style={{ color: '#2E3192', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px' }}
                  >
                    {userInfo.role}
                  </Tag>
                  <Avatar 
                    size={40} 
                    icon={<UserOutlined />} 
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  />
                </div>
              </div>
            </Card>

            {/* Tab Content */}
            <Tabs activeKey={activeTab} onChange={setActiveTab} size="small">
              {/* Overview Tab */}
              <TabPane tab="Overview" key="overview">
                <Row gutter={[12, 12]} style={{ marginBottom: '16px' }}>
                  <Col xs={12} sm={12} lg={6}>
                    <Card bodyStyle={{ padding: '12px' }}>
                      <Statistic 
                        title={<span style={{ fontSize: '12px' }}>Total Users</span>} 
                        value={1248} 
                        prefix={<TeamOutlined />} 
                        valueStyle={{ color: '#2E3192', fontSize: '20px' }}
                      />
                      <Text type="secondary" style={{ fontSize: '10px' }}>+12% from last month</Text>
                    </Card>
                  </Col>
                  <Col xs={12} sm={12} lg={6}>
                    <Card bodyStyle={{ padding: '12px' }}>
                      <Statistic 
                        title={<span style={{ fontSize: '12px' }}>Blog Views</span>} 
                        value={45320} 
                        prefix={<EyeOutlined />} 
                        valueStyle={{ color: '#1F99ED', fontSize: '20px' }}
                      />
                      <Text type="secondary" style={{ fontSize: '10px' }}>+8% from last month</Text>
                    </Card>
                  </Col>
                  <Col xs={12} sm={12} lg={6}>
                    <Card bodyStyle={{ padding: '12px' }}>
                      <Statistic 
                        title={<span style={{ fontSize: '12px' }}>Published</span>} 
                        value={38} 
                        prefix={<FileTextOutlined />} 
                        valueStyle={{ color: '#52c41a', fontSize: '20px' }}
                      />
                      <Text type="secondary" style={{ fontSize: '10px' }}>7 drafts</Text>
                    </Card>
                  </Col>
                  <Col xs={12} sm={12} lg={6}>
                    <Card bodyStyle={{ padding: '12px' }}>
                      <Statistic 
                        title={<span style={{ fontSize: '12px' }}>Donations</span>} 
                        value={12500} 
                        prefix={<DollarOutlined />} 
                        valueStyle={{ color: '#faad14', fontSize: '20px' }}
                        precision={0}
                      />
                      <Text type="secondary" style={{ fontSize: '10px' }}>+25% from last month</Text>
                    </Card>
                  </Col>
                </Row>

                <Card 
                  title={<span style={{ fontSize: '14px' }}>Content Statistics</span>} 
                  bodyStyle={{ padding: '12px' }}
                  style={{ marginBottom: '16px' }}
                >
                  <Table 
                    columns={[
                      { title: 'Category', dataIndex: 'category', key: 'category' },
                      { title: 'Total', dataIndex: 'total', key: 'total' },
                      { title: 'Published', dataIndex: 'published', key: 'published', render: (v) => <Tag color="green">{v}</Tag> },
                      { title: 'Draft', dataIndex: 'draft', key: 'draft', render: (v) => <Tag>{v}</Tag> },
                      { 
                        title: 'Progress', 
                        key: 'progress',
                        width: 100,
                        render: (_, record) => (
                          <Progress 
                            percent={Math.round((record.published / record.total) * 100)} 
                            size="small"
                          />
                        )
                      },
                    ]}
                    dataSource={contentStats}
                    pagination={false}
                    size="small"
                    scroll={{ x: 400 }}
                  />
                </Card>

                <Row gutter={[12, 12]}>
                  <Col xs={24} lg={12}>
                    <Card 
                      title={<span style={{ fontSize: '14px' }}>Recent Activity</span>}
                      bodyStyle={{ padding: '8px' }}
                    >
                      <List
                        itemLayout="horizontal"
                        dataSource={recentActivities}
                        size="small"
                        renderItem={(item) => (
                          <List.Item style={{ padding: '8px 12px' }}>
                            <List.Item.Meta
                              title={<span style={{ fontSize: '13px' }}>{item.action}</span>}
                              description={
                                <div>
                                  <Text type="secondary" style={{ fontSize: '11px' }}>{item.user}</Text>
                                  <Text type="secondary" style={{ marginLeft: '6px', fontSize: '11px' }}>• {item.time}</Text>
                                </div>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Card 
                      title={<span style={{ fontSize: '14px' }}>Upcoming Events</span>}
                      bodyStyle={{ padding: '8px' }}
                    >
                      <Table 
                        columns={eventColumns} 
                        dataSource={upcomingEvents} 
                        pagination={false}
                        size="small"
                        scroll={{ x: 300 }}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              {/* Content Management Tab */}
              <TabPane tab="Content" key="content">
                <Card 
                  title={<span style={{ fontSize: '14px' }}>Blog Posts</span>}
                  extra={
                    <Button type="primary" size="small" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                      <span className="hide-on-mobile">Create</span>
                    </Button>
                  }
                  bodyStyle={{ padding: '12px' }}
                >
                  <Table 
                    columns={blogColumns} 
                    dataSource={blogPosts} 
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 600 }}
                    size="small"
                  />
                </Card>
              </TabPane>

              {/* User Management Tab */}
              <TabPane tab="Users" key="users">
                <Card 
                  title={<span style={{ fontSize: '14px' }}>All Users</span>}
                  extra={
                    <Button type="primary" size="small" icon={<PlusOutlined />}>
                      <span className="hide-on-mobile">Add User</span>
                    </Button>
                  }
                  bodyStyle={{ padding: '12px' }}
                >
                  <Table 
                    columns={userColumns} 
                    dataSource={users} 
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 500 }}
                    size="small"
                  />
                </Card>
              </TabPane>

              {/* Events Tab */}
              <TabPane tab="Events" key="events">
                <Card 
                  title={<span style={{ fontSize: '14px' }}>Events Management</span>}
                  extra={
                    <Button type="primary" size="small" icon={<PlusOutlined />}>
                      <span className="hide-on-mobile">Create Event</span>
                    </Button>
                  }
                  bodyStyle={{ padding: '12px' }}
                >
                  <Table 
                    columns={eventColumns} 
                    dataSource={upcomingEvents} 
                    pagination={false}
                    scroll={{ x: 400 }}
                    size="small"
                  />
                </Card>
              </TabPane>

              {/* Donations Tab */}
              <TabPane tab="Donations" key="donations">
                <Card title={<span style={{ fontSize: '14px' }}>Donation Statistics</span>} bodyStyle={{ padding: '12px' }}>
                  <Row gutter={[12, 12]}>
                    <Col xs={24} sm={8}>
                      <Card bodyStyle={{ padding: '12px' }}>
                        <Statistic 
                          title={<span style={{ fontSize: '12px' }}>Total</span>} 
                          value={12500} 
                          prefix={<DollarOutlined />} 
                          valueStyle={{ color: '#52c41a', fontSize: '18px' }}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card bodyStyle={{ padding: '12px' }}>
                        <Statistic 
                          title={<span style={{ fontSize: '12px' }}>This Month</span>} 
                          value={3200} 
                          prefix={<DollarOutlined />} 
                          valueStyle={{ color: '#1F99ED', fontSize: '18px' }}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Card bodyStyle={{ padding: '12px' }}>
                        <Statistic 
                          title={<span style={{ fontSize: '12px' }}>Average</span>} 
                          value={85} 
                          prefix={<DollarOutlined />} 
                          valueStyle={{ color: '#2E3192', fontSize: '18px' }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </TabPane>

              {/* Settings Tab */}
              <TabPane tab="Settings" key="settings">
                <Card title={<span style={{ fontSize: '14px' }}>Admin Settings</span>} bodyStyle={{ padding: '16px' }}>
                  <Paragraph style={{ fontSize: '13px' }}>
                    Configure your admin panel settings here.
                  </Paragraph>
                  <Button type="primary">Save Settings</Button>
                </Card>
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Layout>

      {/* Create Content Modal */}
      <Modal
        title="Create New Content"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateContent}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title!' }]}
          >
            <Input placeholder="Enter content title" />
          </Form.Item>
          
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="blog">Blog Post</Select.Option>
              <Select.Option value="event">Event</Select.Option>
              <Select.Option value="workshop">Workshop</Select.Option>
              <Select.Option value="podcast">Podcast</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="scheduleDate"
            label="Schedule Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Content
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <style jsx global>{`
        @media (max-width: 991px) {
          .desktop-sider {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-block !important;
          }
          .welcome-title {
            font-size: 18px !important;
          }
        }
        @media (min-width: 992px) {
          .mobile-admin-header .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 575px) {
          .hide-on-mobile {
            display: none;
          }
        }
      `}</style>
    </Layout>
  )
}
