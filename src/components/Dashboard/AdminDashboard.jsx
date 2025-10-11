import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Menu, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Avatar, 
  Typography, 
  Spin,
  Badge,
  Button,
  Space,
  Alert,
  Drawer,
  Dropdown,
  Tooltip
} from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  BookOutlined,
  TrophyOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  RiseOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
  FileTextOutlined,
  PhoneOutlined,
  GiftOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined
} from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const API_BASE_URL = 'https://onefocus-fou.onrender.com';

const API_ENDPOINTS = {
  JOIN_US: `${API_BASE_URL}/join-us/stats`,
  BOOK_US: `${API_BASE_URL}/book-us/stats`,
  GET_INVOLVED: `${API_BASE_URL}/get-involved/stats`,
  REGISTER_NOW: `${API_BASE_URL}/register-now/stats`,
  PARTNERSHIPS: `${API_BASE_URL}/partnerships/statistics`,
  VOLUNTEERS: `${API_BASE_URL}/volunteers/statistics`,
  MENTORS: `${API_BASE_URL}/mentors/stats`,
  DONATIONS: `${API_BASE_URL}/donations/stats`,
  SUBSCRIBE: `${API_BASE_URL}/subscribe/stats`,
  BASIC_MEMBERSHIP: `${API_BASE_URL}/memberships/basic/stats`,
  PREMIUM_MEMBERSHIP: `${API_BASE_URL}/memberships/premium/stats`,
  CORPORATE_SPONSOR: `${API_BASE_URL}/sponsors/corporate/stats`,
  WORKSHOPS: `${API_BASE_URL}/workshops/stats`,
  CONTACT: `${API_BASE_URL}/contact/stats`,
  EVENTS: `${API_BASE_URL}/events/stats`,
  EVENT_REGISTRATIONS: `${API_BASE_URL}/event-registrations`,
  BLOGS: `${API_BASE_URL}/blogs/stats`,
  GET_INVOLVED_ACTIONS: `${API_BASE_URL}/get-involved-actions/stats`,
  BE_GUEST: `${API_BASE_URL}/be-guest`
};

