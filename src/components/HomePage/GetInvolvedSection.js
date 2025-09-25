'use client'

import React, { useState } from 'react'
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
  DatePicker, 
  InputNumber,
  message,
  Spin,
  Divider,
  Space
} from 'antd'
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  CalendarOutlined,
  LinkOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import Image from 'next/image'
import { API_ENDPOINTS } from '../../config/api'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input
const { Option } = Select

// Enums from backend
const Gender = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
  PREFER_NOT_TO_SAY: 'prefer_not_to_say'
}

const VolunteerRole = {
  MENTOR: 'mentor',
  WORKSHOP_TRAINER: 'workshop_trainer',
  PODCAST_SUPPORT: 'podcast_support',
  TECHNICAL_SUPPORT: 'technical_support',
  EVENT_ORGANIZATION: 'event_organization',
  SCHOOL_OUTREACH: 'school_outreach',
  MEDIA_CONTENT_CREATION: 'media_content_creation'
}

const DayOfWeek = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday'
}

const TimeSlot = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening'
}

const PartnershipType = {
  EVENT_CO_HOSTING: 'Event Co-Hosting',
  YOUTH_MENTORSHIP: 'Youth Mentorship Collaboration',
  WORKSHOP_SPONSORSHIP: 'Workshop/Training Sponsorship',
  MEDIA_PARTNERSHIP: 'Media & Podcast Partnership',
  SCHOOL_OUTREACH: 'School Outreach Collaboration',
  TECHNICAL_SUPPORT: 'Technical/Creative Support',
  FINANCIAL_SPONSORSHIP: 'Financial Sponsorship',
  RESOURCE_CONTRIBUTION: 'Resource or Equipment Contribution',
  INTERNSHIP_PROGRAMS: 'Internship or Career Exposure Programs'
}

const PartnershipTimeline = {
  ONGOING: 'Ongoing',
  THREE_MONTHS: '3 Months',
  SIX_MONTHS: '6 Months',
  ANNUAL: 'Annual'
}

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

