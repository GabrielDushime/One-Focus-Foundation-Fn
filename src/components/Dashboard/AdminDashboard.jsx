import React, { useState, useEffect } from 'react';
import { LayoutDashboard, User, Calendar, Book, Heart, Users, Award, FileText, Phone, Mail, Gift, Briefcase, Shield, Code, Camera, BookOpen, TrendingUp, CheckCircle, Clock, AlertTriangle, ArrowUp, Crown, UserPlus, ChevronLeft, ChevronRight, LogOut, Mic, GraduationCap, MessageSquare, Handshake, Target } from 'lucide-react';

const API_BASE_URL = 'https://onefocus-fou.onrender.com';

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalMemberships: 0, totalEvents: 0, totalBlogs: 0, totalDonations: 0, totalVolunteers: 0, totalPartnerships: 0, totalMentors: 0, totalGuestRequests: 0, totalCertificates: 0, totalContacts: 0, totalEventRegistrations: 0, totalGetInvolvedActions: 0, totalInternships: 0, totalBookUs: 0, totalJoinUs: 0, totalGetInvolved: 0, totalSocialMediaSupport: 0, totalStartCoding: 0, totalTraining: 0, totalWorkshops: 0, totalBookShoot: 0, totalSubscribers: 0, totalPremiumMemberships: 0, totalCorporateSponsors: 0, totalConferenceRegistrations: 0, recentActivity: 0
  });

  const menuItems = [
    { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', category: 'main' },
    { key: 'memberships', icon: Crown, label: 'Memberships', category: 'memberships', children: [
        { key: 'basic-membership', label: 'Basic Membership', icon: User },
        { key: 'premium-membership', label: 'Premium Membership', icon: Crown },
        { key: 'corporate-sponsor', label: 'Corporate Sponsors', icon: Shield }
      ]},
    { key: 'programs', icon: Book, label: 'Programs', category: 'programs', children: [
        { key: 'join-us', label: 'Join Us (Workshops)', icon: Users },
        { key: 'book-us', label: 'Book Us (Podcast)', icon: Phone },
        { key: 'get-involved', label: 'Get Involved (Mentorship)', icon: UserPlus }
      ]},
    { key: 'events', icon: Calendar, label: 'Events', category: 'events', children: [
        { key: 'event-creation', label: 'Event Management', icon: Calendar },
        { key: 'event-registration', label: 'Event Registrations', icon: FileText },
        { key: 'register-now', label: 'Conference Registration', icon: Calendar }
      ]},
    { key: 'services', icon: Briefcase, label: 'Services', category: 'services', children: [
        { key: 'internship', label: 'Internship Applications', icon: Briefcase },
        { key: 'social-media', label: 'Social Media Support', icon: Mail },
        { key: 'book-shoot', label: 'Book Shoot', icon: Camera },
        { key: 'training', label: 'Training Enrollments', icon: BookOpen },
        { key: 'start-coding', label: 'Start Coding', icon: Code },
        { key: 'certificates', label: 'Certificate Requests', icon: Award }
      ]},
    { key: 'community', icon: Users, label: 'Community', category: 'community', children: [
        { key: 'volunteers', label: 'Volunteers', icon: Heart },
        { key: 'partnerships', label: 'Partnerships', icon: Shield },
        { key: 'mentors', label: 'Mentors', icon: Briefcase },
        { key: 'get-involved-actions', label: 'Get Involved Actions', icon: TrendingUp }
      ]},
    { key: 'media', icon: FileText, label: 'Media', category: 'media', children: [
        { key: 'blogs', label: 'Blogs', icon: FileText },
        { key: 'be-guest', label: 'Be a Guest', icon: User }
      ]},
    { key: 'support', icon: Gift, label: 'Support', category: 'support', children: [
        { key: 'donations', label: 'Donations', icon: Heart },
        { key: 'contacters', label: 'Contact Messages', icon: Mail },
        { key: 'subscribers', label: 'Subscribers', icon: Mail }
      ]}
  ];

  const checkAuthentication = () => {
    try {
      const token = localStorage.getItem('access_token');
      const userRole = localStorage.getItem('user_role');
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      if (!token || userRole !== 'admin') {
        setIsAuthenticated(false);
        setAdminInfo(null);
        return false;
      }
      setIsAuthenticated(true);
      setAdminInfo({ username: username || 'Admin', email: email || '', role: userRole });
      return true;
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  const fetchDashboardData = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const headers = getAuthHeaders();
      const responses = await Promise.allSettled([
        fetch(`${API_BASE_URL}/memberships/basic`, { headers }), 
        fetch(`${API_BASE_URL}/events`, { headers }), 
        fetch(`${API_BASE_URL}/blogs/published`), 
        fetch(`${API_BASE_URL}/donations`, { headers }), 
        fetch(`${API_BASE_URL}/volunteers`, { headers }), 
        fetch(`${API_BASE_URL}/partnerships`, { headers }), 
        fetch(`${API_BASE_URL}/mentors`, { headers }), 
        fetch(`${API_BASE_URL}/be-guest`, { headers }), 
        fetch(`${API_BASE_URL}/certificate-requests`, { headers }), 
        fetch(`${API_BASE_URL}/contact/contacters`, { headers }), 
        fetch(`${API_BASE_URL}/event-registrations`, { headers }), 
        fetch(`${API_BASE_URL}/get-involved-actions`, { headers }), 
        fetch(`${API_BASE_URL}/internship-applications`, { headers }), 
        fetch(`${API_BASE_URL}/book-us`, { headers }), 
        fetch(`${API_BASE_URL}/join-us`, { headers }), 
        fetch(`${API_BASE_URL}/get-involved`, { headers }), 
        fetch(`${API_BASE_URL}/social-media-support`, { headers }), 
        fetch(`${API_BASE_URL}/start-coding`, { headers }), 
        fetch(`${API_BASE_URL}/training-enrollments`, { headers }), 
        fetch(`${API_BASE_URL}/workshops`, { headers }), 
        fetch(`${API_BASE_URL}/book-shoot`, { headers }), 
        fetch(`${API_BASE_URL}/subscribe/subscribers`, { headers }), 
        fetch(`${API_BASE_URL}/memberships/premium`, { headers }), 
        fetch(`${API_BASE_URL}/sponsors/corporate`, { headers }), 
        fetch(`${API_BASE_URL}/event-registrations`, { headers })
      ]);

      let stats = { 
        totalMemberships: 0,
        totalEvents: 0, 
        totalBlogs: 0, 
        totalDonations: 0, 
        totalVolunteers: 0, 
        totalPartnerships: 0, 
        totalMentors: 0, 
        totalGuestRequests: 0, 
        totalCertificates: 0, 
        totalContacts: 0, 
        totalEventRegistrations: 0, 
        totalGetInvolvedActions: 0, 
        totalInternships: 0, 
        totalBookUs: 0, 
        totalJoinUs: 0, 
        totalGetInvolved: 0, 
        totalSocialMediaSupport: 0, 
        totalStartCoding: 0, 
        totalTraining: 0, 
        totalWorkshops: 0, 
        totalBookShoot: 0, 
        totalSubscribers: 0, 
        totalPremiumMemberships: 0, 
        totalCorporateSponsors: 0, 
        totalConferenceRegistrations: 0, 
        recentActivity: 0 };

      const keys = [
        'totalMemberships', 
        'totalEvents', 
        'totalBlogs', 
        'totalDonations', 
        'totalVolunteers', 
        'totalPartnerships', 
        'totalMentors', 
        'totalGuestRequests', 
        'totalCertificates', 
        'totalContacts', 
        'totalEventRegistrations', 
        'totalGetInvolvedActions', 
        'totalInternships', 
        'totalBookUs', 
        'totalJoinUs', 
        'totalGetInvolved', 
        'totalSocialMediaSupport', 
        'totalStartCoding', 
        'totalTraining', 
        'totalWorkshops', 
        'totalBookShoot', 
        'totalSubscribers', 
        'totalPremiumMemberships', 
        'totalCorporateSponsors', 
        'totalConferenceRegistrations'
      ];
      
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].status === 'fulfilled' && responses[i].value.ok) {
          const data = await responses[i].value.json();
          if (keys[i]) stats[keys[i]] = data.data?.total || data.total || 0;
        }
      }
      stats.recentActivity = Object.values(stats).reduce((a, b) => a + b, 0);
      setDashboardStats(stats);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    setAdminInfo(null);
    window.location.href = '/';
  };

  useEffect(() => { checkAuthentication(); }, []);
  useEffect(() => {
    const isAuth = checkAuthentication();
    if (isAuth && selectedMenu === 'dashboard') fetchDashboardData();
    else setLoading(false);
  }, [selectedMenu, isAuthenticated]);
  useEffect(() => { if (isAuthenticated) fetchDashboardData(); }, [isAuthenticated]);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`, borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '16px', border: `1px solid ${color}20`, transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${color}40` }}>
        <Icon size={28} color="white" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px', fontWeight: '500' }}>{title}</div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#2E3192' }}>{value}</div>
      </div>
    </div>
  );

  const ProgressBar = ({ percent, color }) => (
    <div style={{ width: '100%', height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', marginTop: '8px' }}>
      <div style={{ width: `${Math.min(percent, 100)}%`, height: '100%', background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`, transition: 'width 0.3s ease' }} />
    </div>
  );

  const renderDashboard = () => {
    const totalApplications = dashboardStats.totalInternships + dashboardStats.totalJoinUs + dashboardStats.totalBookUs + dashboardStats.totalGetInvolved + dashboardStats.totalStartCoding + dashboardStats.totalTraining + dashboardStats.totalBookShoot + dashboardStats.totalSocialMediaSupport;
    const totalMembershipCount = dashboardStats.totalMemberships + dashboardStats.totalPremiumMemberships + dashboardStats.totalCorporateSponsors;
    const totalEventRegs = dashboardStats.totalEventRegistrations + dashboardStats.totalConferenceRegistrations;

    return (
      <div>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '8px', color: '#2E3192', fontSize: '32px', fontWeight: '700' }}>Welcome back, {adminInfo?.username}! 👋</h2>
          <p style={{ color: '#666', fontSize: '16px' }}>Here's what's happening with ONEFOCUS Foundation today</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard title="Total Memberships" value={totalMembershipCount} icon={Crown} color="#1F99ED" />
          <StatCard title="Total Events" value={dashboardStats.totalEvents} icon={Calendar} color="#52c41a" />
          <StatCard title="Event Registrations" value={totalEventRegs} icon={FileText} color="#722ed1" />
          <StatCard title="Total Donations" value={dashboardStats.totalDonations} icon={Heart} color="#ff4d4f" />
        </div>

        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600', color: '#2E3192' }}>Membership Tiers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard title="Basic Members" value={dashboardStats.totalMemberships} icon={User} color="#1890ff" />
          <StatCard title="Premium Members" value={dashboardStats.totalPremiumMemberships} icon={Crown} color="#faad14" />
          <StatCard title="Corporate Sponsors" value={dashboardStats.totalCorporateSponsors} icon={Shield} color="#722ed1" />
        </div>

        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600', color: '#2E3192' }}>Community Engagement</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard title="Volunteers" value={dashboardStats.totalVolunteers} icon={Heart} color="#eb2f96" />
          <StatCard title="Partnerships" value={dashboardStats.totalPartnerships} icon={Handshake} color="#13c2c2" />
          <StatCard title="Mentors" value={dashboardStats.totalMentors} icon={GraduationCap} color="#fa8c16" />
          <StatCard title="Get Involved Actions" value={dashboardStats.totalGetInvolvedActions} icon={Target} color="#52c41a" />
        </div>

        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600', color: '#2E3192' }}>Service Requests</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard title="Internships" value={dashboardStats.totalInternships} icon={Briefcase} color="#13c2c2" />
          <StatCard title="Social Media" value={dashboardStats.totalSocialMediaSupport} icon={MessageSquare} color="#eb2f96" />
          <StatCard title="Book Shoot" value={dashboardStats.totalBookShoot} icon={Camera} color="#722ed1" />
          <StatCard title="Training" value={dashboardStats.totalTraining} icon={BookOpen} color="#fa8c16" />
          <StatCard title="Start Coding" value={dashboardStats.totalStartCoding} icon={Code} color="#1890ff" />
          <StatCard title="Certificates" value={dashboardStats.totalCertificates} icon={Award} color="#faad14" />
        </div>

        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600', color: '#2E3192' }}>Media & Communication</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard title="Blogs" value={dashboardStats.totalBlogs} icon={FileText} color="#52c41a" />
          <StatCard title="Guest Requests" value={dashboardStats.totalGuestRequests} icon={User} color="#722ed1" />
          <StatCard title="Contacts" value={dashboardStats.totalContacts} icon={Mail} color="#1890ff" />
          <StatCard title="Subscribers" value={dashboardStats.totalSubscribers} icon={Mail} color="#13c2c2" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600', color: '#2E3192' }}>System Activity</h3>
            {[
              { label: 'Community Growth', value: ((dashboardStats.totalVolunteers + dashboardStats.totalMentors) / 2).toFixed(0), percent: (dashboardStats.totalVolunteers + dashboardStats.totalMentors) / 2, color: '#1F99ED' },
              { label: 'Event Participation', value: Math.min((totalEventRegs / 100) * 100, 100).toFixed(0), percent: (totalEventRegs / 100) * 100, color: '#52c41a' },
              { label: 'Program Engagement', value: Math.min((totalApplications / 200) * 100, 100).toFixed(0), percent: (totalApplications / 200) * 100, color: '#722ed1' },
              { label: 'Support Impact', value: Math.min((dashboardStats.totalDonations / 50) * 100, 100).toFixed(0), percent: (dashboardStats.totalDonations / 50) * 100, color: '#faad14' }
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? '24px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{item.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: item.color }}>{item.value}%</span>
                </div>
                <ProgressBar percent={item.percent} color={item.color} />
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600', color: '#2E3192' }}>Quick Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Applications', value: totalApplications, icon: FileText, color: '#1F99ED' },
                { label: 'Community', value: dashboardStats.totalVolunteers + dashboardStats.totalMentors + dashboardStats.totalPartnerships, icon: Users, color: '#52c41a' },
                { label: 'Supporters', value: dashboardStats.totalDonations, icon: Heart, color: '#faad14' },
                { label: 'Total Records', value: dashboardStats.recentActivity, icon: TrendingUp, color: '#eb2f96' }
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '24px', background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%)`, borderRadius: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: `0 4px 12px ${item.color}40` }}>
                    <item.icon size={24} color="white" />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px', color: '#2E3192' }}>{item.value}</div>
                  <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Active', subtext: 'Platform Status', icon: CheckCircle, color: '#1F99ED' },
            { label: 'Growing', subtext: 'Community Expansion', icon: ArrowUp, color: '#52c41a' },
            { label: '24/7', subtext: 'Support Available', icon: Clock, color: '#faad14' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '32px', background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}30 100%)`, borderRadius: '16px', border: `2px solid ${item.color}` }}>
              <item.icon size={40} color={item.color} style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '24px', fontWeight: '700', color: item.color, marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>{item.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderModuleContent = (moduleKey) => {
    const moduleNames = { 'basic-membership': 'Basic Membership', 'premium-membership': 'Premium Membership', 'corporate-sponsor': 'Corporate Sponsors', 'join-us': 'Join Us (Workshops)', 'book-us': 'Book Us (Podcast)', 'get-involved': 'Get Involved (Mentorship)', 'event-creation': 'Event Management', 'event-registration': 'Event Registrations', 'register-now': 'Conference Registration', 'internship': 'Internship Applications', 'social-media': 'Social Media Support', 'book-shoot': 'Book Shoot', 'training': 'Training Enrollments', 'start-coding': 'Start Coding', 'certificates': 'Certificate Requests', 'volunteers': 'Volunteers', 'partnerships': 'Partnerships', 'mentors': 'Mentors', 'get-involved-actions': 'Get Involved Actions', 'blogs': 'Blogs', 'be-guest': 'Be a Guest', 'donations': 'Donations', 'contacters': 'Contact Messages', 'subscribers': 'Subscribers' };

    return (
      <div style={{ background: 'white', borderRadius: '16px', padding: '60px 20px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
        <AlertTriangle size={64} color="#faad14" style={{ marginBottom: '24px' }} />
        <h2 style={{ color: '#2E3192', fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>{moduleNames[moduleKey] || 'Module'}</h2>
        <h4 style={{ color: '#666', fontWeight: 'normal', fontSize: '18px', marginBottom: '16px' }}>This section is currently under development</h4>
        <p style={{ color: '#999', fontSize: '16px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>We're working on bringing you comprehensive management tools for {moduleNames[moduleKey]?.toLowerCase() || 'this module'}. Check back soon!</p>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <ProgressBar percent={75} color="#1F99ED" />
          <div style={{ marginTop: '8px', color: '#666', fontSize: '14px', fontWeight: '500' }}>Development Progress</div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2E3192 0%, #1F99ED 100%)' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '48px', textAlign: 'center', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <Shield size={64} color="#ff4d4f" style={{ marginBottom: '24px' }} />
          <h2 style={{ color: '#2E3192', fontSize: '28px', marginBottom: '16px', fontWeight: '700' }}>Access Denied</h2>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>You need administrator privileges to access this dashboard.</p>
          <button onClick={() => window.location.href = '/'} style={{ background: 'linear-gradient(135deg, #1F99ED, #2E3192)', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s ease', boxShadow: '0 4px 12px rgba(31, 153, 237, 0.3)' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>Go to Home</button>
        </div>
      </div>
    );
  }

  if (loading && selectedMenu === 'dashboard') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f7fa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', border: '4px solid #f3f3f3', borderTop: '4px solid #1F99ED', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <div style={{ color: '#666', fontSize: '16px', fontWeight: '500' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa' }}>
      <div style={{ width: collapsed ? '80px' : '260px', background: 'linear-gradient(180deg, #2E3192 0%, #1F99ED 100%)', transition: 'width 0.3s ease', boxShadow: '4px 0 12px rgba(0,0,0,0.1)', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 100 }}>
        <div style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '16px' }}>
          {!collapsed ? <h4 style={{ color: 'white', margin: 0, fontSize: '22px', fontWeight: '700', letterSpacing: '0.5px' }}>ONEFOCUS</h4> : <Crown size={28} color="white" />}
        </div>
        
        <div style={{ padding: '20px 0' }}>
          {menuItems.map((item) => (
            <div key={item.key}>
              <div onClick={() => !item.children && setSelectedMenu(item.key)} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', color: 'white', cursor: 'pointer', background: selectedMenu === item.key ? 'rgba(255,255,255,0.2)' : 'transparent', transition: 'all 0.2s ease', margin: '4px 12px', borderRadius: '10px' }} onMouseEnter={(e) => { if (selectedMenu !== item.key) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }} onMouseLeave={(e) => { if (selectedMenu !== item.key) e.currentTarget.style.background = 'transparent'; }}>
                <item.icon size={20} />
                {!collapsed && <span style={{ marginLeft: '12px', fontWeight: '500', fontSize: '14px' }}>{item.label}</span>}
              </div>
              {item.children && !collapsed && (
                <div style={{ paddingLeft: '12px' }}>
                  {item.children.map((child) => (
                    <div key={child.key} onClick={() => setSelectedMenu(child.key)} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', color: 'white', cursor: 'pointer', fontSize: '13px', background: selectedMenu === child.key ? 'rgba(255,255,255,0.15)' : 'transparent', margin: '2px 8px', borderRadius: '8px', transition: 'all 0.2s ease' }} onMouseEnter={(e) => { if (selectedMenu !== child.key) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }} onMouseLeave={(e) => { if (selectedMenu !== child.key) e.currentTarget.style.background = 'transparent'; }}>
                      <child.icon size={16} />
                      <span style={{ marginLeft: '12px', fontWeight: '400' }}>{child.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginLeft: collapsed ? '80px' : '260px', flex: 1, transition: 'margin-left 0.3s ease' }}>
        <div style={{ background: 'white', padding: '0 32px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              {collapsed ? <ChevronRight size={20} color="#1F99ED" /> : <ChevronLeft size={20} color="#1F99ED" />}
            </button>
            <h3 style={{ margin: 0, color: '#2E3192', fontSize: '20px', fontWeight: '600' }}>Admin Dashboard</h3>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#2E3192' }}>{adminInfo?.username}</div>
              <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>{adminInfo?.role?.toUpperCase()}</div>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #2E3192, #1F99ED)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px', boxShadow: '0 4px 12px rgba(31, 153, 237, 0.3)' }}>
              {adminInfo?.username?.charAt(0).toUpperCase()}
            </div>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', borderRadius: '8px', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fff2f0'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'} title="Logout">
              <LogOut size={20} color="#ff4d4f" />
            </button>
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          {error && (
            <div style={{ background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertTriangle size={20} color="#ff4d4f" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#ff4d4f', marginBottom: '4px' }}>Error</div>
                <div style={{ color: '#666', fontSize: '14px' }}>{error}</div>
              </div>
              <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', fontSize: '24px', color: '#999', lineHeight: 1 }}>×</button>
            </div>
          )}
          {selectedMenu === 'dashboard' ? renderDashboard() : renderModuleContent(selectedMenu)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;