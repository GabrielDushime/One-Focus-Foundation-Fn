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
  InputNumber, 
  Checkbox, 
  message,
  Spin,
  Divider,
  Space
} from 'antd';
import { ArrowRightOutlined, UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { API_ENDPOINTS } from '../../config/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ProgramsSection = () => {
  const [modalVisible, setModalVisible] = useState({
    joinUs: false,
    bookUs: false,
    getInvolved: false
  });
  const [loading, setLoading] = useState(false);
  const [joinUsForm] = Form.useForm();
  const [bookUsForm] = Form.useForm();
  const [getInvolvedForm] = Form.useForm();

  const programs = [
    {
      title: "Workshops",
      description: "Since February 1st, 2025, we've launched workshops and workplace at National Training center. These sessions include public speaking, art, design, music, and business skills.",
      buttonText: "Join Us",
      image: "/Workshop Presentation_edited.jpg",
      bgColor: "bg-blue-500",
      modalKey: "joinUs"
    },
    {
      title: "Voice of Tomorrow Podcast", 
      description: "A storytelling platform hosted on Spotify and YouTube, where youth share dreams, challenges, and success stories.",
      buttonText: "Book now",
      image: "/11.png", 
      bgColor: "bg-blue-600",
      modalKey: "bookUs"
    },
    {
      title: "Mentorship Program",
      description: "To guide, empower, and accelerate the personal, academic, and creative growth of young talents by connecting them with experienced mentors in various fields across Africa and the globe.",
      buttonText: "Get Involved",
      image: "/Mentorship.jpg", 
      bgColor: "bg-orange-500",
      modalKey: "getInvolved"
    }
  ];

  const handleButtonClick = (modalKey) => {
    setModalVisible(prev => ({ ...prev, [modalKey]: true }));
  };

  const handleModalClose = (modalKey) => {
    setModalVisible(prev => ({ ...prev, [modalKey]: false }));
    // Reset the appropriate form based on modalKey
    switch (modalKey) {
      case 'joinUs':
        joinUsForm.resetFields();
        break;
      case 'bookUs':
        bookUsForm.resetFields();
        break;
      case 'getInvolved':
        getInvolvedForm.resetFields();
        break;
    }
  };

  // Custom validation function for mentorship preferences
  const validateMentorshipPreferences = (_, value, callback) => {
    const formValues = getInvolvedForm.getFieldsValue();
    const hasAtLeastOne = formValues.oneOnOneVirtual || formValues.groupSessions || formValues.inPersonRwanda;
    
    if (!hasAtLeastOne) {
      return Promise.reject(new Error('Please select at least one mentorship format'));
    }
    return Promise.resolve();
  };

  // Custom validation function for availability
  const validateAvailability = (_, value, callback) => {
    const formValues = getInvolvedForm.getFieldsValue();
    const hasAtLeastOne = formValues.weekdayEvenings || formValues.weekends || formValues.flexible;
    
    if (!hasAtLeastOne) {
      return Promise.reject(new Error('Please select at least one availability option'));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (modalKey, values) => {
    setLoading(true);
    
    // For getInvolved form, ensure unselected checkboxes are set to false
    if (modalKey === 'getInvolved') {
      values = {
        ...values,
        oneOnOneVirtual: values.oneOnOneVirtual || false,
        groupSessions: values.groupSessions || false,
        inPersonRwanda: values.inPersonRwanda || false,
        weekdayEvenings: values.weekdayEvenings || false,
        weekends: values.weekends || false,
        flexible: values.flexible || false
      };
    }

    try {
      let endpoint, successMessage;
      
      switch (modalKey) {
        case 'joinUs':
          endpoint = API_ENDPOINTS.JOIN_US;
          successMessage = "Thank you for registering! Our team will contact you shortly with session details. See you at the workshop!";
          break;
        case 'bookUs':
          endpoint = API_ENDPOINTS.BOOK_US;
          successMessage = "Thank you for booking! Our team will review your story and reach out to schedule your podcast session. You are one step closer to inspiring the world!";
          break;
        case 'getInvolved':
          endpoint = API_ENDPOINTS.GET_INVOLVED;
          successMessage = "Thank you for registering! You'll soon be contacted by the ONEFOCUS team to be matched with a mentor who fits your path. Let's grow together!";
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

  // Join Us Form Fields - Fixed enum values
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

  // Book Us Form Fields - Fixed enum values
  const BookUsForm = () => (
    <Form
      form={bookUsForm}
      layout="vertical"
      onFinish={(values) => handleSubmit('bookUs', values)}
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
            label="Phone Number"
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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="age"
            label="Age"
          >
            <InputNumber 
              min={16} 
              max={65} 
              placeholder="Your age"
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="occupationCareer"
            label="Occupation/Career"
            rules={[{ required: true, message: 'Please enter your occupation' }]}
          >
            <Input 
              placeholder="Software Developer"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="podcastCategory"
        label="Podcast Category"
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select placeholder="Select category that fits your story" size="large">
          <Option value="young_talents_on_journey">Young Talents on Journey</Option>
          <Option value="successful_personalities_role_models">Successful Personalities Role Models</Option>
          <Option value="visionary_minds_business_innovation">Visionary Minds Business Innovation</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="contentType"
        label="Content Type Preference"
        rules={[{ required: true, message: 'Please select content type' }]}
      >
        <Select placeholder="Select your preferred content type" size="large">
          <Option value="live_camera">Live Camera (Video)</Option>
          <Option value="audio_only">Audio Only</Option>
          <Option value="pre_recorded">Pre Recorded</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="storyDescription"
        label="Brief Story Description (Max 500 characters)"
        rules={[
          { required: true, message: 'Please describe your story' },
          { max: 500, message: 'Please keep it under 500 characters' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="Brief description of your story, business idea, or talent..."
          showCount
          maxLength={500}
        />
      </Form.Item>

      <Form.Item
        name="messageToYouth"
        label="Message to Youth (Max 1000 characters)"
        rules={[
          { required: true, message: 'Please share your message' },
          { max: 1000, message: 'Please keep it under 1000 characters' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="What message do you want to share with youth or your audience?"
          showCount
          maxLength={1000}
        />
      </Form.Item>

      <Form.Item
        name="hasPodcastExperience"
        label="Previous Podcast/Speaking Experience"
        rules={[{ required: true, message: 'Please select your experience level' }]}
      >
        <Select placeholder="Do you have previous experience?" size="large">
          <Option value={true}>Yes, I have experience</Option>
          <Option value={false}>No, I&apos;m new to this</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="experienceDescription"
        label="Experience Description (Optional)"
        rules={[{ max: 500, message: 'Please keep it under 500 characters' }]}
      >
        <TextArea 
          rows={3} 
          placeholder="Brief description of your previous experience..."
          showCount
          maxLength={500}
        />
      </Form.Item>

      <Divider />

      <Space direction="vertical" size="small">
        <Form.Item
          name="agreesTobeFeatured"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to be featured' }]}
        >
          <Checkbox>I agree to be featured publicly on ONEFOCUS platforms</Checkbox>
        </Form.Item>

        <Form.Item
          name="consentToGuidelines"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please consent to guidelines' }]}
        >
          <Checkbox>I understand this is a youth empowerment platform and agree to share positively and responsibly</Checkbox>
        </Form.Item>
      </Space>
    </Form>
  );

  // Get Involved Form Fields with updated validation
  const GetInvolvedForm = () => (
    <Form
      form={getInvolvedForm}
      layout="vertical"
      onFinish={(values) => handleSubmit('getInvolved', values)}
      className="space-y-4"
      initialValues={{
        oneOnOneVirtual: false,
        groupSessions: false,
        inPersonRwanda: false,
        weekdayEvenings: false,
        weekends: false,
        flexible: false
      }}
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
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="+250123456789"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="age"
            label="Age"
          >
            <InputNumber 
              min={16} 
              max={100} 
              placeholder="Your age"
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

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

      <Form.Item
        name="currentStatus"
        label="Current Academic/Professional Status"
        rules={[{ required: true, message: 'Please select your current status' }]}
      >
        <Select placeholder="Select your current status" size="large">
          <Option value="Student">Student</Option>
          <Option value="Graduate">Graduate</Option>
          <Option value="Job Seeker">Job Seeker</Option>
          <Option value="Early Career Professional">Early Career Professional</Option>
          <Option value="Entrepreneur">Entrepreneur</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="fieldOfInterest"
        label="Field of Interest or Career Path"
        rules={[{ required: true, message: 'Please enter your field of interest' }]}
      >
        <Input 
          placeholder="Software Development"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="whyMentor"
        label="Why do you want a mentor? (Max 500 characters)"
        rules={[
          { required: true, message: 'Please share why you want a mentor' },
          { max: 500, message: 'Please keep it under 500 characters' }
        ]}
      >
        <TextArea 
          rows={4} 
          placeholder="I want to grow my technical skills and learn from experienced professionals in my field..."
          showCount
          maxLength={500}
        />
      </Form.Item>

      <Form.Item
        name="skillsSupport"
        label="Skills or Support Looking For"
        rules={[{ required: true, message: 'Please select the type of support you need' }]}
      >
        <Select placeholder="Select skills/support needed" size="large">
          <Option value="Career Guidance">Career Guidance</Option>
          <Option value="Entrepreneurship">Entrepreneurship</Option>
          <Option value="Public Speaking">Public Speaking</Option>
          <Option value="Digital Skills">Digital Skills</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>

      <Divider orientation="left">Mentorship Preferences (Select at least one)</Divider>

      <Space direction="vertical" size="small">
        <Form.Item
          name="oneOnOneVirtual"
          valuePropName="checked"
          rules={[{ validator: validateMentorshipPreferences }]}
        >
          <Checkbox>One-on-one virtual mentorship</Checkbox>
        </Form.Item>

        <Form.Item
          name="groupSessions"
          valuePropName="checked"
          dependencies={['oneOnOneVirtual']}
          rules={[{ validator: validateMentorshipPreferences }]}
        >
          <Checkbox>Group mentorship sessions</Checkbox>
        </Form.Item>

        <Form.Item
          name="inPersonRwanda"
          valuePropName="checked"
          dependencies={['oneOnOneVirtual', 'groupSessions']}
          rules={[{ validator: validateMentorshipPreferences }]}
        >
          <Checkbox>In-person mentorship (Rwanda only)</Checkbox>
        </Form.Item>
      </Space>

      <Divider orientation="left">Availability (Select at least one)</Divider>

      <Space direction="vertical" size="small">
        <Form.Item
          name="weekdayEvenings"
          valuePropName="checked"
          rules={[{ validator: validateAvailability }]}
        >
          <Checkbox>Weekday evenings</Checkbox>
        </Form.Item>

        <Form.Item
          name="weekends"
          valuePropName="checked"
          dependencies={['weekdayEvenings']}
          rules={[{ validator: validateAvailability }]}
        >
          <Checkbox>Weekends</Checkbox>
        </Form.Item>

        <Form.Item
          name="flexible"
          valuePropName="checked"
          dependencies={['weekdayEvenings', 'weekends']}
          rules={[{ validator: validateAvailability }]}
        >
          <Checkbox>Flexible availability</Checkbox>
        </Form.Item>
      </Space>

      <Divider />

      <Space direction="vertical" size="small">
        <Form.Item
          name="agreesToParticipate"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to participate with commitment' }]}
        >
          <Checkbox>I agree to participate with commitment and respect</Checkbox>
        </Form.Item>

        <Form.Item
          name="consentToGuidelines"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please consent to follow guidelines' }]}
        >
          <Checkbox>I consent to follow mentorship program guidelines</Checkbox>
        </Form.Item>
      </Space>
    </Form>
  );

  const getModalConfig = (modalKey) => {
    const configs = {
      joinUs: {
        title: "Join Our Workshop",
        subtitle: "Sign up for our skills development workshops",
        form: <JoinUsForm />
      },
      bookUs: {
        title: "Book Your Podcast Session",
        subtitle: "Share your story on Voice of Tomorrow",
        form: <BookUsForm />
      },
      getInvolved: {
        title: "Get Matched with a Mentor",
        subtitle: "Join our mentorship program for guidance and support",
        form: <GetInvolvedForm />
      }
    };
    return configs[modalKey];
  };

  return (
    <section className="section-padding bg-white">
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
            OUR PROGRAMS
          </Title>
        </div>
        
        {/* Programs Grid */}
        <Row 
          gutter={[
            { xs: 8, sm: 16, md: 20, lg: 24, xl: 20 }, 
            { xs: 20, sm: 24, md: 28, lg: 20 }
          ]} 
          justify="center" 
          align="stretch"
          className="w-full"
        >
          {programs.map((program, index) => (
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
                    src={program.image}
                    alt={program.title}
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
                    className={`absolute inset-0 ${program.bgColor} flex items-center justify-center`} 
                    style={{ 
                      display: 'none',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <Text className="text-white text-base md:text-lg font-semibold z-10">
                      {program.title}
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
                      fontSize: '16px',
                      marginTop: '10px',
                      color: 'white',
                      marginBottom: '12px'
                    }}
                  >
                    {program.title}
                  </Title>
                  
                  {/* Description - Flex grow to take available space */}
                  <div className="flex-1 mb-4 sm:mb-6" style={{ flexGrow: 1 }}>
                    <Paragraph 
                      className="text-white mb-0 text-xs sm:text-sm lg:text-base leading-relaxed text-left"
                      style={{
                        color: 'white',
                        textAlign: 'left',
                        marginLeft:'10px',
                        marginBottom:'0px'
                      }}
                    >
                      {program.description}
                    </Paragraph>
                  </div>
                  
                  {/* Button - Always at bottom */}
                  <div className="text-center mt-auto" style={{ marginBottom: '20px' }}>
                    <Button
                      type="primary"
                      size="large"
                      className="bg-white text-blue-600 border-white hover:bg-gray-100 hover:text-blue-700 font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[44px] group/btn"
                      onClick={() => handleButtonClick(program.modalKey)}
                    >
                      <span>{program.buttonText}</span>
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
              width={modalKey === 'getInvolved' ? 700 : 600}
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
                  
                    switch (modalKey) {
                      case 'joinUs':
                        joinUsForm.submit();
                        break;
                      case 'bookUs':
                        bookUsForm.submit();
                        break;
                      case 'getInvolved':
                        getInvolvedForm.submit();
                        break;
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
            >
              <Spin spinning={loading}>
                {config.form}
              </Spin>
            </Modal>
          );
        })}
      </div>
    </section>
  );
};

export default ProgramsSection;