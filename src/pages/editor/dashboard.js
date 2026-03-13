'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Layout, Card, Row, Col, Statistic, Table, Tag, Button, Typography, Avatar } from 'antd'
import {
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons'

import HeaderComponent from '../../components/Header'

const { Content } = Layout
const { Title, Text } = Typography

// Sample data
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

// Table columns
const columns = [
  { title: 'Title', dataIndex: 'title', key: 'title', render: (text) => <strong>{text}</strong> },
  { 
    title: 'Status', dataIndex: 'status', key: 'status',
    render: (status) => {
      const colors = { published: 'green', draft: 'default', review: 'orange' }
      return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>
    }
  },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Views', dataIndex: 'views', key: 'views', render: (views) => views.toLocaleString() },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="link" icon={<EyeOutlined />} size="small">View</Button>
        <Button type="link" icon={<EditOutlined />} size="small">Edit</Button>
      </div>
    )
  }
]

const taskColumns = [
  { title: 'Task', dataIndex: 'task', key: 'task' },
  { 
    title: 'Priority', dataIndex: 'priority', key: 'priority',
    render: (priority) => {
      const colors = { high: 'red', medium: 'orange', low: 'blue' }
      return <Tag color={colors[priority]}>{priority.toUpperCase()}</Tag>
    }
  },
  { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
]

export default function EditorDashboard() {
  const [userName, setUserName] = useState('Editor')
  const [isMobile, setIsMobile] = useState(false)

  // Load user info and check screen size on client
  useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) setUserName(storedName)

    const handleResize = () => setIsMobile(window.innerWidth < 576)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Layout style={{ minHeight: '100vh', marginTop: 70 }}>
      <HeaderComponent />
      <Content style={{ padding: 16, backgroundColor: '#f5f5f5' }}>

        {/* Mobile Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }} className="editor-mobile-header">
          <Title level={4} style={{ margin: 0, color: '#2E3192' }}>Editor Dashboard</Title>
          <Tag color="#1F99ED">EDITOR</Tag>
        </div>

        {/* Welcome Banner */}
        <Card 
          style={{ marginBottom: 16, background: 'linear-gradient(135deg, #1F99ED, #2E3192)', border: 'none' }}
          bodyStyle={{ padding: 16 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <Title level={4} style={{ color: 'white', margin: 0, fontSize: isMobile ? '16px' : '18px' }}>
                Welcome back, {userName}! 👋
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                Here&apos;s what&apos;s happening with your content today.
              </Text>
            </div>
            <Avatar size={48} icon={<UserOutlined />} style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
          </div>
        </Card>

        {/* Stats */}
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: 12 }}>
              <Statistic title="Published" value={12} prefix={<FileTextOutlined />} valueStyle={{ color: '#52c41a', fontSize: 20 }} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: 12 }}>
              <Statistic title="Total Views" value={45320} prefix={<EyeOutlined />} valueStyle={{ color: '#1F99ED', fontSize: 20 }} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: 12 }}>
              <Statistic title="Drafts" value={5} prefix={<EditOutlined />} valueStyle={{ color: '#faad14', fontSize: 20 }} />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: 12 }}>
              <Statistic title="Pending" value={3} prefix={<TeamOutlined />} valueStyle={{ color: '#ff4d4f', fontSize: 20 }} />
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row gutter={[12, 12]}>
          {/* Recent Articles */}
          <Col xs={24} lg={16}>
            <Card
              title={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FileTextOutlined style={{ color: '#1F99ED' }} />Recent Articles</div>}
              extra={<Button type="link" size="small">View All</Button>}
              bodyStyle={{ padding: 12 }}
            >
              <Table columns={columns} dataSource={recentArticles} pagination={false} size="small" scroll={{ x: 500 }} />
            </Card>
          </Col>

          {/* Pending Tasks */}
          <Col xs={24} lg={8}>
            <Card
              title={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CalendarOutlined style={{ color: '#1F99ED' }} />Pending Tasks</div>}
              bodyStyle={{ padding: 12 }}
            >
              <Table columns={taskColumns} dataSource={pendingTasks} pagination={false} size="small" scroll={{ x: 250 }} />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Card title="Quick Actions" bodyStyle={{ padding: 12 }} style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
