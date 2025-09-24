import React, { useState } from 'react';
import { 
  Typography, 
  Button, 
  Card, 
  Row, 
  Col, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Checkbox, 
  message,
  Spin,
  Divider,
  Space,
  Table,
  Tag
} from 'antd';
import { 
  ArrowRightOutlined, 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import Image from 'next/image';
import { API_ENDPOINTS } from '../../config/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Enums from your backend
const AgeGroup = {
  UNDER_18: 'under_18',
  EIGHTEEN_TO_25: '18_25',
  TWENTY_SIX_TO_35: '26_35',
  THIRTY_SIX_TO_45: '36_45',
  FORTY_SIX_TO_55: '46_55',
  OVER_55: 'over_55'
};

const EngagementDetails = {
  YOUTH_PARTICIPANT: 'youth_participant',
  GUEST_SPEAKER: 'guest_speaker',
  PARTNER_ORGANIZATION_REPRESENTATIVE: 'partner_organization_representative',
  VOLUNTEER: 'volunteer'
};

const ConferenceType = {
  VIRTUAL: 'virtual',
  HYBRID: 'hybrid',
  IN_PERSON: 'in_person'
};

const PartnershipType = {
  EVENT_CO_HOSTING: 'Event Co-Hosting',
  YOUTH_MENTORSHIP: 'Youth Mentorship Collaboration',
  WORKSHOP_SPONSORSHIP: 'Workshop/Training Sponsorship',
  MEDIA_PARTNERSHIP: 'Media & Podcast Partnership',
  SCHOOL_OUTREACH: 'School Outreach Collaboration',
  TECHNICAL_SUPPORT: 'Technical/Creative Support',
  FINANCIAL_SPONSORSHIP: 'Financial Sponsorship',
  RESOURCE_CONTRIBUTION: 'Resource or Equipment Contribution',
  INTERNSHIP_PROGRAMS: 'Internship or Career Exposure Programs',
};

const PartnershipTimeline = {
  ONGOING: 'Ongoing',
  THREE_MONTHS: '3 Months',
  SIX_MONTHS: '6 Months',
  ANNUAL: 'Annual',
};

const AREAS_OF_INTEREST = [
  'Leadership',
  'Digital Skills',
  'Business & Entrepreneurship',
  'Art & Creativity',
  'Storytelling',
  'Media & Podcasting',
  'SDGs & Community Impact',
  'Other'
];

const EventsSection = ({ onRegister, onPartner, onViewSchedule }) => {
  const [modalVisible, setModalVisible] = useState({
    register: false,
    partner: false,
    schedule: false
  });
  const [loading, setLoading] = useState(false);
  const [registerForm] = Form.useForm();
  const [partnerForm] = Form.useForm();

  const events = [
    {
      title: "Online Empowerment Conference Africa",
      description: "Join us for our flagship event bringing together young talents from across Africa.",
      buttonText: "Register Now",
      image: "/Conference Africa.png",
      bgColor: "bg-blue-500",
      modalKey: "register"
    },
    {
      title: "School Outreach & Dream Career Club Program", 
      description: "To identify, inspire, and nurture brilliant students across schools.",
      buttonText: "Partner with us",
      image: "/2.png", 
      bgColor: "bg-blue-600",
      modalKey: "partner"
    },
    {
      title: "Weekly Workshops",
      description: "Join our regular skills development workshops at Kigali-Rwanda.",
      buttonText: "View Schedule", 
      image: "/8.png", 
      bgColor: "bg-blue-700",
      modalKey: "schedule"
    }
  ];

  // Schedule data
  const scheduleData = [
    {
      key: '1',
      day: 'Saturday',
      time: '3:00 PM – 5:00 PM',
      topic: 'Public Speaking Mastery',
      focus: 'Confidence, Communication Skills',
      facilitator: 'Guest Speaker / Coach'
    },
    {
      key: '2',
      day: 'Saturday',
      time: '3:00 PM – 5:00 PM',
      topic: 'Creative Design & Branding',
      focus: 'Adobe Tools, Canva, Visual Identity',
      facilitator: 'Graphic Designer / Trainer'
    },
    {
      key: '3',
      day: 'Saturday',
      time: '3:00 PM – 5:00 PM',
      topic: 'Digital Literacy & Content Creation',
      focus: 'Social Media, Writing, Photography',
      facilitator: 'Media Instructor'
    },
    {
      key: '4',
      day: 'Saturday',
      time: '3:00 PM – 5:00 PM',
      topic: 'Entrepreneurship & Innovation',
      focus: 'Problem Solving, Business Ideas',
      facilitator: 'Startup Mentor'
    },
    {
      key: '5',
      day: 'Saturday',
      time: '3:00 PM – 5:00 PM',
      topic: 'Podcasting & Storytelling',
      focus: 'Voice Techniques, Narratives',
      facilitator: 'Podcast Host'
    },
    {
      key: '6',
      day: 'Saturday',
      time: '10:00 AM – 1:00 PM',
      topic: 'Career Mentorship',
      focus: 'Personal Growth, Career Paths',
      facilitator: 'Mentorship Panel'
    }
  ];

  const scheduleColumns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      render: (day) => <Tag color="blue">{day}</Tag>,
      width: 100,
      fixed: 'left'
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (time) => (
        <div className="flex items-center gap-2">
          <ClockCircleOutlined className="text-gray-500" />
          <span className="text-sm whitespace-nowrap">{time}</span>
        </div>
      ),
      width: 160
    },
    {
      title: 'Workshop Topic',
      dataIndex: 'topic',
      key: 'topic',
      render: (topic) => <strong className="text-blue-600">{topic}</strong>,
      width: 200,
      ellipsis: {
        showTitle: false,
      }
    },
    {
      title: 'Focus Area',
      dataIndex: 'focus',
      key: 'focus',
      render: (focus) => <Text className="text-gray-600">{focus}</Text>,
      width: 200,
      ellipsis: {
        showTitle: false,
      }
    },
    {
      title: 'Facilitator',
      dataIndex: 'facilitator',
      key: 'facilitator',
      render: (facilitator) => <Text className="text-green-600">{facilitator}</Text>,
      width: 180,
      ellipsis: {
        showTitle: false,
      }
    }
  ];

  const handleButtonClick = (buttonText) => {
    if (buttonText === "Register Now" && onRegister) {
      onRegister();
    } else if (buttonText === "Partner with us" && onPartner) {
      onPartner();
    } else if (buttonText === "View Schedule" && onViewSchedule) {
      onViewSchedule();
    }

    // Handle modal opening based on button text
    if (buttonText === "Register Now") {
      setModalVisible(prev => ({ ...prev, register: true }));
    } else if (buttonText === "Partner with us") {
      setModalVisible(prev => ({ ...prev, partner: true }));
    } else if (buttonText === "View Schedule") {
      setModalVisible(prev => ({ ...prev, schedule: true }));
    }
  };

  const handleModalClose = (modalKey) => {
    setModalVisible(prev => ({ ...prev, [modalKey]: false }));
    if (modalKey === 'register') {
      registerForm.resetFields();
    } else if (modalKey === 'partner') {
      partnerForm.resetFields();
    }
  };

  const handleSubmit = async (modalKey, values) => {
    setLoading(true);
    
    try {
      let endpoint, successMessage;
      
      if (modalKey === 'register') {
        endpoint = API_ENDPOINTS.REGISTER_NOW;
        successMessage = "Thank you for registering! We are excited to have you join the Online Empowerment Conference Africa. You will receive a confirmation email with event details soon.";
      } else if (modalKey === 'partner') {
        endpoint = API_ENDPOINTS.PARTNERSHIPS;
        successMessage = "Thank you for your partnership interest! Our team will review your application and contact you within 48 hours to discuss collaboration opportunities.";
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

  // Conference Registration Form
  const ConferenceRegistrationForm = () => (
    <Form
      form={registerForm}
      layout="vertical"
      onFinish={(values) => handleSubmit('register', values)}
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

      <Row gutter={16}>
        <Col span={12}>
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
        <Col span={12}>
          <Form.Item
            name="countryOfResidence"
            label="Country of Residence"
            rules={[{ required: true, message: 'Please enter your country' }]}
          >
            <Input 
              prefix={<EnvironmentOutlined />} 
              placeholder="Rwanda"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="ageGroup"
        label="Age Group"
        rules={[{ required: true, message: 'Please select your age group' }]}
      >
        <Select placeholder="Select your age group" size="large">
          <Option value={AgeGroup.UNDER_18}>Under 18</Option>
          <Option value={AgeGroup.EIGHTEEN_TO_25}>18-25</Option>
          <Option value={AgeGroup.TWENTY_SIX_TO_35}>26-35</Option>
          <Option value={AgeGroup.THIRTY_SIX_TO_45}>36-45</Option>
          <Option value={AgeGroup.FORTY_SIX_TO_55}>46-55</Option>
          <Option value={AgeGroup.OVER_55}>Over 55</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="areasOfInterest"
        label="Areas of Interest"
        rules={[{ required: true, message: 'Please select at least one area of interest' }]}
      >
        <Select 
          mode="multiple"
          placeholder="Select areas of interest"
          size="large"
          maxTagCount={3}
        >
          {AREAS_OF_INTEREST.map(area => (
            <Option key={area} value={area}>{area}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="engagementDetails"
        label="Engagement Role"
        rules={[{ required: true, message: 'Please select your engagement role' }]}
      >
        <Select placeholder="Select your role" size="large">
          <Option value={EngagementDetails.YOUTH_PARTICIPANT}>Youth Participant</Option>
          <Option value={EngagementDetails.GUEST_SPEAKER}>Guest Speaker</Option>
          <Option value={EngagementDetails.PARTNER_ORGANIZATION_REPRESENTATIVE}>Partner Organization Representative</Option>
          <Option value={EngagementDetails.VOLUNTEER}>Volunteer</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="conferenceType"
        label="Conference Type Preference"
        rules={[{ required: true, message: 'Please select conference type' }]}
      >
        <Select placeholder="Select conference type" size="large">
          <Option value={ConferenceType.VIRTUAL}>Virtual</Option>
          <Option value={ConferenceType.HYBRID}>Hybrid</Option>
          <Option value={ConferenceType.IN_PERSON}>In-Person</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="wantsToShowcaseTalent"
        valuePropName="checked"
      >
        <Checkbox>I would like to showcase a talent or speak at the conference</Checkbox>
      </Form.Item>

      <Form.Item
        name="briefDescription"
        label="Brief Description of Your Talent/Topic (Optional)"
        rules={[{ max: 500, message: 'Please keep it under 500 characters' }]}
      >
        <TextArea 
          rows={3} 
          placeholder="Describe your talent or speaking topic..."
          showCount
          maxLength={500}
        />
      </Form.Item>

      <Divider />

      <Space direction="vertical" size="small">
        <Form.Item
          name="consentToParticipate"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please consent to participate' }]}
        >
          <Checkbox>I consent to participate in the Online Empowerment Conference Africa</Checkbox>
        </Form.Item>

        <Form.Item
          name="agreeToReceiveUpdates"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to receive updates' }]}
        >
          <Checkbox>I agree to receive updates and communications related to the conference</Checkbox>
        </Form.Item>

        <Form.Item
          name="agreeToGuidelines"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to guidelines' }]}
        >
          <Checkbox>I agree to abide by the event guidelines and code of conduct</Checkbox>
        </Form.Item>
      </Space>
    </Form>
  );

  // Partnership Form
  const PartnershipForm = () => (
    <Form
      form={partnerForm}
      layout="vertical"
      onFinish={(values) => handleSubmit('partner', values)}
      className="space-y-4"
    >
      <Form.Item
        name="organizationName"
        label="Organization / Institution / Individual Name"
        rules={[
          { required: true, message: 'Please enter organization name' },
          { min: 2, max: 200, message: 'Name must be between 2-200 characters' }
        ]}
      >
        <Input 
          placeholder="Tech Innovation Hub"
          size="large"
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="contactPersonName"
            label="Contact Person Name"
            rules={[
              { required: true, message: 'Please enter contact person name' },
              { min: 2, max: 100, message: 'Name must be between 2-100 characters' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="John Doe"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="titlePosition"
            label="Title/Position"
            rules={[
              { required: true, message: 'Please enter title/position' },
              { min: 2, max: 100, message: 'Title must be between 2-100 characters' }
            ]}
          >
            <Input 
              placeholder="Program Director"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="emailAddress"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter email address' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="john.doe@techhub.com"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="+1234567890"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="websiteSocialMedia"
        label="Website or Social Media (Optional)"
        rules={[{ max: 500, message: 'URL must not exceed 500 characters' }]}
      >
        <Input 
          placeholder="https://www.techhub.com"
          size="large"
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[
              { required: true, message: 'Please enter country' },
              { min: 2, max: 100, message: 'Country must be between 2-100 characters' }
            ]}
          >
            <Input 
              prefix={<EnvironmentOutlined />} 
              placeholder="United States"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[
              { required: true, message: 'Please enter city' },
              { min: 2, max: 100, message: 'City must be between 2-100 characters' }
            ]}
          >
            <Input 
              placeholder="San Francisco"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="partnershipTypes"
        label="Types of Partnership Interested In"
        rules={[{ required: true, message: 'Please select at least one partnership type' }]}
      >
        <Select 
          mode="multiple"
          placeholder="Select partnership types"
          size="large"
          maxTagCount={2}
        >
          {Object.entries(PartnershipType).map(([key, value]) => (
            <Option key={key} value={value}>{value}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="partnershipGoals"
        label="Partnership Goals"
        rules={[
          { required: true, message: 'Please describe your partnership goals' },
          { min: 10, max: 2000, message: 'Goals must be between 10-2000 characters' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="What do you hope to achieve through this partnership?"
          showCount
          maxLength={2000}
        />
      </Form.Item>

      <Form.Item
        name="organizationDescription"
        label="Organization Description"
        rules={[
          { required: true, message: 'Please describe your organization' },
          { min: 10, max: 2000, message: 'Description must be between 10-2000 characters' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="Describe your organization or project..."
          showCount
          maxLength={2000}
        />
      </Form.Item>

      <Form.Item
        name="preferredTimeline"
        label="Preferred Timeline"
        rules={[{ required: true, message: 'Please select preferred timeline' }]}
      >
        <Select placeholder="Select partnership timeline" size="large">
          {Object.entries(PartnershipTimeline).map(([key, value]) => (
            <Option key={key} value={value}>{value}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="contributionCapacity"
        label="Contribution Capacity"
        rules={[
          { required: true, message: 'Please describe your contribution capacity' },
          { min: 10, max: 1000, message: 'Description must be between 10-1000 characters' }
        ]}
      >
        <TextArea 
          rows={3} 
          placeholder="What kind of support are you willing to offer?"
          showCount
          maxLength={1000}
        />
      </Form.Item>

      <Divider />

      <Space direction="vertical" size="small">
        <Form.Item
          name="termsAgreement"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to collaborate under ethical terms' }]}
        >
          <Checkbox>I agree to collaborate under ethical terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item
          name="communicationAgreement"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to communication requirements' }]}
        >
          <Checkbox>I agree to communication and planning requirements</Checkbox>
        </Form.Item>
      </Space>
    </Form>
  );

  const getModalConfig = (modalKey) => {
    const configs = {
      register: {
        title: "Conference Registration",
        subtitle: "Register for the Online Empowerment Conference Africa",
        form: <ConferenceRegistrationForm />,
        width: 700
      },
      partner: {
        title: "Partnership Application",
        subtitle: "Partner with us for youth empowerment initiatives",
        form: <PartnershipForm />,
        width: 800
      },
      schedule: {
        title: "Weekly Workshops Schedule",
        subtitle: "Kigali, Rwanda - Weekly | Saturday",
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <EnvironmentOutlined className="text-blue-600" />
                <Text strong>Location: National Training Center, Kigali-Rwanda</Text>
              </div>
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-blue-600" />
                <Text>Weekly Sessions | Every Saturday</Text>
              </div>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table 
                dataSource={scheduleData}
                columns={scheduleColumns}
                pagination={false}
                scroll={{ x: 'max-content', y: 400 }}
                size="middle"
                className="border rounded-lg"
                bordered
              />
            </div>

            {/* Mobile and Tablet Scrollable Table */}
            <div className="block lg:hidden">
              <div className="overflow-x-auto border rounded-lg bg-white">
                <Table 
                  dataSource={scheduleData}
                  columns={scheduleColumns.map(col => ({
                    ...col,
                    width: col.key === 'day' ? 80 : 
                           col.key === 'time' ? 140 :
                           col.key === 'topic' ? 180 :
                           col.key === 'focus' ? 160 : 140,
                    ellipsis: false,
                    responsive: undefined
                  }))}
                  pagination={false}
                  scroll={{ x: 700, y: 400 }}
                  size="small"
                  className="min-w-full"
                  bordered
                />
              </div>
              
              {/* Instructions for mobile users */}
              <div className="mt-2 text-center">
                <Text className="text-xs text-gray-500">
                  ← Scroll horizontally to view all columns →
                </Text>
              </div>
            </div>
          </div>
        ),
        width: 1200
      }
    };
    return configs[modalKey];
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <Title 
            level={2} 
            className="!mb-4 !text-2xl md:!text-3xl lg:!text-4xl xl:!text-5xl font-bold text-black !leading-tight"
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            EVENTS
          </Title>
        </div>
        
        {/* Events Grid */}
        <Row 
          gutter={[
            { xs: 8, sm: 16, md: 20, lg: 24, xl: 20 }, 
            { xs: 20, sm: 24, md: 28, lg: 20 }
          ]} 
          justify="center" 
          align="stretch"
          className="w-full"
        >
          {events.map((event, index) => (
            <Col 
              xs={24} 
              sm={12} 
              md={12} 
              lg={8} 
              xl={8}
              key={index}
              className="flex"
              style={{ display: 'flex' }}
            >
              <Card 
                className="w-full rounded-2xl border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 lg:hover:-translate-y-3 transition-all duration-300 overflow-hidden group bg-[#1F99ED]"
                styles={{
                  body: { 
                    padding: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }
                }}
                bodyStyle={{
                  padding: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                style={{
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '320px'
                }}
              >
                
                <div 
                  className="relative w-full overflow-hidden" 
                  style={{ 
                    margin: 0, 
                    padding: 0, 
                    height: '150px',
                    minHeight: '150px',
                    maxHeight: '150px',
                    flexShrink: 0,  
                    flexGrow: 0     
                  }}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                      width: '100%',
                      height: '100%'
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback background */}
                  <div 
                    className={`absolute inset-0 ${event.bgColor} flex items-center justify-center`} 
                    style={{ 
                      display: 'none',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <Text className="text-white text-base md:text-lg font-semibold z-10">
                      {event.title}
                    </Text>
                  </div>
                </div>

                {/* Card Content - Flex grow to fill remaining space */}
                <div className="flex-1 flex flex-col p-4 sm:p-5 lg:p-6" style={{ flexGrow: 1 }}>
                  {/* Title */}
                  <Title 
                    level={3} 
                    className="text-white mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl leading-tight text-center font-semibold"
                    style={{
                      fontSize: '15px',
                      marginTop: '10px',
                      color: 'white',
                      marginBottom: '12px'
                    }}
                  >
                    {event.title}
                  </Title>
                  
                  {/* Description - Flex grow to take available space */}
                  <div className="flex-1 mb-4 sm:mb-6" style={{ flexGrow: 1 }}>
                    <Paragraph 
                      className="text-black mb-0 text-xs sm:text-sm lg:text-base leading-relaxed text-left"
                      style={{
                        color: 'black',
                        textAlign: 'left',
                        marginLeft:'10px',
                        marginBottom:'0px'
                      }}
                    >
                      {event.description}
                    </Paragraph>
                  </div>
                  
                  {/* Button - Always at bottom */}
                  <div className="text-center mt-auto" style={{ marginBottom: '20px' }}>
                    <Button
                      type="primary"
                      size="large"
                      className="bg-white text-blue-600 border-white hover:bg-gray-100 hover:text-blue-700 font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[44px] group/btn"
                      onClick={() => handleButtonClick(event.buttonText)}
                    >
                      <span>{event.buttonText}</span>
                      <ArrowRightOutlined className="text-xs transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modals */}
        {Object.keys(modalVisible).map((modalKey) => {
          const config = getModalConfig(modalKey);
          const isSchedule = modalKey === 'schedule';
          
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
              footer={isSchedule ? [
                <Button 
                  key="close" 
                  type="primary"
                  onClick={() => handleModalClose(modalKey)}
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Close
                </Button>
              ] : [
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
                    if (modalKey === 'register') {
                      registerForm.submit();
                    } else if (modalKey === 'partner') {
                      partnerForm.submit();
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                  style={{
                    marginBottom: '30px'
                  }}
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
                  maxHeight: isSchedule ? '80vh' : '70vh',
                  overflowY: 'auto',
                  padding: isSchedule ? '20px 0' : undefined,
                }
              }}
              destroyOnClose={true}
              centered={!isSchedule}
            >
              <Spin spinning={loading}>
                {isSchedule ? config.content : config.form}
              </Spin>
            </Modal>
          );
        })}
      </div>
    </section>
  );
};

export default EventsSection;