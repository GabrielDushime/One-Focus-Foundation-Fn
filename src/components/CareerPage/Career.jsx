import { useState } from 'react';
import { Button, Typography, Row, Col,Form,Modal, Card, Input, 
  Select, 
  InputNumber, 
  Checkbox, 
  message,
  Spin,
  Divider,
  Space,
 } from 'antd';
 import Link from 'next/link'
 import { API_ENDPOINTS } from '../../config/api';
  import {  UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';


const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;



const ProfessionalStatus = {
  EMPLOYEE: 'employee',
  ENTREPRENEUR: 'entrepreneur',
  SENIOR_PROFESSIONAL: 'senior_professional',
  ACADEMIC: 'academic',
  OTHER: 'other'
}

const YearsOfExperience = {
  ONE_TO_THREE: '1_3',
  FOUR_TO_SIX: '4_6',
  SEVEN_TO_TEN: '7_10',
  TEN_PLUS: '10_plus'
}

const EducationLevel = {
  BACHELOR: 'bachelor',
  MASTERS: 'masters',
  PHD: 'phd',
  PROFESSIONAL_CERTIFICATION: 'professional_certification',
  OTHER: 'other'
}

const MentorshipArea = {
  CAREER_GUIDANCE: 'career_guidance',
  ENTREPRENEURSHIP: 'entrepreneurship',
  PUBLIC_SPEAKING: 'public_speaking',
  DIGITAL_SKILLS: 'digital_skills',
  LEADERSHIP: 'leadership',
  OTHER: 'other'
}

const MentorshipFormat = {
  ONE_ON_ONE_VIRTUAL: 'one_on_one_virtual',
  GROUP_SESSIONS: 'group_sessions',
  IN_PERSON_RWANDA: 'in_person_rwanda'
}

const Availability = {
  WEEKDAYS_EVENINGS: 'weekdays_evenings',
  WEEKENDS: 'weekends',
  FLEXIBLE: 'flexible'
}




const CareerPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
   const [modalVisible, setModalVisible] = useState({
    joinUs: false,
    mentor: false
    
  });
  const [loading, setLoading] = useState(false);
  const [joinUsForm] = Form.useForm();
  const [mentorForm] = Form.useForm()

  const talentCategories = [
    {
      id: 1,
      title: "Artistic Talents",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
      items: ["Drawing and Painting", "Graphic Design", "Photography", "Film", "Animation"]
    },
    {
      id: 2,
      title: "Academic & Intellectual Talents",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
      items: ["Public Speaking", "Creative Writing", "Problem-Solving", "Science and Innovation", "Coding and Technology"]
    },
    {
      id: 3,
      title: "Performing Arts",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
      items: ["Singing", "Dancing", "Acting", "Comedy", "DJing", "Instrumental Music"]
    },
    {
      id: 4,
      title: "Sports & Physical Skills",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
      items: ["Athletics", "Team Sports", "Martial Arts", "Fitness and Gymnastics"]
    },
    {
      id: 5,
      title: "Entrepreneurship & Business Skills",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      items: ["Business Ideas", "Leadership", "Content Creation", "Marketing"]
    },
    {
      id: 6,
      title: "Technology & Digital Skills",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      items: ["Video Production", "Gaming", "Social Media Influence", "UI/UX Design"]
    },
    {
      id: 7,
      title: "Cultural & Traditional Talents",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop",
      items: ["Traditional Dancing", "Storytelling", "Craftsmanship", "Languages"]
    },
    {
      id: 8,
      title: "Social & Community Impact",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
      items: ["Advocacy", "Environmental Conservation", "Charity Work"]
    },
    {
      id: 9,
      title: "Culinary Arts",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
      items: ["Cooking and Baking", "Food Presentation"]
    },
    {
      id: 10,
      title: "Miscellaneous Skills",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
      items: ["Magic Tricks", "Travel Blogging", "Pet Training", "Fashion Design"]
    }
  ];

  const handleButtonClick = (modalKey) => {
    setModalVisible(prev => ({ ...prev, [modalKey]: true }));
  };

  const handleModalClose = (modalKey) => {
    setModalVisible(prev => ({ ...prev, [modalKey]: false }));
    
    switch (modalKey) {
      case 'joinUs':
        joinUsForm.resetFields();
        break;
      case 'mentor':
        mentorForm.resetFields();
        break;
      default:
        break;
    }
  };
  
  const handleSubmit = async (modalKey, values) => {
    setLoading(true);
    
    try {
      let endpoint, successMessage;
      
      switch (modalKey) {
        case 'joinUs':
          endpoint = API_ENDPOINTS.JOIN_US;
          successMessage = "Thank you for registering! Our team will contact you shortly with session details. See you at the workshop!";
          break;
        default:
          return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success({
          content: successMessage,
          duration: 5,
          style: {
            marginTop: '20px',
          },
        });
        handleModalClose(modalKey);
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

  const handleSubmitMentor = async (modalKey, values) => {
      setLoading(true)
      
      try {
        let endpoint, successMessage
        
        if (modalKey === 'mentor') {
          endpoint = API_ENDPOINTS.MENTORS
          successMessage = "Thank you for joining as a mentor! The ONEFOCUS team will contact you soon to match you with mentees who align with your expertise. Together, let's empower Africa's next generation of leaders!"
        } 
  
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
  
        if (response.ok) {
          message.success({
            content: successMessage,
            duration: 6,
            style: {
              marginTop: '20px',
            },
          })
          handleModalClose(modalKey)
        } else {
          const errorData = await response.json()
          message.error(errorData.message || 'Something went wrong. Please try again.')
        }
      } catch (error) {
        message.error('Network error. Please check your connection and try again.')
      } finally {
        setLoading(false)
      }
    }

 
  const JoinUsForm = () => (
    <Form
      form={joinUsForm}
      layout="vertical"
      onFinish={(values) => handleSubmit('joinUs', values)}
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

  const MentorForm = () => (
      <Form
        form={mentorForm}
        layout="vertical"
        onFinish={(values) => handleSubmitMentor('mentor', values)}
        className="space-y-4"
      >
        {/* Personal Information */}
        <Divider orientation="left">Personal Information</Divider>
        
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            { required: true, message: 'Please enter your full name' },
            { min: 2, message: 'Name must be at least 2 characters' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="John Doe"
            size="large"
          />
        </Form.Item>
  
        <Row gutter={16}>
          <Col xs={24} md={12}>
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
                placeholder="john.doe@example.com"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
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
          </Col>
        </Row>
  
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: 'Please enter your age' },
                { type: 'number', min: 18, max: 100, message: 'Age must be between 18 and 100' }
              ]}
            >
              <InputNumber 
                placeholder="28"
                size="large"
                className="w-full"
                min={18}
                max={100}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="location"
              label="Location (City, Country)"
              rules={[{ required: true, message: 'Please enter your location' }]}
            >
              <Input 
                prefix={<EnvironmentOutlined />} 
                placeholder="Kigali, Rwanda"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
  
        {/* Professional Background */}
        <Divider orientation="left">Professional Background</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="professionalStatus"
              label="Professional Status"
              rules={[{ required: true, message: 'Please select your professional status' }]}
            >
              <Select placeholder="Select professional status" size="large">
                <Option value={ProfessionalStatus.EMPLOYEE}>Employee</Option>
                <Option value={ProfessionalStatus.ENTREPRENEUR}>Entrepreneur</Option>
                <Option value={ProfessionalStatus.SENIOR_PROFESSIONAL}>Senior Professional</Option>
                <Option value={ProfessionalStatus.ACADEMIC}>Academic</Option>
                <Option value={ProfessionalStatus.OTHER}>Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="fieldOfExpertise"
              label="Field of Expertise"
              rules={[{ required: true, message: 'Please enter your field of expertise' }]}
            >
              <Input 
                placeholder="Software Engineering"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
  
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="yearsOfExperience"
              label="Years of Experience"
              rules={[{ required: true, message: 'Please select years of experience' }]}
            >
              <Select placeholder="Select years of experience" size="large">
                <Option value={YearsOfExperience.ONE_TO_THREE}>1-3 years</Option>
                <Option value={YearsOfExperience.FOUR_TO_SIX}>4-6 years</Option>
                <Option value={YearsOfExperience.SEVEN_TO_TEN}>7-10 years</Option>
                <Option value={YearsOfExperience.TEN_PLUS}>10+ years</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="educationLevel"
              label="Education Level"
              rules={[{ required: true, message: 'Please select your education level' }]}
            >
              <Select placeholder="Select education level" size="large">
                <Option value={EducationLevel.BACHELOR}>Bachelor&apos;s Degree</Option>
                <Option value={EducationLevel.MASTERS}>Master&apos;s Degree</Option>
                <Option value={EducationLevel.PHD}>PhD</Option>
                <Option value={EducationLevel.PROFESSIONAL_CERTIFICATION}>Professional Certification</Option>
                <Option value={EducationLevel.OTHER}>Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
  
        {/* Mentorship Details */}
        <Divider orientation="left">Mentorship Contribution</Divider>
        
        <Form.Item
          name="motivationMessage"
          label="Why do you want to become a mentor?"
          rules={[
            { required: true, message: 'Please share your motivation' },
            { max: 500, message: 'Please keep it under 500 characters' }
          ]}
        >
          <TextArea 
            rows={4} 
            placeholder="I want to give back to the community and help young professionals develop their careers..."
            showCount
            maxLength={500}
          />
        </Form.Item>
  
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="mentorshipArea"
              label="Primary Mentorship Area"
              rules={[{ required: true, message: 'Please select your mentorship area' }]}
            >
              <Select placeholder="Select mentorship area" size="large">
                <Option value={MentorshipArea.CAREER_GUIDANCE}>Career Guidance</Option>
                <Option value={MentorshipArea.ENTREPRENEURSHIP}>Entrepreneurship</Option>
                <Option value={MentorshipArea.PUBLIC_SPEAKING}>Public Speaking</Option>
                <Option value={MentorshipArea.DIGITAL_SKILLS}>Digital Skills</Option>
                <Option value={MentorshipArea.LEADERSHIP}>Leadership</Option>
                <Option value={MentorshipArea.OTHER}>Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="preferredFormats"
              label="Preferred Mentorship Formats"
              rules={[{ required: true, message: 'Please select at least one format' }]}
            >
              <Select 
                mode="multiple"
                placeholder="Select mentorship formats"
                size="large"
              >
                <Option value={MentorshipFormat.ONE_ON_ONE_VIRTUAL}>One-on-One Virtual</Option>
                <Option value={MentorshipFormat.GROUP_SESSIONS}>Group Sessions</Option>
                <Option value={MentorshipFormat.IN_PERSON_RWANDA}>In-Person (Rwanda)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
  
        <Form.Item
          name="availability"
          label="Availability"
          rules={[{ required: true, message: 'Please select your availability' }]}
        >
          <Select 
            mode="multiple"
            placeholder="Select your availability"
            size="large"
          >
            <Option value={Availability.WEEKDAYS_EVENINGS}>Weekdays Evenings</Option>
            <Option value={Availability.WEEKENDS}>Weekends</Option>
            <Option value={Availability.FLEXIBLE}>Flexible</Option>
          </Select>
        </Form.Item>
  
        {/* Agreements */}
        <Divider orientation="left">Agreement</Divider>
        
        <Space direction="vertical" size="small">
          <Form.Item
            name="agreeToMentorResponsibly"
            valuePropName="checked"
            rules={[{ required: true, message: 'Please agree to mentor responsibly' }]}
          >
            <Checkbox>I agree to dedicate time and effort to mentor youth respectfully and responsibly</Checkbox>
          </Form.Item>
  
          <Form.Item
            name="consentToGuidelines"
            valuePropName="checked"
            rules={[{ required: true, message: 'Please consent to guidelines' }]}
          >
            <Checkbox>I consent to ONEFOCUS Foundation guidelines for the mentorship program</Checkbox>
          </Form.Item>
        </Space>
      </Form>
    )
  
  const getModalConfig = (modalKey) => {
    const configs = {
      joinUs: {
        title: "Join Our Community",
        subtitle: "Sign up for our skills development",
        form: <JoinUsForm />,
        width: 600
      },
      mentor: {
        title: "Mentor Application",
        subtitle: "Share your wisdom and guide the next generation",
        form: <MentorForm />,
        width: 800
      }
    };
    return configs[modalKey];
  };

  return (
    <div style={{ background: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{
        background: '#ffffff',
        padding: '30px 20px',
        textAlign: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <Title level={1} style={{
          color: '#1F99ED',
          fontSize: 'clamp(1.5rem, 1vw, 1rem)',
          fontWeight: 700,
          marginBottom: '10px',
          lineHeight: 1.2,
          marginTop:'45px'
        }}>
          Start your journey with us at ONEFOCUS today!
        </Title>
        
        <Paragraph style={{
          fontSize: 'clamp(0.7rem, 0.5vw, 1.2rem)',
          color: '#000',
          marginBottom: '30px',
          maxWidth: '900px',
          margin: '0 auto 15px'
        }}>
          Join our community of aspiring talents and mentors to nurture your creative potential and achieve your dreams.
        </Paragraph>
        <Link href="/about">
        <Button
          type="primary"
          size="large"
          style={{
            height: '40px',
            padding: '0 40px',
            fontSize: 'clamp(1rem, 1vw, 1.1rem)',
            background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
            border: 'none',
            fontWeight: 600,
            borderRadius: '8px'
          }}
          
        >
          Explore Opportunities
        </Button>
        </Link>
      </section>


      {/* Discover Your Talents Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '0px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={1} style={{
            color: '#1F99ED',
            fontSize: 'clamp(1rem, 2vw, 2rem)',
            fontWeight: 700,
            marginBottom: '0px'
          }}>
            Discover Your Talents
          </Title>

          <Paragraph style={{
            fontSize: 'clamp(1rem, 1vw, 1.3rem)',
            color: '#000',
            fontWeight: 500,
            maxWidth: '1000px',
            margin: '15px auto 50px',
            lineHeight: 1.6
          }}>
            Explore opportunities in design, education, and leadership—let's create a brighter future together.
          </Paragraph>

          {/* Talent Categories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '10px',
            marginTop: '-25px'
          }}>
            {talentCategories.map((category) => (
              <Card
                key={category.id}
                hoverable
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #e8e8e8',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === category.id ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredCard === category.id 
                    ? '0 12px 24px rgba(31, 153, 237, 0.2)' 
                    : '0 2px 8px rgba(0,0,0,0.1)'
                }}
                cover={
                  <img
                    alt={category.title}
                    src={category.image}
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
                  fontSize: 'clamp(1rem, 1vw, 1.2rem)',
                  marginBottom: '15px',
                  fontWeight: 600,
                  marginTop:'10px'
                }}>
                  {category.title}
                </Title>
                <ul style={{
                 display: 'inline-block',          
                 textAlign: 'left',                
                 paddingLeft: '1.2em',             
                 margin: 0,
                 listStyleType: 'disc',
                 listStylePosition: 'outside',     
                }}>
                {category.items.map((item, index) => (
               <li key={index} style={{
               color: '#333',
               fontSize: 'clamp(0.9rem, 1vw, 1rem)',
               marginBottom: '8px',
               lineHeight: 1.2,
              }}>
              {item}
              </li>
              ))}
              </ul>

              </Card>
            ))}
          </div>
        </div>
      </section>

      
      {Object.keys(modalVisible).map((modalKey) => {
        const config = getModalConfig(modalKey);
        return (
          <Modal
            key={modalKey}
            title={
              <div className="text-center pb-4">
                <Title level={3} className="!mb-2 text-blue-600">
                  {config.title}
                </Title>
                <Text type="secondary" className="text-sm">
                  {config.subtitle}
                </Text>
              </div>
            }
            open={modalVisible[modalKey]}
            onCancel={() => handleModalClose(modalKey)}
            width={config.width}
            footer={[
              <Button 
                key="cancel" 
                onClick={() => handleModalClose(modalKey)}
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
                onClick={() => {
                  if (modalKey === 'joinUs') {
                    joinUsForm.submit();
                  } else if (modalKey === 'mentor') {
                    mentorForm.submit();
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            ]}
            className="onefocus-modal"
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
              {config.form}
            </Spin>
          </Modal>
        );
      })}

      {/* Encouraging Participation Section */}
      <section style={{
        background: '#ffffff',
        padding: '20px 20px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          alignItems: 'center',
          
        }}>
          {/* Left Content */}
          <div>
            <Title level={2} style={{
              color: '#1F99ED',
              fontSize: 'clamp(1.5rem, 1vw, 2.5rem)',
              fontWeight: 700,
              marginBottom: '20px',
              lineHeight: 1.3,
              marginTop:'-100px',
              textAlign:'center'
            }}>
              Encouraging Participation
            </Title>

            <Paragraph style={{
              fontSize: 'clamp(1rem, 1vw, 1.1rem)',
              color: '#000',
              marginBottom: '30px',
              lineHeight: 1.7,
              fontWeight: 500,
              textAlign:'center'
            }}>
              Each talent represents a unique voice and perspective. By sharing their skills, participants not only inspire others but also open doors to mentorship, collaboration, and recognition.
            </Paragraph>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              alignItems:'center'
            }}>
              <Button
                onClick={() => handleButtonClick('joinUs')}
                size="large"
                style={{
                  height: '30px',
                  padding: '0 30px',
                  fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                  borderColor: '#2E3192',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  borderWidth: '2px',
                  background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
                  
                }}
              >
                Join Our Community
              </Button>

              <Button
                onClick={() => handleButtonClick('mentor')}
                size="large"
                style={{
                  height: '30px',
                  padding: '0 30px',
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                  borderColor: '#2E3192',
                  color: 'white',
                  fontWeight: 500,
                  borderRadius: '8px',
                  borderWidth: '2px',
                  background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
                }}
              >
                Become a Mentor
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}>
            <img
              src="/Mentorship.jpg"
              alt="Encouraging Participation"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default CareerPage;