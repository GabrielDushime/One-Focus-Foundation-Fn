'use client'

export const dynamic = 'force-dynamic'
import { Layout, Card, Row, Col, Statistic, Table, Tag, Button, Typography, Avatar, List, Drawer } from 'antd'
import { EditOutlined, EyeOutlined, FileTextOutlined, UserOutlined, TeamOutlined, CalendarOutlined, PlusOutlined, MenuOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import HeaderComponent from '../../components/Header'

const { Content } = Layout
const { Title, Text } = Typography

// Sample data for editor dashboard
const recentArticles = [
  { key: '1', title: 'Annual Report 2024 Released', status: 'published', date: '2024-01-15', views: 1250 },
  { key: '2', title: 'New Workshop Series Announced', status: 'draft', date: '2024-01-14', views: 0 },
  { key: '3', title: 'Partnership with Local Schools', status: 'published', date: '2024-01-12', views: 890 },
  { key: '4', title: 'Volunteer Opportunities Update', status: 'review', date: '2024-01-10', views: 0 },
]

const pendingTasks = [
  { key: '1', task: 'Review blog submissions', priority: 'high', dueDate: '2024-01-20' },
  { key: '2', task: 'Update podcast descriptions', priority: 'medium', dueDate: '2024-01-22' },
  { key: '3', task: 'Approve community posts', priority: 'low', dueDate: '2024-01-25' },
]

const columns = [
  { title: 'Title', dataIndex: 'title', key: 'title', render: (text) => <strong>{text}</strong> },
  { 
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status',
    render: (status) => {
      const colors = { published: 'green', draft: 'default', review: 'orange' }
      return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>
    }
  },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { 
    title: 'Views', 
    dataIndex: 'views', 
    key: 'views',
    render: (views) => views.toLocaleString()
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button type="link" icon={<EyeOutlined />} size="small">View</Button>
        <Button type="link" icon={<EditOutlined />} size="small">Edit</Button>
      </div>
    )
  }
]

const taskColumns = [
  { title: 'Task', dataIndex: 'task', key: 'task' },
  { 
    title: 'Priority', 
    dataIndex: 'priority', 
    key: 'priority',
    render: (priority) => {
      const colors = { high: 'red', medium: 'orange', low: 'blue' }
      return <Tag color={colors[priority]}>{priority.toUpperCase()}</Tag>
    }
  },
  { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
]

export default function EditorDashboard() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [userName, setUserName] = useState('Editor')
  
  useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) setUserName(storedName)
  }, [])

  return (
    <Layout style={{ minHeight: '100vh', marginTop: '70px' }}>
      <HeaderComponent />
      <Content style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
        
        {/* Mobile Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '16px'
        }} className="editor-mobile-header">
          <Title level={4} style={{ margin: 0, color: '#2E3192' }}>Editor Dashboard</Title>
          <Tag color="#1F99ED">EDITOR</Tag>
        </div>

        {/* Welcome Banner - Responsive */}
        <Card 
          style={{ marginBottom: '16px', background: 'linear-gradient(135deg, #1F99ED, #2E3192)', border: 'none' }}
          bodyStyle={{ padding: '16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <Title level={4} style={{ color: 'white', margin: 0, fontSize: window?.innerWidth < 576 ? '16px' : '18px' }}>
                Welcome back, {userName}! 👋
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                Here&apos;s what&apos;s happening with your content today.
              </Text>
            </div>
            <Avatar 
              size={48} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
          </div>
        </Card>

        {/* Stats Row - Fully Responsive */}
        <Row gutter={[12, 12]} style={{ marginBottom: '16px' }}>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px' }}>Published</span>} 
                value={12} 
                prefix={<FileTextOutlined />} 
                valueStyle={{ color: '#52c41a', fontSize: '20px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px' }}>Total Views</span>} 
                value={45320} 
                prefix={<EyeOutlined />} 
                valueStyle={{ color: '#1F99ED', fontSize: '20px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px' }}>Drafts</span>} 
                value={5} 
                prefix={<EditOutlined />} 
                valueStyle={{ color: '#faad14', fontSize: '20px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px' }}>Pending</span>} 
                value={3} 
                prefix={<TeamOutlined />} 
                valueStyle={{ color: '#ff4d4f', fontSize: '20px' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Content - Responsive */}
        <Row gutter={[12, 12]}>
          {/* Recent Articles */}
          <Col xs={24} lg={16}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileTextOutlined style={{ color: '#1F99ED' }} />
                  <span style={{ fontSize: '14px' }}>Recent Articles</span>
                </div>
              }
              extra={<Button type="link" size="small">View All</Button>}
              bodyStyle={{ padding: '12px' }}
            >
              <Table 
                columns={columns} 
                dataSource={recentArticles} 
                pagination={false}
                size="small"
                scroll={{ x: 500 }}
              />
            </Card>
          </Col>

          {/* Pending Tasks */}
          <Col xs={24} lg={8}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarOutlined style={{ color: '#1F99ED' }} />
                  <span style={{ fontSize: '14px' }}>Pending Tasks</span>
                </div>
              }
              bodyStyle={{ padding: '12px' }}
            >
              <Table 
                columns={taskColumns} 
                dataSource={pendingTasks} 
                pagination={false}
                size="small"
                scroll={{ x: 250 }}
              />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions - Responsive */}
        <Card 
          title={<span style={{ fontSize: '14px' }}>Quick Actions</span>}
          bodyStyle={{ padding: '12px' }}
          style={{ marginTop: '16px' }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button type="primary" icon={<PlusOutlined />} size="small">New Article</Button>
            <Button icon={<FileTextOutlined />} size="small">Manage Blogs</Button>
            <Button icon={<CalendarOutlined />} size="small">Schedule Post</Button>
            <Button icon={<TeamOutlined />} size="small">Review</Button>
          </div>
        </Card>

      </Content>

      <style jsx global>{`
        @media (max-width: 575px) {
          .editor-mobile-header {
            display: flex !important;
          }
        }
      `}</style>
    </Layout>
  )
}