const GetInvolvedSection = () => {
  const [modalVisible, setModalVisible] = useState({
    volunteer: false,
    partner: false,
    mentor: false
  })
  const [loading, setLoading] = useState(false)
  const [volunteerForm] = Form.useForm()
  const [partnerForm] = Form.useForm()
  const [mentorForm] = Form.useForm()

  const getInvolvedOptions = [
    {
      title: "Volunteer With Us",
      description: "Be a mentor, trainer, or support team member. Shape the future with us.",
      buttonText: "Sign Up",
      image: "/volunter.jpg",
      modalKey: "volunteer"
    },
    {
      title: "Partner With Us", 
      description: "We welcome schools, NGOs, companies, and individuals to sponsor or co-host events.",
      buttonText: "Partner Now",
      image: "/handshake.jpg",
      modalKey: "partner"
    },
    {
      title: "Join as a Mentor",
      description: "Share your wisdom with aspiring youth. One session could change a life.",
      buttonText: "Apply Today", 
      image: "/Mentor.jpg",
      modalKey: "mentor"
    }
  ]

  const handleButtonClick = (modalKey) => {
    setModalVisible(prev => ({ ...prev, [modalKey]: true }))
  }

  const handleModalClose = (modalKey) => {
    setModalVisible(prev => ({ ...prev, [modalKey]: false }))
    if (modalKey === 'volunteer') {
      volunteerForm.resetFields()
    } else if (modalKey === 'partner') {
      partnerForm.resetFields()
    } else if (modalKey === 'mentor') {
      mentorForm.resetFields()
    }
  }

  const handleSubmit = async (modalKey, values) => {
    setLoading(true)
    
    try {
      let endpoint, successMessage, transformedValues = { ...values }
      
      if (modalKey === 'volunteer') {
        endpoint = API_ENDPOINTS.VOLUNTEERS
        // Transform date to string format
        if (values.dateOfBirth) {
          transformedValues.dateOfBirth = values.dateOfBirth.format('YYYY-MM-DD')
        }
        successMessage = "Thank you for volunteering! Your application has been submitted successfully. We will review your application and contact you soon for the next steps."
      } else if (modalKey === 'partner') {
        endpoint = API_ENDPOINTS.PARTNERSHIPS
        successMessage = "Thank you for your partnership interest! Our team will review your application and contact you within 48 hours to discuss collaboration opportunities."
      } else if (modalKey === 'mentor') {
        endpoint = API_ENDPOINTS.MENTORS
        successMessage = "Thank you for joining as a mentor! The ONEFOCUS team will contact you soon to match you with mentees who align with your expertise. Together, let's empower Africa's next generation of leaders!"
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedValues),
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

  // Volunteer Form
  const VolunteerForm = () => (
    <Form
      form={volunteerForm}
      layout="vertical"
      onFinish={(values) => handleSubmit('volunteer', values)}
      className="space-y-4"
    >
      {/* Personal Information */}
      <Divider orientation="left">Personal Information</Divider>
      
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[
          { required: true, message: 'Please enter your full name' },
          { min: 2, max: 100, message: 'Name must be between 2-100 characters' }
        ]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="Jean Baptiste Uwimana"
          size="large"
        />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select your gender' }]}
          >
            <Select placeholder="Select gender" size="large">
              <Option value={Gender.MALE}>Male</Option>
              <Option value={Gender.FEMALE}>Female</Option>
              <Option value={Gender.OTHER}>Other</Option>
              <Option value={Gender.PREFER_NOT_TO_SAY}>Prefer not to say</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select your date of birth' }]}
          >
            <DatePicker 
              placeholder="Select date of birth"
              size="large"
              format="YYYY-MM-DD"
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="emailAddress"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="jean.uwimana@gmail.com"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="phoneNumber"
            label="Phone Number (WhatsApp preferred)"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              { min: 10, max: 20, message: 'Phone number must be between 10-20 characters' }
            ]}
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
        <Col xs={24} md={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please enter your city' }]}
          >
            <Input 
              placeholder="Kigali"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="preferredLanguages"
        label="Preferred Languages"
        rules={[{ required: true, message: 'Please select at least one language' }]}
      >
        <Select 
          mode="multiple"
          placeholder="Select languages"
          size="large"
          options={[
            { label: 'English', value: 'English' },
            { label: 'Kinyarwanda', value: 'Kinyarwanda' },
            { label: 'French', value: 'French' },
            { label: 'Swahili', value: 'Swahili' },
            { label: 'Other', value: 'Other' }
          ]}
        />
      </Form.Item>

      {/* Volunteer Roles */}
      <Divider orientation="left">Volunteer Preferences</Divider>
      
      <Form.Item
        name="volunteerRoles"
        label="Volunteer Roles"
        rules={[{ required: true, message: 'Please select at least one volunteer role' }]}
      >
        <Select 
          mode="multiple"
          placeholder="Select volunteer roles"
          size="large"
          maxTagCount={2}
        >
          <Option value={VolunteerRole.MENTOR}>Mentor</Option>
          <Option value={VolunteerRole.WORKSHOP_TRAINER}>Workshop Trainer</Option>
          <Option value={VolunteerRole.PODCAST_SUPPORT}>Podcast Support</Option>
          <Option value={VolunteerRole.TECHNICAL_SUPPORT}>Technical Support</Option>
          <Option value={VolunteerRole.EVENT_ORGANIZATION}>Event Organization</Option>
          <Option value={VolunteerRole.SCHOOL_OUTREACH}>School Outreach</Option>
          <Option value={VolunteerRole.MEDIA_CONTENT_CREATION}>Media Content Creation</Option>
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="availableDays"
            label="Available Days"
            rules={[{ required: true, message: 'Please select available days' }]}
          >
            <Select 
              mode="multiple"
              placeholder="Select available days"
              size="large"
            >
              {Object.entries(DayOfWeek).map(([key, value]) => (
                <Option key={key} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="preferredTimes"
            label="Preferred Times"
            rules={[{ required: true, message: 'Please select preferred times' }]}
          >
            <Select 
              mode="multiple"
              placeholder="Select preferred times"
              size="large"
            >
              <Option value={TimeSlot.MORNING}>Morning</Option>
              <Option value={TimeSlot.AFTERNOON}>Afternoon</Option>
              <Option value={TimeSlot.EVENING}>Evening</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Experience */}
      <Divider orientation="left">Experience & Skills</Divider>
      
      <Form.Item
        name="relevantExperience"
        label="Relevant Experience"
        rules={[
          { required: true, message: 'Please describe your relevant experience' },
          { min: 20, max: 2000, message: 'Please provide at least 20 characters' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="Describe your relevant experience in mentorship, training, speaking, media, or related fields..."
          showCount
          maxLength={2000}
        />
      </Form.Item>

      <Form.Item
        name="linkedinWebsite"
        label="LinkedIn Profile or Personal Website (Optional)"
      >
        <Input 
          prefix={<LinkOutlined />} 
          placeholder="https://linkedin.com/in/your-profile"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="motivation"
        label="Motivation"
        rules={[
          { required: true, message: 'Please share your motivation' },
          { min: 20, max: 2000, message: 'Please provide at least 20 characters' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="What drives you to be part of ONEFOCUS FOUNDATION? Share your motivation for volunteering..."
          showCount
          maxLength={2000}
        />
      </Form.Item>

      {/* Agreements */}
      <Divider orientation="left">Agreement</Divider>
      
      <Space direction="vertical" size="small">
        <Form.Item
          name="missionAgreement"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to respect the mission and values' }]}
        >
          <Checkbox>I commit to respecting the mission, values, and youth-centered ethics of ONEFOCUS FOUNDATION</Checkbox>
        </Form.Item>

        <Form.Item
          name="onboardingAgreement"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to attend the onboarding session' }]}
        >
          <Checkbox>I agree to attend an online or in-person onboarding session before I begin volunteering</Checkbox>
        </Form.Item>
      </Space>
    </Form>
  )

  // Partnership Form
  const PartnershipForm = () => (
    <Form
      form={partnerForm}
      layout="vertical"
      onFinish={(values) => handleSubmit('partner', values)}
      className="space-y-4"
    >
      {/* Organization Information */}
      <Divider orientation="left">Organization Information</Divider>
      
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
        <Col xs={24} md={12}>
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
        <Col xs={24} md={12}>
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
        <Col xs={24} md={12}>
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
        <Col xs={24} md={12}>
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
          prefix={<GlobalOutlined />}
          placeholder="https://www.techhub.com"
          size="large"
        />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
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
        <Col xs={24} md={12}>
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

      {/* Partnership Details */}
      <Divider orientation="left">Partnership Details</Divider>
      
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

      <Row gutter={16}>
        <Col xs={24} md={12}>
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
        </Col>
        <Col xs={24} md={12}>
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
        </Col>
      </Row>

      {/* Agreements */}
      <Divider orientation="left">Agreement</Divider>
      
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
  )

  // Mentor Form
  const MentorForm = () => (
    <Form
      form={mentorForm}
      layout="vertical"
      onFinish={(values) => handleSubmit('mentor', values)}
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
              <Option value={EducationLevel.BACHELOR}>Bachelor's Degree</Option>
              <Option value={EducationLevel.MASTERS}>Master's Degree</Option>
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
      volunteer: {
        title: "Volunteer Application",
        subtitle: "Join our team and make a difference in youth empowerment",
        form: <VolunteerForm />,
        width: 900
      },
      partner: {
        title: "Partnership Application",
        subtitle: "Partner with us for youth empowerment initiatives",
        form: <PartnershipForm />,
        width: 900
      },
      mentor: {
        title: "Mentor Application",
        subtitle: "Share your wisdom and guide the next generation",
        form: <MentorForm />,
        width: 800
      }
    }
    return configs[modalKey]
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl"
        style={{
          textAlign:'center',
          paddingTop:'20px',
        }}
      >
        <Title level={2} className="text-center !mb-4 !text-3xl lg:!text-4xl font-bold text-black"
          style={{
            textAlign:'center',
            fontWeight:'bold',
           
          }}
        >
          GET INVOLVED
        </Title>
        
         <Row 
          gutter={[
            { xs: 8, sm: 16, md: 20, lg: 24, xl: 20 }, 
            { xs: 20, sm: 24, md: 28, lg: 20 }
          ]} 
          justify="center" 
          align="stretch"
          className="w-full"
        >
          {getInvolvedOptions.map((option, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card 
                className="text-center h-full rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 mx-2 md:mx-0"
                styles={{ body: { padding: '24px', backgroundColor: 'white' } }}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px 2px rgba(0, 0, 0, 0.05)'
                }}
                hoverable
              >
                <div className="!mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={option.image}
                      alt={option.title}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center" style={{ display: 'none' }}>
                      <span className="text-white text-2xl font-bold">
                        {index === 0 ? '🤝' : index === 1 ? '🤝' : '👤'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Title level={3} className="!text-blue-500 !mb-4 !text-xl lg:!text-2xl"
                  style={{
                    color:'#1F99ED',
                    fontWeight:'bold',
                    textAlign:'center',
                    fontSize:'16px',
                    paddingTop:'0px'
                  }}
                >
                  {option.title}
                </Title>
                
                <Paragraph className="text-gray-600 !mb-8 !text-base leading-relaxed"
                  style={{
                    fontSize:'12px'
                  }}
                >
                  {option.description}
                </Paragraph>
                
                <Button
                  type="primary"
                  size="large"
                  className="bg-blue-500 border-blue-500 hover:bg-blue-600 !h-12 !px-8 font-semibold rounded-lg w-50"
                  style={{
                    borderRadius:'20px',
                    height:'30px',
                    fontSize:'12px',
                    marginBottom:'20px'
                  }}
                  onClick={() => handleButtonClick(option.modalKey)}
                >
                  {option.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modals */}
        {Object.keys(modalVisible).map((modalKey) => {
          const config = getModalConfig(modalKey)
          
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
                    if (modalKey === 'volunteer') {
                      volunteerForm.submit()
                    } else if (modalKey === 'partner') {
                      partnerForm.submit()
                    } else if (modalKey === 'mentor') {
                      mentorForm.submit()
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
                body: {
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  padding: '20px 0'
                }
              }}
              destroyOnClose={true}
              centered
            >
              <Spin spinning={loading}>
                {config.form}
              </Spin>
            </Modal>
          )
        })}
      </div>
    </section>
  )
}

export default GetInvolvedSection