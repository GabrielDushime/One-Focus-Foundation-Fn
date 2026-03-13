import { Layout, Card, Row, Col, Statistic, Tag, Button, Typography, Avatar, List, Progress } from 'antd'
import { UserOutlined, BookOutlined, StarOutlined, ClockCircleOutlined, CheckCircleOutlined, PlayCircleOutlined, CalendarOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import HeaderComponent from '../../components/Header'

const { Content } = Layout
const { Title, Text } = Typography

// Sample data for user dashboard
const enrolledPrograms = [
  { key: '1', name: 'Leadership Development', progress: 75, status: 'in_progress', nextSession: 'Jan 25, 2024' },
  { key: '2', name: 'Digital Marketing Basics', progress: 100, status: 'completed', nextSession: null },
  { key: '3', name: 'Public Speaking Workshop', progress: 30, status: 'in_progress', nextSession: 'Jan 28, 2024' },
]

const upcomingEvents = [
  { key: '1', title: 'Monthly Community Meetup', date: 'Jan 20, 2024', type: 'event' },
  { key: '2', title: 'Mentorship Session with John', date: 'Jan 22, 2024', type: 'mentorship' },
  { key: '3', title: 'Workshop: Career Planning', date: 'Jan 25, 2024', type: 'workshop' },
]

const achievements = [
  { key: '1', title: 'First Login', icon: '🎯', earned: true },
  { key: '2', title: 'Complete Profile', icon: '📝', earned: true },
  { key: '3', title: 'Attend 5 Events', icon: '🎉', earned: true },
  { key: '4', title: 'Earn Certificate', icon: '🏆', earned: false },
  { key: '5', title: 'Become Mentor', icon: '🌟', earned: false },
]

export default function UserDashboard() {
  const [userName, setUserName] = useState('User')
  
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
        }} className="user-mobile-header">
          <Title level={4} style={{ margin: 0, color: '#52c41a' }}>My Dashboard</Title>
          <Tag color="#52c41a">USER</Tag>
        </div>

        {/* Welcome Banner */}
        <Card 
          style={{ marginBottom: '16px', background: 'linear-gradient(135deg, #52c41a, #1890ff)', border: 'none' }}
          bodyStyle={{ padding: '16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              {/* fontSize handled via CSS media query below — avoids window access during SSR */}
              <Title level={4} className="welcome-title" style={{ color: 'white', margin: 0, fontSize: '18px' }}>
                Welcome back, {userName}! 👋
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                Continue your learning journey with OneFocus Africa.
              </Text>
            </div>
            <Avatar 
              size={48} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
          </div>
        </Card>

        {/* Stats Row */}
        <Row gutter={[12, 12]} style={{ marginBottom: '16px' }}>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px' }}>Enrolled</span>} 
                value={3} 
                prefix={<BookOutlined />} 
                valueStyle={{ color: '#1F99ED', fontSize: '20px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px' }}>Completed</span>} 
                value={1} 
                prefix={<CheckCircleOutlined />} 
                valueStyle={{ color: '#52c41a', fontSize: '20px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px' }}>Upcoming</span>} 
                value={3} 
                prefix={<ClockCircleOutlined />} 
                valueStyle={{ color: '#faad14', fontSize: '20px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px' }}>Achievements</span>} 
                value="3/5" 
                prefix={<StarOutlined />} 
                valueStyle={{ color: '#2E3192', fontSize: '20px' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row gutter={[12, 12]}>
          {/* Enrolled Programs */}
          <Col xs={24} lg={16}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOutlined style={{ color: '#1F99ED' }} />
                  <span style={{ fontSize: '14px' }}>My Programs</span>
                </div>
              }
              bodyStyle={{ padding: '12px' }}
            >
              <List
                itemLayout="horizontal"
                dataSource={enrolledPrograms}
                size="small"
                renderItem={(item) => (
                  <List.Item style={{ padding: '8px 0' }}>
                    <List.Item.Meta
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <span style={{ fontSize: '14px' }}>{item.name}</span>
                          <Tag color={item.status === 'completed' ? 'success' : 'processing'} style={{ margin: 0 }}>
                            {item.status === 'completed' ? 'Completed' : 'In Progress'}
                          </Tag>
                        </div>
                      }
                      description={
                        <div style={{ marginTop: '8px' }}>
                          <Progress 
                            percent={item.progress} 
                            size="small" 
                            status={item.status === 'completed' ? 'success' : 'active'}
                            style={{ marginBottom: '4px' }}
                          />
                          {item.nextSession && (
                            <Text type="secondary" style={{ fontSize: '11px' }}>
                              Next session: {item.nextSession}
                            </Text>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
              <Button type="primary" icon={<PlayCircleOutlined />} block style={{ marginTop: '12px' }}>
                Browse More Programs
              </Button>
            </Card>
          </Col>

          {/* Sidebar - Events & Achievements */}
          <Col xs={24} lg={8}>
            {/* Upcoming Events */}
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarOutlined style={{ color: '#1F99ED' }} />
                  <span style={{ fontSize: '14px' }}>Upcoming Events</span>
                </div>
              }
              bodyStyle={{ padding: '8px' }}
            >
              <List
                itemLayout="horizontal"
                dataSource={upcomingEvents}
                size="small"
                renderItem={(item) => (
                  <List.Item style={{ padding: '8px' }}>
                    <List.Item.Meta
                      title={<span style={{ fontSize: '13px' }}>{item.title}</span>}
                      description={
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {item.date}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Achievements */}
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StarOutlined style={{ color: '#1F99ED' }} />
                  <span style={{ fontSize: '14px' }}>Achievements</span>
                </div>
              }
              bodyStyle={{ padding: '12px' }}
              style={{ marginTop: '12px' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {achievements.map((achievement) => (
                  <div
                    key={achievement.key}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: achievement.earned ? '#f6ffed' : '#f5f5f5',
                      border: `1px solid ${achievement.earned ? '#b7eb8f' : '#d9d9d9'}`,
                      opacity: achievement.earned ? 1 : 0.5,
                      width: '70px',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{achievement.icon}</span>
                    <Text style={{ fontSize: '9px', textAlign: 'center', marginTop: '4px', lineHeight: 1.2 }}>
                      {achievement.title}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Card 
          title={<span style={{ fontSize: '14px' }}>Quick Actions</span>}
          bodyStyle={{ padding: '12px' }}
          style={{ marginTop: '16px' }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button type="primary" icon={<BookOutlined />} size="small">Browse Programs</Button>
            <Button icon={<CalendarOutlined />} size="small">View Events</Button>
            <Button icon={<StarOutlined />} size="small">My Achievements</Button>
            <Button icon={<UserOutlined />} size="small">Edit Profile</Button>
          </div>
        </Card>

      </Content>

      <style jsx global>{`
        @media (max-width: 575px) {
          .user-mobile-header {
            display: flex !important;
          }
          .welcome-title {
            font-size: 16px !important;
          }
        }
      `}</style>
    </Layout>
  )
}
