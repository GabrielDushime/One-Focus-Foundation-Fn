import { useState } from 'react';
import { Typography, Button, Form, Modal, Input, Select, InputNumber, Checkbox, message, Spin, Divider, Space, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../config/api';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;


const AboutPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [joinUsForm] = Form.useForm();

  const handleJoinCommunity = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    joinUsForm.resetFields();
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
          style: {
            marginTop: '20px',
          },
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

  const JoinUsForm = () => (
    <Form
      form={joinUsForm}
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-4"
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

      <Space direction="vertical" size="small">
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
  );

  return (
    <div style={{ background: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* Section 1: Our Story */}
      <section 
        style={{ 
          padding: '20px 20px',
          maxWidth: '1400px',
          margin: '0 auto',
          marginTop: '60px',
          marginLeft:'0px'
        }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <Title level={1} style={{ 
              color: '#000', 
              fontSize: 'clamp(2.5rem, 2vw, 4rem)', 
              marginBottom: '20px', 
              fontWeight: 700,
              lineHeight: 1.2 
            }}>
              Our Story
            </Title>
            <Paragraph style={{ 
              color: '#2E3192', 
              fontSize: 'clamp(1rem, 1.2vw, 1.2rem)', 
              marginBottom: '30px', 
              lineHeight: '1.8',
              fontWeight: 500
            }}>
              Founded on September 2, 2024, ONEFOCUS began as a movement to support talented African 
              youth in Mentorship, Public Speaking, creative, academic, and entrepreneurial paths. From 
              local outreach in Rwandan schools, Africa continent and online global initiatives, we are 
              building a new generation of changemakers.
            </Paragraph>
            <div style={{
              background: '#E8F4FD',
              padding: '25px',
              borderRadius: '12px',
              borderLeft: '4px solid #1F99ED'
            }}>
              <Text style={{ 
                color: '#1F99ED', 
                fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)', 
                fontWeight: 600, 
                lineHeight: '1.8',
                display: 'block',
                fontStyle: 'italic'
              }}>
                "Every great achievement started with a simple idea and consistent action. 
                Your talent has the power to change the world—believe in it, work for it, and 
                never give up."
              </Text>
              <Text style={{
                color: '#2E3192',
                fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                fontWeight: 600,
                display: 'block',
                marginTop: '15px',
                textAlign: 'right'
              }}>
                Alain IBYIZA | CEO & FOUNDER
              </Text>
            </div>
          </div>
          
          <div style={{ 
            width: '65%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}>
            <img 
              src="/About/Alain.png"
              alt="CEO & Founder"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Mission & Vision */}
      <section style={{ 
        background: '#F8F9FA',
        padding: '20px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Mission - Left Side */}
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '16px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
              height: '100%'
            }}>
              <Title level={2} style={{ 
                color: '#000', 
                fontSize: 'clamp(2rem, 2vw, 2.5rem)', 
                marginBottom: '25px',
                fontWeight: 700
              }}>
                Mission
              </Title>
              <Paragraph style={{ 
                color: '#000', 
                fontSize: 'clamp(1rem, 1vw, 1.1rem)', 
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                Our mission is to identify, nurture, and amplify the potential of young Africans by providing 
                platforms, resources, and mentorship that inspire creativity, foster education, and 
                encourage impactful action. Through innovative programs like the "Voice of Tomorrow 
                Podcast", we aim to bridge the gap between dreams and opportunities for youth.
              </Paragraph>
              <Text style={{
                color: '#1F99ED',
                fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                fontWeight: 600,
                display: 'block',
                fontStyle: 'italic'
              }}>
                To discover, empower, and support young talents to reach their fullest potential.
              </Text>
            </div>

            {/* Vision - Right Side with Image */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                position: 'relative'
              }}>
                <img 
                  src="/About/onefocustv.png"
                  alt="Vision workspace"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '16px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
              }}>
                <Title level={2} style={{ 
                  color: '#000', 
                  fontSize: 'clamp(2rem, 2vw, 2.5rem)', 
                  marginBottom: '20px',
                  fontWeight: 700
                }}>
                  Vision
                </Title>
                <Paragraph style={{ 
                  color: '#000', 
                  fontSize: 'clamp(1rem, 1vw, 1.1rem)', 
                  lineHeight: '1.8',
                  marginBottom: '15px'
                }}>
                  To create a future where every young talent in Africa is empowered to achieve 
                  their dreams, contribute meaningfully to society, and become leaders of positive 
                  change.
                </Paragraph>
                <Text style={{
                  color: '#2E3192',
                  fontSize: 'clamp(1rem, 1vw, 1.15rem)',
                  fontWeight: 600,
                  display: 'block',
                  fontStyle: 'italic'
                }}>
                  A thriving Africa where every child's potential is recognized, nurtured, and 
                  celebrated.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Grow Your Vision With Us */}
      <section style={{ 
        padding: '20px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <Title level={2} style={{ 
          textAlign: 'center', 
          marginBottom: '10px', 
          color: '#000',
          fontSize: 'clamp(2rem, 1vw, 3rem)',
          fontWeight: 700
        }}>
          Grow Your Vision With us
        </Title>
        
        <Paragraph style={{ 
          textAlign: 'center', 
          fontSize: 'clamp(1rem, 1vw, 1.2rem)', 
          color: '#000', 
          marginBottom: '20px',
          maxWidth: '1200px',
          margin: '0 auto 40px',
          lineHeight: '1.8'
        }}>
          ONEFOCUS is a visionary organization focused on nurturing the talents and aspirations of young Rwandans and Africans. We provide a platform for 
          youth to explore and showcase their skills in areas like arts, music, sports, innovation, and entrepreneurship. Through initiatives such as the Voice 
          of Tomorrow Podcast, mentorship programs, and workshops, we inspire creativity, leadership, and personal growth.
        </Paragraph>

        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Button 
            type="primary" 
            size="large"
            onClick={handleJoinCommunity}
            style={{
              height: '40px',
              padding: '0 50px',
              fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
              background: '#1F99ED',
              border: 'none',
              fontWeight: 600,
              borderRadius: '8px'
            }}
          >
            JOIN Community
          </Button>
        </div>

        {/* Core Values Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          {/* Left Side - Image */}
          <div style={{ 
            width: '90%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}>
            <img 
              src="/stock.avif"
              alt="Core Values workspace"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Right Side - Core Values */}
          <div>
            <Title level={2} style={{ 
              color: '#000', 
              fontSize: 'clamp(2rem, 2vw, 3rem)', 
              marginBottom: '20px',
              fontWeight: 700
            }}>
              Core Values
            </Title>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ 
                  color: '#1F99ED', 
                  fontSize: '24px',
                  fontWeight: 700,
                  minWidth: '30px'
                }}>•</span>
                <Text style={{ 
                  color: '#000', 
                  fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                  lineHeight: '1.2'
                }}>
                  <span style={{ fontWeight: 600, color: '#1F99ED' }}>Integrity – </span>
                  We lead with honesty and transparency.
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <span style={{ 
                  color: '#1F99ED', 
                  fontSize: '24px',
                  fontWeight: 700,
                  minWidth: '30px'
                }}>•</span>
                <Text style={{ 
                  color: '#000', 
                  fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                  lineHeight: '1.6'
                }}>
                  <span style={{ fontWeight: 600, color: '#1F99ED' }}>Excellence – </span>
                  We strive to do all things with high standards.
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <span style={{ 
                  color: '#1F99ED', 
                  fontSize: '24px',
                  fontWeight: 700,
                  minWidth: '30px'
                }}>•</span>
                <Text style={{ 
                  color: '#000', 
                  fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                  lineHeight: '1.6'
                }}>
                  <span style={{ fontWeight: 600, color: '#1F99ED' }}>Collaboration – </span>
                  We grow together through shared goals.
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <span style={{ 
                  color: '#1F99ED', 
                  fontSize: '24px',
                  fontWeight: 700,
                  minWidth: '30px'
                }}>•</span>
                <Text style={{ 
                  color: '#000', 
                  fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                  lineHeight: '1.6'
                }}>
                  <span style={{ fontWeight: 600, color: '#1F99ED' }}>Innovation – </span>
                  We embrace new ideas and creative solutions.
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <span style={{ 
                  color: '#1F99ED', 
                  fontSize: '24px',
                  fontWeight: 700,
                  minWidth: '30px'
                }}>•</span>
                <Text style={{ 
                  color: '#000', 
                  fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                  lineHeight: '1.6'
                }}>
                  <span style={{ fontWeight: 600, color: '#1F99ED' }}>Empowerment – </span>
                  We believe in lifting others with opportunity.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Goals */}
      <section style={{ 
        background: '#F8F9FA',
        padding: '20px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '10px',
            alignItems: 'center'
          }}>
            {/* Left Side - Goals */}
            <div>
              <Title level={2} style={{ 
                color: '#1F99ED', 
                fontSize: 'clamp(2rem, 2vw, 3rem)', 
                marginBottom: '0px',
                fontWeight: 700
              }}>
                OUR GOALS
              </Title>
              
              <Title level={3} style={{ 
                color: '#000', 
                fontSize: 'clamp(1.3rem, 1.8vw, 1.8rem)', 
                marginBottom: '15px',
                fontWeight: 600
              }}>
                Empower Growth
              </Title>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '5px'
                  }}>
                    1. Empower Young Talent:
                  </Text>
                  <Text style={{ 
                    color: '#000', 
                    fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                    lineHeight: '1.7',
                    display: 'block'
                  }}>
                    Provide a stage for youth to showcase their abilities, whether in arts, public speaking, technology, or business.
                  </Text>
                </div>

                <div>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '5px'
                  }}>
                    2. Educate and Inspire:
                  </Text>
                  <Text style={{ 
                    color: '#000', 
                    fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                    lineHeight: '1.7',
                    display: 'block'
                  }}>
                    Host workshops, mentorships, and interactive discussions that foster personal and professional growth.
                  </Text>
                </div>

                <div>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '5px'
                  }}>
                    3. Promote Collaboration:
                  </Text>
                  <Text style={{ 
                    color: '#000', 
                    fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                    lineHeight: '1.7',
                    display: 'block'
                  }}>
                    Create opportunities for successful professionals to mentor young talents, bridging the gap between aspiration and achievement.
                  </Text>
                </div>

                <div>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '5px'
                  }}>
                    4. Encourage Innovation:
                  </Text>
                  <Text style={{ 
                    color: '#000', 
                    fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                    lineHeight: '1.7',
                    display: 'block'
                  }}>
                    Equip youth with the knowledge and tools to leverage technology and entrepreneurship for self-sustenance and community impact.
                  </Text>
                </div>

                <div>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '5px'
                  }}>
                    5. Build a Supportive Community:
                  </Text>
                  <Text style={{ 
                    color: '#000', 
                    fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                    lineHeight: '1.7',
                    display: 'block'
                  }}>
                    Foster an inclusive environment where youth feel valued and supported in their journeys.
                  </Text>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div style={{ 
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
            }}>
              <img 
                src="/employee.avif"
                alt="Our Goals"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Community Modal */}
      <Modal
        title={
          <div style={{ textAlign: 'center', paddingBottom: '16px' }}>
            <Title level={3} style={{ marginBottom: '8px', color: '#1F99ED' }}>
              Join Our Community
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Sign up for our skills development
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
            onClick={() => joinUsForm.submit()}
            style={{ background: '#1F99ED' }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        ]}
        styles={{
          content: {
            padding: '24px',
          },
          body: {
            maxHeight: '70vh',
            overflowY: 'auto',
          }
        }}
        destroyOnClose={true}
        centered
      >
        <Spin spinning={loading}>
          <JoinUsForm />
        </Spin>
      </Modal>
    </div>
  );
};

export default AboutPage;