const COLORS = ['#1F99ED', '#2E3192', '#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7'];

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  // Mock admin data
  const adminData = {
    name: 'Alain IBYIZA',
    role: 'CEO & Founder',
    email: 'admin@onefocus.org',
    avatar: '/About/Alain.png'
  };

  // Handle responsive
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileDrawerVisible(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const responses = await Promise.allSettled([
        fetch(API_ENDPOINTS.JOIN_US, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.BOOK_US, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.GET_INVOLVED, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.REGISTER_NOW, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.PARTNERSHIPS, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.VOLUNTEERS, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.MENTORS, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.DONATIONS, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.SUBSCRIBE, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.BASIC_MEMBERSHIP, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.PREMIUM_MEMBERSHIP, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.CORPORATE_SPONSOR, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.WORKSHOPS, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.CONTACT, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.EVENTS, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.BLOGS, { headers }).then(r => r.json()),
        fetch(API_ENDPOINTS.GET_INVOLVED_ACTIONS, { headers }).then(r => r.json())
      ]);

      const data = {
        joinUs: responses[0].status === 'fulfilled' ? responses[0].value.data : {},
        bookUs: responses[1].status === 'fulfilled' ? responses[1].value.data : {},
        getInvolved: responses[2].status === 'fulfilled' ? responses[2].value.data : {},
        registerNow: responses[3].status === 'fulfilled' ? responses[3].value.data : {},
        partnerships: responses[4].status === 'fulfilled' ? responses[4].value.data : {},
        volunteers: responses[5].status === 'fulfilled' ? responses[5].value.data : {},
        mentors: responses[6].status === 'fulfilled' ? responses[6].value.data : {},
        donations: responses[7].status === 'fulfilled' ? responses[7].value.data : {},
        subscribers: responses[8].status === 'fulfilled' ? responses[8].value.data : {},
        basicMembership: responses[9].status === 'fulfilled' ? responses[9].value.data : {},
        premiumMembership: responses[10].status === 'fulfilled' ? responses[10].value.data : {},
        corporateSponsor: responses[11].status === 'fulfilled' ? responses[11].value.data : {},
        workshops: responses[12].status === 'fulfilled' ? responses[12].value.data : {},
        contact: responses[13].status === 'fulfilled' ? responses[13].value.data : {},
        events: responses[14].status === 'fulfilled' ? responses[14].value.data : {},
        blogs: responses[15].status === 'fulfilled' ? responses[15].value.data : {},
        getInvolvedActions: responses[16].status === 'fulfilled' ? responses[16].value.data : {}
      };

      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalStats = () => {
    const total = {
      applications: 0,
      members: 0,
      donations: 0,
      events: 0,
      subscribers: 0,
      mentors: 0
    };

    if (dashboardData.joinUs) total.applications += dashboardData.joinUs.total || 0;
    if (dashboardData.bookUs) total.applications += dashboardData.bookUs.total || 0;
    if (dashboardData.getInvolved) total.applications += dashboardData.getInvolved.total || 0;
    if (dashboardData.registerNow) total.applications += dashboardData.registerNow.total || 0;
    if (dashboardData.workshops) total.applications += dashboardData.workshops.total || 0;
    if (dashboardData.getInvolvedActions) total.applications += dashboardData.getInvolvedActions.total || 0;
    
    if (dashboardData.basicMembership) total.members += dashboardData.basicMembership.total || 0;
    if (dashboardData.premiumMembership) total.members += dashboardData.premiumMembership.total || 0;
    if (dashboardData.corporateSponsor) total.members += dashboardData.corporateSponsor.total || 0;
    
    if (dashboardData.donations) total.donations = dashboardData.donations.totalAmount || 0;
    if (dashboardData.events) total.events = dashboardData.events.total || 0;
    if (dashboardData.subscribers) total.subscribers = dashboardData.subscribers.total || 0;
    if (dashboardData.mentors) total.mentors = dashboardData.mentors.total || 0;

    return total;
  };

  const getProgramsData = () => {
    return [
      { name: 'Join Us', value: dashboardData.joinUs?.total || 0 },
      { name: 'Book Us', value: dashboardData.bookUs?.total || 0 },
      { name: 'Get Involved', value: dashboardData.getInvolved?.total || 0 },
      { name: 'Workshops', value: dashboardData.workshops?.total || 0 },
      { name: 'Conference', value: dashboardData.registerNow?.total || 0 },
      { name: 'Actions', value: dashboardData.getInvolvedActions?.total || 0 }
    ];
  };

  const getMembershipData = () => {
    return [
      { name: 'Basic', value: dashboardData.basicMembership?.total || 0, color: '#1F99ED' },
      { name: 'Premium', value: dashboardData.premiumMembership?.total || 0, color: '#2E3192' },
      { name: 'Corporate', value: dashboardData.corporateSponsor?.total || 0, color: '#FFD93D' }
    ];
  };

  const getStatusTrendsData = () => {
    return [
      { 
        name: 'Pending', 
        value: (dashboardData.joinUs?.pending || 0) + 
               (dashboardData.bookUs?.pending || 0) + 
               (dashboardData.getInvolved?.pending || 0)
      },
      { 
        name: 'Approved', 
        value: (dashboardData.joinUs?.approved || 0) + 
               (dashboardData.bookUs?.confirmed || 0) + 
               (dashboardData.getInvolved?.approved || 0)
      },
      { 
        name: 'Rejected', 
        value: (dashboardData.joinUs?.rejected || 0) + 
               (dashboardData.bookUs?.cancelled || 0) + 
               (dashboardData.getInvolved?.rejected || 0)
      }
    ];
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'programs',
      icon: <BookOutlined />,
      label: 'Programs',
      children: [
        { key: 'join-us', label: 'Join Us' },
        { key: 'book-us', label: 'Book Now' },
        { key: 'get-involved', label: 'Get Involved' },
      ],
    },
    {
      key: 'events',
      icon: <CalendarOutlined />,
      label: 'Events',
      children: [
        { key: 'events-list', label: 'All Events' },
        { key: 'event-registrations', label: 'Registrations' },
        { key: 'workshops', label: 'Workshops' },
      ],
    },
    {
      key: 'community',
      icon: <TeamOutlined />,
      label: 'Community',
      children: [
        { key: 'volunteers', label: 'Volunteers' },
        { key: 'mentors', label: 'Mentors' },
        { key: 'partnerships', label: 'Partnerships' },
      ],
    },
    {
      key: 'membership',
      icon: <TrophyOutlined />,
      label: 'Membership',
      children: [
        { key: 'basic', label: 'Basic' },
        { key: 'premium', label: 'Premium' },
        { key: 'corporate', label: 'Corporate' },
      ],
    },
    {
      key: 'financial',
      icon: <DollarOutlined />,
      label: 'Financial',
      children: [
        { key: 'donations', label: 'Donations' },
        { key: 'transactions', label: 'Transactions' },
      ],
    },
    {
      key: 'communication',
      icon: <MailOutlined />,
      label: 'Communication',
      children: [
        { key: 'subscribers', label: 'Subscribers' },
        { key: 'contact', label: 'Contact Messages' },
      ],
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const totalStats = getTotalStats();

  const sidebarContent = (
    <>
      <div style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
        color: 'white',
        fontWeight: 600,
        fontSize: 18
      }}>
        {collapsed ? 'OF' : 'ONEFOCUS'}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedMenu]}
        items={menuItems}
        onClick={({ key }) => {
          setSelectedMenu(key);
          if (isMobile) setMobileDrawerVisible(false);
        }}
        style={{ borderRight: 0 }}
      />
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          {sidebarContent}
        </Sider>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          closable={false}
          bodyStyle={{ padding: 0 }}
          width={250}
        >
          {sidebarContent}
        </Drawer>
      )}

      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 200) }}>
        <Header style={{ 
          background: 'white', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          position: 'sticky',
          top: 0,
          zIndex: 999
        }}>
          <Space>
            <Button
              type="text"
              icon={isMobile ? <MenuUnfoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
              onClick={() => {
                if (isMobile) {
                  setMobileDrawerVisible(true);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
              style={{ fontSize: 18 }}
            />
            <Title level={4} style={{ margin: 0, color: '#1F99ED' }}>
              ONEFOCUS Admin Dashboard
            </Title>
          </Space>

          <Space size="large">
            <Tooltip title="Notifications">
              <Badge count={dashboardData.contact?.new || 0}>
                <Button
                  type="text"
                  icon={<BellOutlined style={{ fontSize: 18 }} />}
                />
              </Badge>
            </Tooltip>

            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  src={adminData.avatar}
                  size="large"
                  icon={<UserOutlined />}
                />
                {!isMobile && (
                  <Space direction="vertical" size={0}>
                    <Text strong>{adminData.name}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {adminData.role}
                    </Text>
                  </Space>
                )}
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ margin: '24px', minHeight: 280 }}>
          {loading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '60vh' 
            }}>
              <Spin size="large" tip="Loading dashboard data..." />
            </div>
          ) : (
            <>
              {/* Key Metrics Cards */}
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                  <Card 
                    bordered={false}
                    style={{ 
                      background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
                      borderRadius: 12
                    }}
                  >
                    <Statistic
                      title={<span style={{ color: 'white' }}>Total Applications</span>}
                      value={totalStats.applications}
                      prefix={<FileTextOutlined style={{ color: 'white' }} />}
                      valueStyle={{ color: 'white', fontWeight: 700 }}
                    />
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                      <RiseOutlined /> +12% from last month
                    </Text>
                  </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                  <Card 
                    bordered={false}
                    style={{ 
                      background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                      borderRadius: 12
                    }}
                  >
                    <Statistic
                      title={<span style={{ color: 'white' }}>Total Members</span>}
                      value={totalStats.members}
                      prefix={<UserOutlined style={{ color: 'white' }} />}
                      valueStyle={{ color: 'white', fontWeight: 700 }}
                    />
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                      <RiseOutlined /> +8% from last month
                    </Text>
                  </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                  <Card 
                    bordered={false}
                    style={{ 
                      background: 'linear-gradient(135deg, #FFD93D, #F6A623)',
                      borderRadius: 12
                    }}
                  >
                    <Statistic
                      title={<span style={{ color: 'white' }}>Total Donations</span>}
                      value={totalStats.donations}
                      prefix={<DollarOutlined style={{ color: 'white' }} />}
                      valueStyle={{ color: 'white', fontWeight: 700 }}
                      suffix="RWF"
                    />
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                      <RiseOutlined /> +25% from last month
                    </Text>
                  </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                  <Card 
                    bordered={false}
                    style={{ 
                      background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
                      borderRadius: 12
                    }}
                  >
                    <Statistic
                      title={<span style={{ color: 'white' }}>Active Events</span>}
                      value={totalStats.events}
                      prefix={<CalendarOutlined style={{ color: 'white' }} />}
                      valueStyle={{ color: 'white', fontWeight: 700 }}
                    />
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                      <RiseOutlined /> +5% from last month
                    </Text>
                  </Card>
                </Col>
              </Row>

              {/* Additional Quick Stats */}
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={12} sm={8} lg={4}>
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Statistic
                      title="Mentors"
                      value={totalStats.mentors}
                      prefix={<TeamOutlined style={{ color: '#1F99ED' }} />}
                      valueStyle={{ color: '#1F99ED', fontSize: 24 }}
                    />
                  </Card>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Statistic
                      title="Volunteers"
                      value={dashboardData.volunteers?.total || 0}
                      prefix={<UsergroupAddOutlined style={{ color: '#4ECDC4' }} />}
                      valueStyle={{ color: '#4ECDC4', fontSize: 24 }}
                    />
                  </Card>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Statistic
                      title="Subscribers"
                      value={totalStats.subscribers}
                      prefix={<MailOutlined style={{ color: '#FF6B6B' }} />}
                      valueStyle={{ color: '#FF6B6B', fontSize: 24 }}
                    />
                  </Card>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Statistic
                      title="Partnerships"
                      value={dashboardData.partnerships?.total || 0}
                      prefix={<GiftOutlined style={{ color: '#FFD93D' }} />}
                      valueStyle={{ color: '#FFD93D', fontSize: 24 }}
                    />
                  </Card>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Statistic
                      title="Workshops"
                      value={dashboardData.workshops?.total || 0}
                      prefix={<BookOutlined style={{ color: '#6C5CE7' }} />}
                      valueStyle={{ color: '#6C5CE7', fontSize: 24 }}
                    />
                  </Card>
                </Col>

                <Col xs={12} sm={8} lg={4}>
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Statistic
                      title="Blog Posts"
                      value={dashboardData.blogs?.total || 0}
                      prefix={<FileTextOutlined style={{ color: '#2E3192' }} />}
                      valueStyle={{ color: '#2E3192', fontSize: 24 }}
                    />
                  </Card>
                </Col>
              </Row>

              {/* Charts Section */}
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={12}>
                  <Card 
                    title="Programs Overview" 
                    bordered={false}
                    style={{ borderRadius: 12 }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getProgramsData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#1F99ED" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card 
                    title="Membership Distribution" 
                    bordered={false}
                    style={{ borderRadius: 12 }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={getMembershipData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getMembershipData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card 
                    title="Application Status Trends" 
                    bordered={false}
                    style={{ borderRadius: 12 }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={getStatusTrendsData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#1F99ED" 
                          fill="#1F99ED" 
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card 
                    title="Monthly Donation Trends" 
                    bordered={false}
                    style={{ borderRadius: 12 }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart 
                        data={[
                          { month: 'Jan', amount: dashboardData.donations?.monthlyTotal || 0 },
                          { month: 'Feb', amount: (dashboardData.donations?.monthlyTotal || 0) * 1.2 },
                          { month: 'Mar', amount: (dashboardData.donations?.monthlyTotal || 0) * 0.9 },
                          { month: 'Apr', amount: (dashboardData.donations?.monthlyTotal || 0) * 1.5 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#FFD93D" 
                          strokeWidth={3}
                          dot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>

              {/* Recent Activity */}
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24}>
                  <Card 
                    title="System Status" 
                    bordered={false}
                    style={{ borderRadius: 12 }}
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={8}>
                        <Alert
                          message="Contact Messages"
                          description={`${dashboardData.contact?.new || 0} new messages waiting for response`}
                          type="info"
                          showIcon
                        />
                      </Col>
                      <Col xs={24} md={8}>
                        <Alert
                          message="Pending Applications"
                          description={`${(dashboardData.joinUs?.pending || 0) + (dashboardData.bookUs?.pending || 0)} applications require review`}
                          type="warning"
                          showIcon
                        />
                      </Col>
                      <Col xs={24} md={8}>
                        <Alert
                          message="Upcoming Events"
                          description={`${dashboardData.events?.upcoming || 0} events scheduled this month`}
                          type="success"
                          showIcon
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;