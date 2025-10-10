import { useState, useEffect } from 'react';
import { Button, Typography, Card, Modal, Form, Input, Select, InputNumber, Checkbox, message, Spin, Space, Divider, Row, Col } from 'antd';
import { TagOutlined, EnvironmentOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../config/api';
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const WorkshopPage = () => {
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [form] = Form.useForm();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
   
    handleResize();
    
   
    window.addEventListener('resize', handleResize);
    
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const keyActivities = [
    {
      id: 1,
      title: "Talent Discovery & Nurturing",
      description: "Identify personal strengths, passion areas, and career goals.",
      image: "/workshop/Talent.jpg"
    },
    {
      id: 2,
      title: "Career Guidance & Skills Training",
      description: "Learn essential century skills like leadership, communication, and digital literacy.",
      image: "/Leadership.jpg"
    },
    {
      id: 3,
      title: "Hands-On Practice",
      description: "Participate in real-world simulations and team projects.",
      image: "/workshop/Hands.jpg"
    },
    {
      id: 4,
      title: "Performance & Showcases",
      description: "Build confidence by presenting your work in mini-events and talent showcases.",
      image: "/workshop/Performance.jpg"
    },
    {
      id: 5,
      title: "Mentorship Sessions",
      description: "Engage with experienced professionals for guidance and career support.",
      image: "/workshop/Mentorship.jpg"
    },
    {
      id: 6,
      title: "#INZIRA Career Exposure Tours",
      description: "Visit companies, institutions, and creative industries to explore possible career paths.",
      image: "/workshop/INZIRA.jpg"
    },
    {
      id: 7,
      title: "Voice of Tomorrow Podcast",
      description: "Share your story and insights with a global audience via Spotify & YouTube.",
      image: "/11.png"
    },
    {
      id: 8,
      title: "Competitions & Challenges",
      description: "Participate in skill-based contests that promote innovation and self-esteem.",
      image: "/workshop/Competitions.jpg"
    }
  ];

 
  const timelineData = [
    {
      week: "Week 1",
      title: "Welcome & Orientation – Intro to ONEFOCUS",
      position: "left"
    },
    {
      week: "Week 2",
      title: "Identifying Your Passion & Purpose",
      position: "right"
    },
    {
      week: "Week 3",
      title: "Guest Speaker: Turning Dreams into Goals",
      position: "left"
    },
    {
      week: "Week 4",
      title: "Feedback & Collaboration – Share Your Dream",
      position: "right"
    }
  ];

  const benefits = [
    {
      id: 1,
      title: "Build Practical Skills",
      description: "Develop skills that align with your passion and future career goals.",
      image: "https://images.unsplash.com/photo-1554774853-719586f82d77?w=400&h=300&fit=crop",
      color: "#4A5568"
    },
    {
      id: 2,
      title: "Real-World Exposure",
      description: "Gain exposure through tours and connections with industry professionals.",
      image: "/Workshop/Real.jpg",
      color: "#2D3748"
    },
    {
      id: 3,
      title: "Connect with Peers",
      description: "Build relationships with like-minded young dreamers across Rwanda.",
      image: "/Workshop/Connect.png",
      color: "#1A202C"
    },
    {
      id: 4,
      title: "Be Featured",
      description: "Share your unique perspective on our Voice of Tomorrow Podcast.",
      image: "/Media/Befeatured.jpg",
      color: "#2C5282"
    }
  ];

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.JOIN_US, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success({
          content: "Thank you for registering! Our team will contact you shortly with session details. See you at the workshop!",
          duration: 5,
        });
        handleModalClose();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      message.error('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1F99ED 0%, #2E3192 100%)',
        padding: '50px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={1} style={{
            color: '#ffffff',
            fontSize: 'clamp(2rem, 3vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '10px',
            lineHeight: 1.2,
            marginTop:'50px'
          }}>
            Empowering the Next Generation
          </Title>

          <Paragraph style={{
            color: '#ffffff',
            fontSize: 'clamp(1.1rem, 1vw, 1.4rem)',
            marginBottom: '35px',
            fontWeight: 500
          }}>
            Through Skills, Mentorship, and Expression
          </Paragraph>

          <Button
            type="default"
            size="large"
            onClick={handleModalOpen}
            style={{
              height: '40px',
              padding: '0 20px',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              background: '#ffffff',
              color: '#1F99ED',
              border: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
          >
            Register for Workshops
          </Button>

          {/* Info Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginTop: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '15px 30px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <TagOutlined style={{ fontSize: '20px', color: '#ffffff' }} />
              <Text style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600 }}>
                Every Week
              </Text>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '15px 30px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <EnvironmentOutlined style={{ fontSize: '20px', color: '#ffffff' }} />
              <Text style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600 }}>
                Kigali, Rwanda
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Bigger Vision Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '20px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={2} style={{
            color: '#1F99ED',
            fontSize: 'clamp(2rem, 2vw, 2rem)',
            fontWeight: 700,
            marginBottom: '15px'
          }}>
            Bigger Vision
          </Title>

          <Paragraph style={{
            fontSize: 'clamp(0.5rem, 1.2vw, 1.15rem)',
            color: '#000',
            lineHeight: 1.8,
            maxWidth: '1000px',
            margin: '0 auto',
            fontWeight: 405
          }}>
            Our workshops are foundational to our long-term goal: creating a pipeline for youth-led innovation, expression, 
            and employment. As we expand into Africa-wide outreach and launch ONEFOCUS FOU TV, these programs will 
            directly lead to professional opportunities for youth across various industries.
          </Paragraph>
        </div>
      </section>

      {/* ONEFOCUS FOU TV & Voice of Tomorrow Banner */}
      <section style={{
        width: '100%',
        overflow: 'hidden'
      }}>
        <img
          src="/TV-01.png"
          alt="ONEFOCUS FOU TV and Voice of Tomorrow Podcast Banner"
          style={{
            width: '100%',
            height: '600px',
            display: 'block',
            objectFit: 'cover',
            padding:'0px 20px'
          }}
        />
      </section>
      {/* About the Workshops */}
      <section style={{
        background: '#ffffff',
        padding: '20px 20px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <Title level={2} style={{
              fontSize: 'clamp(1.8rem, 2vw, 2.5rem)',
              marginBottom: '15px',
              lineHeight: 1.3,
              
            }}>
              <span style={{ color: '#1F99ED',fontWeight:'bold' }}>About the </span>
              <span style={{ color: '#2E3192',fontWeight:'bold' }}>Workshops</span>
            </Title>

            <Paragraph style={{
              fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
              color: '#000',
              marginBottom: '20px',
              lineHeight: 1.8
            }}>
              Our workshops are the core of <strong style={{ color: '#1F99ED' }}>ONEFOCUS</strong>'s mission to empower 
              youth across Rwanda and Africa. These sessions provide a safe and engaging space where young people can discover their talents, 
              gain practical skills, and connect with mentors.
            </Paragraph>

            <Paragraph style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              color: '#000',
              lineHeight: 1.8
            }}>
              Whether you're passionate about public speaking, entrepreneurship, digital content creation, or the arts—our 
              workshops are tailored to help you unlock your full potential.
            </Paragraph>
          </div>

          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}>
            <img
              src="stock.avif"
              alt="Workshop Space"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* Key Activities Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '10px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={2} style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: 'clamp(1.8rem, 2vw, 2.5rem)'
          }}>
            <span style={{ color: '#1F99ED',fontWeight:'bold' }}>Key </span>
            <span style={{ color: '#2E3192',fontWeight:'bold', textDecoration: 'underline', textDecorationColor: '#1F99ED' }}>Activities</span>
          </Title>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {keyActivities.map((activity) => (
              <Card
                key={activity.id}
                hoverable
                onMouseEnter={() => setHoveredActivity(activity.id)}
                onMouseLeave={() => setHoveredActivity(null)}
                style={{
                  borderRadius: '0px',
                  overflow: 'hidden',
                  border: 'px solid #1F99ED',
                  transition: 'all 0.3s ease',
                  transform: hoveredActivity === activity.id ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredActivity === activity.id 
                    ? '0 12px 24px rgba(31, 153, 237, 0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.1)'
                }}
                cover={
                  <img
                    alt={activity.title}
                    src={activity.image}
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                }
              >
                <Title level={4} style={{
                  color: '#1F99ED',
                  fontSize: 'clamp(1rem, 1vw, 1.15rem)',
                  marginBottom: '0px',
                  fontWeight: 500,
                  minHeight: '50px',
                  textAlign:'center',
                  marginTop:'5px'
                }}>
                  {activity.title}
                </Title>
                <Paragraph style={{
                  color: '#333',
                  fontSize: 'clamp(0.9rem, 1vw, 0.95rem)',
                  lineHeight: '1.6',
                  marginTop:'-20px',
                  textAlign:'center'
                }}>
                  {activity.description}
                </Paragraph>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Structure Timeline */}
      <section style={{
        background: '#ffffff',
        padding: '20px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={2} style={{
            textAlign: 'center',
            marginBottom: '15px',
            fontSize: 'clamp(1.8rem, 1vw, 2.5rem)'
          }}>
            <span style={{ color: '#1F99ED',fontWeight:'bold', textDecoration: 'underline', textDecorationColor: '#2E3192' }}>Workshop</span>
            <span style={{ color: '#2E3192',fontWeight:'bold' }}> Structure by Monthly</span>
          </Title>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: '#2E3192',
              color: '#ffffff',
              padding: '6px 25px',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '1rem'
            }}>
              Monthly Schedule
            </div>
            <Title level={3} style={{
              color: '#1F99ED',
              margin: 0,
              fontSize: 'clamp(1.1rem, 2vw, 1.8rem)',
              fontWeight: 600
            }}>
              Discovering Purpose & Vision
            </Title>
          </div>

          <div style={{ position: 'relative', padding: '40px 0' }}>
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              background: '#1F99ED',
              transform: 'translateX(-50%)',
              display: isMobile ? 'none' : 'block'
            }} />

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0px'
            }}>
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 40px 1fr',
                    gap: '0px',
                    alignItems: 'center'
                  }}
                >
                  <div style={{
                    textAlign: isMobile ? 'left' : item.position === 'left' ? 'right' : 'left',
                    order: isMobile ? 1 : item.position === 'left' ? 0 : 2
                  }}>
                    {item.position === 'left' && (
                     <Card
                        style={{
                          background: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          maxWidth: '450px',
                          margin: isMobile ? '0 auto' : item.position === 'left' ? '0 0 0 auto' : '0 auto 0 0'
                        }}
                      >
                        <Title level={4} style={{
                          color: '#1F99ED',
                          margin: '0 0 15px 0',
                          fontSize: 'clamp(1.1rem, 1vw, 1.8rem)',
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                          {item.week}
                        </Title>
                        <Text style={{
                          color: '#000',
                          fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                          lineHeight: 1.6,
                          display: 'block',
                          textAlign: 'center'
                        }}>
                          {item.title}
                        </Text>
                      </Card>
                    )}
                  </div>

                  <div style={{
                    display: isMobile ? 'none' : 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    order: 1
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#1F99ED',
                      border: '5px solid #ffffff',
                      boxShadow: '0 0 0 4px #1F99ED'
                    }} />
                  </div>

                  <div style={{
                    textAlign: isMobile ? 'left' : item.position === 'right' ? 'left' : 'right',
                    order: isMobile ? 1 : item.position === 'right' ? 2 : 0
                  }}>
                    {item.position === 'right' && (
                     <Card
                        style={{
                          background: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '5px 10px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          maxWidth: '400px',
                          margin: isMobile ? '0 auto' : item.position === 'left' ? '0 0 0 auto' : '0 auto 0 0'
                        }}
                      >
                        <Title level={4} style={{
                          color: '#1F99ED',
                          margin: '0 0 15px 0',
                          fontSize: 'clamp(1.1rem, 1vw, 1.8rem)',
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                          {item.week}
                        </Title>
                        <Text style={{
                          color: '#000',
                          fontSize: 'clamp(1rem, 1vw, 1.1rem)',
                          lineHeight: 1.6,
                          display: 'block',
                          textAlign: 'center'
                        }}>
                          {item.title}
                        </Text>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '20px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            background: '#ffffff',
            border: '3px solid #1F99ED',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '40px',
            maxWidth: '200px',
            margin: '0 auto 20px'
          }}>
            <Title level={2} style={{
              color: '#1F99ED',
              fontSize: 'clamp(1.5rem, 2vw, 2.5rem)',
              margin: 0,
              fontWeight: 700
            }}>
              Why Join?
            </Title>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px'
          }}>
            {benefits.map((benefit) => (
              <Card
                key={benefit.id}
                hoverable
                onMouseEnter={() => setHoveredBenefit(benefit.id)}
                onMouseLeave={() => setHoveredBenefit(null)}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  transform: hoveredBenefit === benefit.id ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredBenefit === benefit.id 
                    ? '0 12px 24px rgba(0,0,0,0.2)' 
                    : '0 2px 8px rgba(0,0,0,0.1)'
                }}
                cover={
                  <img
                    alt={benefit.title}
                    src={benefit.image}
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                }
              >
                <Title level={4} style={{
                  color: '#2E3192',
                  fontSize: 'clamp(1.1rem, 1vw, 1.3rem)',
                  marginBottom: '12px',
                  fontWeight: 500,
                  textAlign:'center',
                  marginTop:'8px'
    
                }}>
                  {benefit.title}
                </Title>
                <Paragraph style={{
                  color: '#1F99ED',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                  lineHeight: '1.6',
                  textAlign:'center'
                }}>
                  {benefit.description}
                </Paragraph>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: '#ffffff',
        padding: '10px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Title level={2} style={{
            color: '#1F99ED',
            fontSize: 'clamp(2rem, 2vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '20px'
          }}>
            Ready to Unlock Your Potential?
          </Title>

          <Paragraph style={{
            fontSize: 'clamp(1rem, 1vw, 1.15rem)',
            color: '#2E3192',
            marginBottom: '15px',
            fontWeight: 400
          }}>
            Join our workshops and be part of a vibrant community dedicated to youth empowerment across Rwanda and Africa.
          </Paragraph>

          <Button
            type="primary"
            size="large"
            onClick={handleModalOpen}
            style={{
              height: '40px',
              padding: '0 30px',
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
              border: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '15px',
            }}
          >
            Register Now
          </Button>
        </div>
      </section>

      {/* Registration Modal */}
      <Modal
        title={
          <div style={{ textAlign: 'center', paddingBottom: '16px' }}>
            <Title level={3} style={{ marginBottom: '8px', color: '#1F99ED' }}>
              Join Our Workshop
            </Title>
            <Text type="secondary">
              Sign up for our skills development workshops
            </Text>
          </div>
        }
        open={modalVisible}
        onCancel={handleModalClose}
        width={600}
        footer={[
          <Button 
            key="cancel" 
            onClick={handleModalClose}
            size="large"
            disabled={loading}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => form.submit()}
            style={{
              background: '#1F99ED',
              borderColor: '#1F99ED'
            }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        ]}
        styles={{
          body: {
            maxHeight: '70vh',
            overflowY: 'auto',
            padding: '24px'
          }
        }}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter your full name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Enter your email address"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number (WhatsApp preferred)"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="+250788123456"
                size="large"
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="age"
                  label="Age"
                  rules={[{ required: false }]}
                >
                  <InputNumber 
                    min={15} 
                    max={35} 
                    placeholder="Your age"
                    size="large"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                >
                  <Select placeholder="Select gender" size="large">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="prefer_not_to_say">Prefer not to say</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="educationLevel"
              label="Education Level"
              rules={[{ required: true, message: 'Please select your education level' }]}
            >
              <Select placeholder="Select education level" size="large">
                <Option value="primary">Primary</Option>
                <Option value="secondary">Secondary</Option>
                <Option value="university">University</Option>
                <Option value="employee">Employee</Option>
                <Option value="self_employed">Self Employed</Option>
                <Option value="masters">Masters</Option>
                <Option value="phd">PhD</Option>
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: 'Please enter your country' }]}
                >
                  <Input 
                    prefix={<EnvironmentOutlined />} 
                    placeholder="Rwanda"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="cityDistrict"
                  label="City/District"
                  rules={[{ required: true, message: 'Please enter your city/district' }]}
                >
                  <Input 
                    placeholder="Kigali"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="sessionAvailability"
              label="Session Preference"
              rules={[{ required: true, message: 'Please select your session preference' }]}
            >
              <Select placeholder="Select session type" size="large">
                <Option value="online">Online Sessions</Option>
                <Option value="physical">Physical Sessions</Option>
                <Option value="both">Both Online & Physical</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="motivation"
              label="Why do you want to join? (Max 500 characters)"
              rules={[
                { required: true, message: 'Please share your motivation' },
                { max: 500, message: 'Please keep it under 500 characters' }
              ]}
            >
              <TextArea 
                rows={4} 
                placeholder="Share your motivation for joining our workshop..."
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Divider />

            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Form.Item
                name="infoAccuracyConsent"
                valuePropName="checked"
                rules={[{ required: true, message: 'Please confirm information accuracy' }]}
              >
                <Checkbox>I confirm that the information provided is accurate</Checkbox>
              </Form.Item>

              <Form.Item
                name="communicationConsent"
                valuePropName="checked"
                rules={[{ required: true, message: 'Please agree to receive updates' }]}
              >
                <Checkbox>I agree to receive communication updates from ONEFOCUS</Checkbox>
              </Form.Item>

              <Form.Item
                name="workshopUnderstandingConsent"
                valuePropName="checked"
                rules={[{ required: true, message: 'Please confirm workshop understanding' }]}
              >
                <Checkbox>I understand that workshop is open to all youth</Checkbox>
              </Form.Item>
            </Space>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default WorkshopPage;