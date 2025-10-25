
import { useState } from 'react';
import { Typography, Button, Form, Input, Select, Row, Col, Modal, message, Spin, DatePicker, InputNumber, Checkbox } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../config/api';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ServicesPage = () => {
  const [internshipForm] = Form.useForm();
  const [socialMediaForm] = Form.useForm();
  const [videographyForm] = Form.useForm();
  const [speakingForm] = Form.useForm();
  const [designForm] = Form.useForm();
  const [codingForm] = Form.useForm();
  const [certificateForm] = Form.useForm();
  
  const [internshipModalVisible, setInternshipModalVisible] = useState(false);
  const [socialMediaModalVisible, setSocialMediaModalVisible] = useState(false);
  const [videographyModalVisible, setVideographyModalVisible] = useState(false);
  const [speakingModalVisible, setSpeakingModalVisible] = useState(false);
  const [designModalVisible, setDesignModalVisible] = useState(false);
  const [codingModalVisible, setCodingModalVisible] = useState(false);
  const [certificateModalVisible, setCertificateModalVisible] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "ONEFOCUS completely transformed my digital presence. The training was practical and results-oriented.",
      author: "Sarah Johnson",
      role: "Social Media Manager"
    },
    {
      quote: "The design course gave me portfolio-worthy projects. I landed my dream job within 3 months of completing the program.",
      author: "Michael Chen",
      role: "UI/UX Designer"
    },
    {
      quote: "The videography training and equipment access helped me launch my YouTube channel. Best decision ever!",
      author: "Amara Okafor",
      role: "Content Creator"
    },
    {
      quote: "From shy to stage-confident! The public speaking program gave me the tools and confidence to shine.",
      author: "Janet Martinez",
      role: "Public Speaker & Coach"
    }
  ];

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Internship Application Submit
  const handleInternshipSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.INTERNSHIP_APPLICATIONS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          country: values.country,
          city: values.city,
          educationLevel: values.educationLevel,
          departmentInterest: values.departmentInterest,
          availabilityStart: values.availabilityStart,
          availabilityEnd: values.availabilityEnd,
          statement: values.statement,
          consentConfirmed: values.consentConfirmed || false
        }),
      });

      if (response.ok) {
        message.success('Your internship application has been submitted successfully!');
        internshipForm.resetFields();
        setInternshipModalVisible(false);
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

  // Social Media Support Submit
  const handleSocialMediaSubmit = async (values) => {
    setLoading(true);
    try {
     
      const socialMediaHandles = {};
      if (values.instagramHandle) socialMediaHandles.instagram = values.instagramHandle;
      if (values.tiktokHandle) socialMediaHandles.tiktok = values.tiktokHandle;
      if (values.youtubeHandle) socialMediaHandles.youtube = values.youtubeHandle;
      if (values.linkedinHandle) socialMediaHandles.linkedin = values.linkedinHandle;
      if (values.facebookHandle) socialMediaHandles.facebook = values.facebookHandle;
      if (values.twitterHandle) socialMediaHandles.twitter = values.twitterHandle;

      const response = await fetch(API_ENDPOINTS.SOCIAL_MEDIA_SUPPORT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: values.applicantName,
          organization: values.organization,
          email: values.email,
          phone: values.phone,
          socialMediaHandles: socialMediaHandles,
          platformsRequested: values.platformsRequested,
          supportDescription: values.supportDescription,
          goalsKPIs: values.goalsKPIs,
          budget: values.budget,
          consentConfirmed: values.consentConfirmed || false
        }),
      });

      if (response.ok) {
        message.success('Your social media support request has been submitted successfully!');
        socialMediaForm.resetFields();
        setSocialMediaModalVisible(false);
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

  // Book Shoot Submit
  const handleVideographySubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.BOOK_SHOOT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: values.applicantName,
          email: values.email,
          phone: values.phone,
          requestedDatetime: values.requestedDatetime,
          format: values.format,
          numberOfGuests: values.numberOfGuests || 1,
          locationPreference: values.locationPreference,
          specialRequirements: values.specialRequirements,
          consentConfirmed: values.consentConfirmed || false
        }),
      });

      if (response.ok) {
        message.success('Your shoot booking has been submitted successfully!');
        videographyForm.resetFields();
        setVideographyModalVisible(false);
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

  // Training Enrollment Submit
  const handleSpeakingSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.TRAINING_ENROLLMENTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          age: values.age,
          country: values.country || 'Rwanda',
          trainingProgram: 'Public Speaking & Presenter Training',
          experienceLevel: values.experienceLevel,
          howDidYouHear: values.howDidYouHear || 'website',
          howDidYouHearOther: values.howDidYouHearOther,
          preferredStartDate: values.preferredStartDate,
          paymentConfirmed: values.paymentConfirmed || false
        }),
      });

      if (response.ok) {
        message.success('Your registration for public speaking training has been submitted!');
        speakingForm.resetFields();
        setSpeakingModalVisible(false);
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

  // Design Enrollment Submit
  const handleDesignSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.TRAINING_ENROLLMENTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          age: values.age,
          country: values.country || 'Rwanda',
          trainingProgram: `Graphic & UI/UX Design - ${values.courseType}`,
          experienceLevel: values.experience || 'beginner',
          howDidYouHear: values.howDidYouHear || 'website',
          preferredStartDate: values.preferredStartDate,
          paymentConfirmed: values.paymentConfirmed || false
        }),
      });

      if (response.ok) {
        message.success('Your enrollment in the design course has been submitted!');
        designForm.resetFields();
        setDesignModalVisible(false);
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

  // Coding Program Submit
  const handleCodingSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.START_CODING, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          country: values.country || 'Rwanda',
          city: values.city || '',
          programmingLanguages: Array.isArray(values.programmingLanguage) 
            ? values.programmingLanguage 
            : [values.programmingLanguage],
          currentSkillLevel: values.experience || 'none',
          portfolioLink: values.portfolioLink,
          projectStatement: values.goals,
          consentConfirmed: values.consentConfirmed || false,
          paymentMethod: values.paymentMethod || 'mobile_money',
          paymentFrequency: values.paymentFrequency || 'monthly'
        }),
      });

      if (response.ok) {
        message.success('Your coding course registration has been submitted!');
        codingForm.resetFields();
        setCodingModalVisible(false);
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

  // Certificate Request Submit
  const handleCertificateSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.CERTIFICATE_REQUESTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          programCompleted: values.programCompleted,
          completionDate: values.completionDate,
          additionalInfo: values.additionalInfo
        }),
      });

      if (response.ok) {
        message.success('Your certificate request has been submitted! We will process it shortly.');
        certificateForm.resetFields();
        setCertificateModalVisible(false);
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
        background: 'linear-gradient(135deg, rgba(31, 153, 237, 0.1), rgba(46, 49, 146, 0.1))',
        padding: '10px 20px 30px',
        marginTop: '70px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <Title level={1} style={{
            color: '#2E3192',
            fontSize: 'clamp(2rem, 3vw, 2.5rem)',
            marginBottom: '20px',
            fontWeight: 700
          }}>
            EMPOWERING YOUTH THROUGH
          </Title>
          <Title level={1} style={{
            color: '#2E3192',
            fontSize: 'clamp(2rem, 3vw, 2.5rem)',
            marginBottom: '20px',
            fontWeight: 700
          }}>
            CREATIVE LEARNING
          </Title>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            <Text style={{ fontSize: '18px', color: '#1F99ED', fontWeight: 600 }}>MEDIA</Text>
            <Text style={{ fontSize: '18px', color: '#000', fontWeight: 600 }}>PROFESSIONAL DEVELOPMENT</Text>
            <Text style={{ fontSize: '18px', color: '#1F99ED', fontWeight: 600 }}>CREATIVE DESIGN</Text>
          </div>

          <Button
            size="large"
            onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#1F99ED',
              color: 'white',
              border: 'none',
              height: '40px',
              padding: '0 50px',
              fontSize: '18px',
              fontWeight: 600,
              borderRadius: '8px'
            }}
          >
            EXPLORE SERVICES
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" style={{ padding: '20px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Service 1: Internship & Professional Training */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '50px',
            marginBottom: '30px',
            alignItems: 'center'
          }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Internship Training"
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </div>
            <div>
              <Title level={2} style={{ color: '#2E3192', marginBottom: '20px' }}>
                INTERNSHIP & PROFESSIONAL TRAINING
              </Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Gain real-world experience through hands-on internships and structured training programs with expert mentorship.
              </Paragraph>
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ display: 'block', color: '#1F99ED', fontWeight: 600, marginBottom: '10px' }}>
                  We Offer:
                </Text>
                <ul style={{ paddingLeft: '20px', color: '#333' }}>
                  <li>Internship opportunities in media, communication, and creative design</li>
                  <li>Industry-level exposure and skill certification upon completion</li>
                  <li>Collaborative projects with professionals and partner organizations</li>
                </ul>
              </div>
              <Button
                size="large"
                onClick={() => setInternshipModalVisible(true)}
                style={{
                  background: '#1F99ED',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Apply for Internship
              </Button>
            </div>
          </div>

          {/* Service 2: Social Media Management (Reversed) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '0px',
            marginBottom: '30px',
            alignItems: 'center'
          }}>
            <div style={{ order: 2 }}>
              <img
                src="/socialmedia.webp"
                alt="Social Media Management"
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </div>
            <div style={{ order: 1 }}>
              <Title level={2} style={{ color: '#2E3192', marginBottom: '20px' }}>
                SOCIAL MEDIA MANAGEMENT & DIGITAL BRANDING
              </Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                We help individuals, startups, and organizations grow their online presence with creative strategies.
              </Paragraph>
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ display: 'block', color: '#1F99ED', fontWeight: 600, marginBottom: '10px' }}>
                  We Offer:
                </Text>
                <ul style={{ paddingLeft: '20px', color: '#333' }}>
                  <li>Social media strategy and campaign planning</li>
                  <li>Content creation and scheduling</li>
                  <li>Branding design and digital marketing consultation</li>
                </ul>
              </div>
              <Button
                size="large"
                onClick={() => setSocialMediaModalVisible(true)}
                style={{
                  background: '#1F99ED',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Get Social Media Support
              </Button>
            </div>
          </div>

          {/* Service 3: Videography & Photography */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '50px',
            marginBottom: '30px',
            alignItems: 'center'
          }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&h=400&fit=crop"
                alt="Videography"
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </div>
            <div>
              <Title level={2} style={{ color: '#2E3192', marginBottom: '20px' }}>
                VIDEOGRAPHY & PHOTOGRAPHY
              </Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Professional-quality content that tells your story.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Capture every moment that matters with professional visuals.
              </Paragraph>
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ display: 'block', color: '#1F99ED', fontWeight: 600, marginBottom: '10px' }}>
                  We Offer:
                </Text>
                <ul style={{ paddingLeft: '20px', color: '#333' }}>
                  <li>Event coverage and storytelling videos</li>
                  <li>Indoor & outdoor photography</li>
                  <li>Editing and post-production</li>
                </ul>
              </div>
              <Button
                size="large"
                onClick={() => setVideographyModalVisible(true)}
                style={{
                  background: '#1F99ED',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Book Shoot
              </Button>
            </div>
          </div>

          {/* Service 4: Public Speaking (Reversed) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '50px',
            marginBottom: '30px',
            alignItems: 'center'
          }}>
            <div style={{ order: 2 }}>
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop"
                alt="Public Speaking"
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </div>
            <div style={{ order: 1 }}>
              <Title level={2} style={{ color: '#2E3192', marginBottom: '20px' }}>
                PUBLIC SPEAKING & PRESENTER TRAINING
              </Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Become the next confident voice of tomorrow.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Master the art of communication, presentation, and stage confidence.
              </Paragraph>
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ display: 'block', color: '#1F99ED', fontWeight: 600, marginBottom: '10px' }}>
                  We Offer:
                </Text>
                <ul style={{ paddingLeft: '20px', color: '#333' }}>
                  <li>Voice projection & audience engagement</li>
                  <li>Presentation and hosting techniques</li>
                  <li>Media interviewing & communication skills</li>
                </ul>
              </div>
              <Button
                size="large"
                onClick={() => setSpeakingModalVisible(true)}
                style={{
                  background: '#1F99ED',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Join The Training
              </Button>
            </div>
          </div>

          {/* Service 5: Graphic Design */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '50px',
            marginBottom: '30px',
            alignItems: 'center'
          }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
                alt="Graphic Design"
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </div>
            <div>
              <Title level={2} style={{ color: '#2E3192', marginBottom: '20px' }}>
                GRAPHIC & UI/UX DESIGN PROFESSIONAL
              </Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                From concept to career — start your design journey here.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Learn the creative and technical skills needed to design impactful digital experiences.
              </Paragraph>
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ display: 'block', color: '#1F99ED', fontWeight: 600, marginBottom: '10px' }}>
                  We Offer:
                </Text>
                <ul style={{ paddingLeft: '20px', color: '#333' }}>
                  <li>UI/UX Design Basics</li>
                  <li>Adobe & Figma tools</li>
                  <li>Wireframing and prototyping</li>
                  <li>Portfolio development & certification</li>
                </ul>
              </div>
              <Button
                size="large"
                onClick={() => setDesignModalVisible(true)}
                style={{
                  background: '#1F99ED',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Enroll Now
              </Button>
            </div>
          </div>

          {/* Service 6: Software Learning (Reversed) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '50px',
            marginBottom: '30px',
            alignItems: 'center'
          }}>
            <div style={{ order: 2 }}>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                alt="Software Development"
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </div>
            <div style={{ order: 1 }}>
              <Title level={2} style={{ color: '#2E3192', marginBottom: '20px' }}>
                SOFTWARE LEARNING & DEVELOPMENT
              </Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Build the future with code — from beginner to developer.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Master essential software tools and programming skills for the digital age.
              </Paragraph>
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ display: 'block', color: '#1F99ED', fontWeight: 600, marginBottom: '10px' }}>
                  We Offer:
                </Text>
                <ul style={{ paddingLeft: '20px', color: '#333' }}>
                  <li>Programming languages (Python, JavaScript, HTML/CSS)</li>
                  <li>Web and app development fundamentals</li>
                  <li>Software tools training (VS Code, Git, GitHub)</li>
                  <li>Database management and backend development</li>
                </ul>
              </div>
              <Button
                size="large"
                onClick={() => setCodingModalVisible(true)}
                style={{
                  background: '#1F99ED',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Start Coding
              </Button>
            </div>
          </div>

          {/* Service 7: Certification */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '50px',
            marginBottom: '20px',
            alignItems: 'center'
          }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&h=400&fit=crop"
                alt="Certification"
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
            </div>
            <div>
              <Title level={2} style={{ color: '#1F99ED', marginBottom: '20px' }}>
                CERTIFICATION & RECOGNITION
              </Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Your talent deserves recognition.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
                Every participant receives a verified digital certificate recognizing their skill development.
              </Paragraph>
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ display: 'block', color: '#1F99ED', fontWeight: 600, marginBottom: '10px' }}>
                  We Offer:
                </Text>
                <ul style={{ paddingLeft: '20px', color: '#333' }}>
                  <li>Digital certificate verification</li>
                  <li>Skill recognition and documentation</li>
                  <li>Portfolio enhancement</li>
                  <li>Professional credibility</li>
                </ul>
              </div>
              <Button
                size="large"
                onClick={() => setCertificateModalVisible(true)}
                style={{
                  background: '#1F99ED',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Request Your Certificate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section style={{ padding: '20px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={2} style={{
            textAlign: 'center',
            color: '#2E3192',
            fontSize: 'clamp(2rem, 3vw, 2.5rem)',
            marginBottom: '30px'
          }}>
            Success Stories
          </Title>

          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            <button
              onClick={handlePrevTestimonial}
              style={{
                position: 'absolute',
                left: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#1F99ED',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <LeftOutlined />
            </button>

            <div style={{
              background: 'linear-gradient(135deg, rgba(31, 153, 237, 0.1), rgba(46, 49, 146, 0.1))',
              padding: '60px 40px',
              borderRadius: '16px',
              textAlign: 'center',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Paragraph style={{
                fontSize: '20px',
                lineHeight: '1.8',
                color: '#333',
                fontStyle: 'italic',
                marginBottom: '30px'
              }}>
                "{testimonials[currentTestimonial].quote}"
              </Paragraph>
              <Text style={{
                display: 'block',
                fontSize: '16px',
                color: '#666'
              }}>
                {testimonials[currentTestimonial].role}
              </Text>
            </div>

            <button
              onClick={handleNextTestimonial}
              style={{
                position: 'absolute',
                right: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#1F99ED',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <RightOutlined />
            </button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '40px'
          }}>
            {testimonials.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: index === currentTestimonial ? '40px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  background: index === currentTestimonial ? '#1F99ED' : '#ccc',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      {/* Internship Modal */}
      <Modal
        title={<Title level={3} style={{ color: '#1F99ED', marginBottom: 0 }}>Apply for Internship</Title>}
        open={internshipModalVisible}
        onCancel={() => setInternshipModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setInternshipModalVisible(false)} size="large">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => internshipForm.submit()}
            style={{ background: '#1F99ED', borderColor: '#1F99ED' }}
          >
            Submit Application
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <Form
            form={internshipForm}
            layout="vertical"
            onFinish={handleInternshipSubmit}
          >
            <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter your full name' }]}>
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+250788123456" size="large" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please enter your country' }]}>
                  <Input placeholder="Enter country" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter your city' }]}>
                  <Input placeholder="Enter city" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="educationLevel" label="Education Level" rules={[{ required: true, message: 'Please select education level' }]}>
              <Select placeholder="Select education level" size="large">
                <Option value="high_school">High School</Option>
                <Option value="diploma">Diploma</Option>
                <Option value="bachelors">Bachelor's Degree</Option>
                <Option value="masters">Master's Degree</Option>
                <Option value="phd">PhD</Option>
              </Select>
            </Form.Item>
            <Form.Item name="departmentInterest" label="Department Interest" rules={[{ required: true, message: 'Please enter department' }]}>
              <Input placeholder="e.g., Social Media Marketing, Design, etc." size="large" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="availabilityStart" label="Available From" rules={[{ required: true, message: 'Please select start date' }]}>
                  <Input type="date" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="availabilityEnd" label="Available To" rules={[{ required: true, message: 'Please select end date' }]}>
                  <Input type="date" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item 
              name="statement" 
              label="Statement (Why do you want an internship at ONEFOCUS?)" 
              rules={[
                { required: true, message: 'Please enter your statement' },
                { min: 50, message: 'Statement must be at least 50 characters' }
              ]}
            >
              <TextArea rows={4} placeholder="Tell us why you want to join ONEFOCUS (minimum 50 characters)..." showCount maxLength={2000} />
            </Form.Item>
            <Form.Item 
              name="consentConfirmed" 
              valuePropName="checked"
              rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')) }]}
            >
              <Checkbox>I consent to the terms and conditions</Checkbox>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Social Media Modal */}
      <Modal
        title={<Title level={3} style={{ color: '#1F99ED', marginBottom: 0 }}>Get Social Media Support</Title>}
        open={socialMediaModalVisible}
        onCancel={() => setSocialMediaModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setSocialMediaModalVisible(false)} size="large">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => socialMediaForm.submit()}
            style={{ background: '#1F99ED', borderColor: '#1F99ED' }}
          >
            Submit Request
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <Form
            form={socialMediaForm}
            layout="vertical"
            onFinish={handleSocialMediaSubmit}
          >
            <Form.Item name="applicantName" label="Applicant Name" rules={[{ required: true, message: 'Please enter your name' }]}>
              <Input prefix={<UserOutlined />} placeholder="Enter your name" size="large" />
            </Form.Item>
            <Form.Item name="organization" label="Organization/Brand Name">
              <Input placeholder="Your organization or brand (optional)" size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+250788123456" size="large" />
            </Form.Item>
            <Form.Item 
              name="platformsRequested" 
              label="Platforms Needed" 
              rules={[{ required: true, message: 'Please select at least one platform' }]}
            >
              <Select mode="multiple" placeholder="Select platforms" size="large">
                <Option value="instagram">Instagram</Option>
                <Option value="tiktok">TikTok</Option>
                <Option value="youtube">YouTube</Option>
                <Option value="linkedin">LinkedIn</Option>
                <Option value="facebook">Facebook</Option>
                <Option value="twitter">Twitter/X</Option>
              </Select>
            </Form.Item>
            
            <Text strong style={{ display: 'block', marginBottom: '12px', color: '#1F99ED' }}>
              Social Media Handles (Provide at least one)
            </Text>
            
            <Form.Item name="instagramHandle" label="Instagram Handle">
              <Input placeholder="@yourusername" size="large" />
            </Form.Item>
            
            <Form.Item name="tiktokHandle" label="TikTok Handle">
              <Input placeholder="@yourusername" size="large" />
            </Form.Item>
            
            <Form.Item name="youtubeHandle" label="YouTube Channel">
              <Input placeholder="youtube.com/c/yourchannel" size="large" />
            </Form.Item>
            
            <Form.Item name="linkedinHandle" label="LinkedIn Profile">
              <Input placeholder="linkedin.com/in/yourprofile" size="large" />
            </Form.Item>
            
            <Form.Item name="facebookHandle" label="Facebook Page">
              <Input placeholder="facebook.com/yourpage" size="large" />
            </Form.Item>
            
            <Form.Item name="twitterHandle" label="Twitter/X Handle">
              <Input placeholder="@yourusername" size="large" />
            </Form.Item>
            
            <Form.Item 
              name="supportDescription" 
              label="Support Description" 
              rules={[{ required: true, message: 'Please describe what support you need' }]}
            >
              <TextArea rows={3} placeholder="Describe the support you need..." showCount maxLength={2000} />
            </Form.Item>
            <Form.Item 
              name="goalsKPIs" 
              label="Goals & KPIs" 
              rules={[{ required: true, message: 'Please describe your goals' }]}
            >
              <TextArea rows={3} placeholder="What are your social media goals and KPIs?..." showCount maxLength={1000} />
            </Form.Item>
            <Form.Item name="budget" label="Budget (Optional)">
              <Input placeholder="e.g., $500-$1000 per month" size="large" />
            </Form.Item>
            <Form.Item 
              name="consentConfirmed" 
              valuePropName="checked"
              rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')) }]}
            >
              <Checkbox>I consent to the terms and conditions</Checkbox>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Videography Modal */}
      <Modal
        title={<Title level={3} style={{ color: '#1F99ED', marginBottom: 0 }}>Book a Shoot</Title>}
        open={videographyModalVisible}
        onCancel={() => setVideographyModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setVideographyModalVisible(false)} size="large">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => videographyForm.submit()}
            style={{ background: '#1F99ED', borderColor: '#1F99ED' }}
          >
            Book Now
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <Form
            form={videographyForm}
            layout="vertical"
            onFinish={handleVideographySubmit}
          >
            <Form.Item name="applicantName" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+250788123456" size="large" />
            </Form.Item>
            <Form.Item name="requestedDatetime" label="Requested Date & Time" rules={[{ required: true, message: 'Please select date and time' }]}>
              <Input type="datetime-local" size="large" />
            </Form.Item>
            <Form.Item name="format" label="Shoot Format" rules={[{ required: true, message: 'Please select format' }]}>
              <Select placeholder="Select format" size="large">
                <Option value="podcast">Podcast</Option>
                <Option value="video">Video</Option>
                <Option value="interview">Interview</Option>
              </Select>
            </Form.Item>
            <Form.Item name="numberOfGuests" label="Number of Guests" rules={[{ required: true, message: 'Please enter number' }]}>
              <InputNumber min={1} max={20} placeholder="Number of guests" size="large" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="locationPreference" label="Location Preference" rules={[{ required: true, message: 'Please enter location' }]}>
              <Input placeholder="e.g., ONEFOCUS Studio, Kigali" size="large" />
            </Form.Item>
            <Form.Item name="specialRequirements" label="Special Requirements">
              <TextArea rows={3} placeholder="Any special requirements? (optional)" />
            </Form.Item>
            <Form.Item 
              name="consentConfirmed" 
              valuePropName="checked"
              rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree')) }]}
            >
              <Checkbox>I agree to arrive on time and follow studio guidelines</Checkbox>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Speaking Training Modal */}
      <Modal
        title={<Title level={3} style={{ color: '#1F99ED', marginBottom: 0 }}>Join Speaking Training</Title>}
        open={speakingModalVisible}
        onCancel={() => setSpeakingModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setSpeakingModalVisible(false)} size="large">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => speakingForm.submit()}
            style={{ background: '#1F99ED', borderColor: '#1F99ED' }}
          >
            Register
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <Form
            form={speakingForm}
            layout="vertical"
            onFinish={handleSpeakingSubmit}
            initialValues={{ country: 'Rwanda' }}
          >
            <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+250788123456" size="large" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="age" label="Age">
                  <InputNumber min={13} max={100} placeholder="Your age" size="large" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="country" label="Country">
                  <Input placeholder="Your country" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="experienceLevel" label="Experience Level" rules={[{ required: true, message: 'Please select level' }]}>
              <Select placeholder="Select level" size="large">
                <Option value="beginner">Beginner</Option>
                <Option value="intermediate">Intermediate</Option>
                <Option value="advanced">Advanced</Option>
              </Select>
            </Form.Item>
            <Form.Item name="howDidYouHear" label="How did you hear about us?">
              <Select placeholder="Select option" size="large">
                <Option value="social_media">Social Media</Option>
                <Option value="friend_referral">Friend Referral</Option>
                <Option value="website">Website</Option>
                <Option value="google_search">Google Search</Option>
                <Option value="event">Event</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="preferredStartDate" label="Preferred Start Date" rules={[{ required: true, message: 'Please select date' }]}>
              <Input type="date" size="large" />
            </Form.Item>
            <Form.Item 
              name="paymentConfirmed" 
              valuePropName="checked"
              rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Please confirm payment')) }]}
            >
              <Checkbox>I confirm I'm ready to proceed with payment</Checkbox>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Design Training Modal */}
      <Modal
        title={<Title level={3} style={{ color: '#1F99ED', marginBottom: 0 }}>Enroll in Design Course</Title>}
        open={designModalVisible}
        onCancel={() => setDesignModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setDesignModalVisible(false)} size="large">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => designForm.submit()}
            style={{ background: '#1F99ED', borderColor: '#1F99ED' }}
          >
            Enroll Now
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <Form
            form={designForm}
            layout="vertical"
            onFinish={handleDesignSubmit}
            initialValues={{ country: 'Rwanda' }}
          >
            <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+250788123456" size="large" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="age" label="Age">
                  <InputNumber min={13} max={100} placeholder="Your age" size="large" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="country" label="Country">
                  <Input placeholder="Your country" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="courseType" label="Course Interest" rules={[{ required: true, message: 'Please select course' }]}>
              <Select placeholder="Select course" size="large">
                <Option value="UI/UX Design">UI/UX Design</Option>
                <Option value="Graphic Design">Graphic Design</Option>
                <Option value="Both">Both</Option>
              </Select>
            </Form.Item>
            <Form.Item name="experience" label="Design Experience">
              <Select placeholder="Select experience level" size="large">
                <Option value="none">No Experience</Option>
                <Option value="beginner">Beginner</Option>
                <Option value="intermediate">Intermediate</Option>
              </Select>
            </Form.Item>
            <Form.Item name="howDidYouHear" label="How did you hear about us?">
              <Select placeholder="Select option" size="large">
                <Option value="social_media">Social Media</Option>
                <Option value="friend_referral">Friend Referral</Option>
                <Option value="website">Website</Option>
                <Option value="google_search">Google Search</Option>
                <Option value="event">Event</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="preferredStartDate" label="Preferred Start Date" rules={[{ required: true, message: 'Please select date' }]}>
              <Input type="date" size="large" />
            </Form.Item>
            <Form.Item 
              name="paymentConfirmed" 
              valuePropName="checked"
              rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Please confirm payment')) }]}
            >
              <Checkbox>I confirm I'm ready to proceed with payment</Checkbox>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Coding Training Modal */}
      <Modal
        title={<Title level={3} style={{ color: '#1F99ED', marginBottom: 0 }}>Start Coding Journey</Title>}
        open={codingModalVisible}
        onCancel={() => setCodingModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setCodingModalVisible(false)} size="large">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => codingForm.submit()}
            style={{ background: '#1F99ED', borderColor: '#1F99ED' }}
          >
            Register
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <Form
            form={codingForm}
            layout="vertical"
            onFinish={handleCodingSubmit}
            initialValues={{ country: 'Rwanda' }}
          >
            <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+250788123456" size="large" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="country" label="Country">
                  <Input placeholder="Your country" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="city" label="City">
                  <Input placeholder="Your city" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item 
              name="programmingLanguage" 
              label="Programming Language Interest" 
              rules={[{ required: true, message: 'Please select language(s)' }]}
            >
              <Select mode="multiple" placeholder="Select language(s)" size="large">
                <Option value="Python">Python</Option>
                <Option value="JavaScript">JavaScript</Option>
                <Option value="HTML/CSS">HTML/CSS</Option>
                <Option value="React">React</Option>
                <Option value="Node.js">Node.js</Option>
              </Select>
            </Form.Item>
            <Form.Item name="experience" label="Coding Experience">
              <Select placeholder="Select experience level" size="large">
                <Option value="none">Complete Beginner</Option>
                <Option value="beginner">Beginner</Option>
                <Option value="intermediate">Some Experience</Option>
              </Select>
            </Form.Item>
            <Form.Item name="portfolioLink" label="Portfolio/GitHub Link (Optional)">
              <Input placeholder="https://github.com/yourusername" size="large" />
            </Form.Item>
            <Form.Item 
              name="goals" 
              label="What do you want to build?" 
              rules={[
                { required: true, message: 'Please describe your goals' },
                { min: 50, message: 'Please provide at least 50 characters' }
              ]}
            >
              <TextArea rows={3} placeholder="Tell us about your coding goals..." showCount maxLength={2000} />
            </Form.Item>
            <Form.Item name="paymentMethod" label="Payment Method">
              <Select placeholder="Select payment method" size="large">
                <Option value="mobile_money">Mobile Money</Option>
                <Option value="bank_transfer">Bank Transfer</Option>
                <Option value="credit_card">Credit Card</Option>
                <Option value="cash">Cash</Option>
              </Select>
            </Form.Item>
            <Form.Item name="paymentFrequency" label="Payment Frequency">
              <Select placeholder="Select frequency" size="large">
                <Option value="monthly">Monthly</Option>
                <Option value="per_module">Per Module</Option>
              </Select>
            </Form.Item>
            <Form.Item 
              name="consentConfirmed" 
              valuePropName="checked"
              rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree')) }]}
            >
              <Checkbox>I consent to the terms and conditions</Checkbox>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Certificate Request Modal */}
      <Modal
        title={<Title level={3} style={{ color: '#1F99ED', marginBottom: 0 }}>Request Certificate</Title>}
        open={certificateModalVisible}
        onCancel={() => setCertificateModalVisible(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setCertificateModalVisible(false)} size="large">
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => certificateForm.submit()}
            style={{ background: '#1F99ED', borderColor: '#1F99ED' }}
          >
            Request Certificate
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <Form
            form={certificateForm}
            layout="vertical"
            onFinish={handleCertificateSubmit}
          >
            <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter your full name' }]}>
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+250788123456" size="large" />
            </Form.Item>
            <Form.Item name="programCompleted" label="Program Completed" rules={[{ required: true, message: 'Please select program' }]}>
              <Select placeholder="Select program" size="large">
                <Option value="internship">Internship Program</Option>
                <Option value="design">Design Course</Option>
                <Option value="coding">Software Development</Option>
                <Option value="speaking">Public Speaking Training</Option>
                <Option value="videography">Videography Workshop</Option>
                <Option value="social_media">Social Media Management</Option>
              </Select>
            </Form.Item>
            <Form.Item name="completionDate" label="Completion Date">
              <Input type="date" size="large" />
            </Form.Item>
            <Form.Item name="additionalInfo" label="Additional Information">
              <TextArea rows={3} placeholder="Any additional details..." />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default ServicesPage;