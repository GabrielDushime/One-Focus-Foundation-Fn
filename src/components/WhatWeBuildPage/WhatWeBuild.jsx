import { useState, useRef } from 'react';
import { Button, Modal, Form, Input, Select, Checkbox, DatePicker, Row, Col, Divider, Typography, message } from 'antd';
import { API_ENDPOINTS } from '../../config/api';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const WhatWeBuildPage = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [basicForm] = Form.useForm();
  const [premiumForm] = Form.useForm();
  const [corporateForm] = Form.useForm();

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [membershipType, setMembershipType] = useState('');

  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Video sections 
  const videoSections = [
    {
      title: "A Talent Discovery & Mentorship Ecosystem",
      description: "We provide structured programs that identify talents in public speaking, digital design, entrepreneurship, media, and leadership. Through our initiatives such as the Voice of Tomorrow Podcast, Younger Talent Summit, and Talent Bootcamps, we are building a pipeline of young changemakers.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      bgColor: "#1F99ED"
    },
    {
      title: "A Digital Learning & Certification Hub",
      description: "Through our Premium Certification Programs, we are equipping young people with marketable, future-ready skills in digital content creation, leadership, branding, and career coaching. We are creating a generation of digitally fluent creators and professionals.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      bgColor: "#2E3192"
    },
    {
      title: "A Collaborative African Youth Network",
      description: "Our monthly Hybrid Meet Conference global outreach sessions connect youth across Rwanda, Africa, and the diaspora. We are building a cross-border community of dreamers, advocates, and peer mentors to collaborate and share ideas.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      bgColor: "#1F99ED"
    },
    {
      title: "AN EMPOWERMENT MEDIA CHANNEL",
      description: "Via our Voice of Tomorrow Podcast and storytelling platforms, we showcase the talents, voices, and solutions of young Africans to global audiences, giving them visibility, connectivity, and sustainable impact.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      bgColor: "#2E3192"
    }
  ];

  // Problem areas data
  const problemAreas = [
    {
      number: "01",
      title: "Limited Access to Mentorship",
      description: "We offer mentorship through our podcast sessions, guest speaker programs, and one-on-one coaching opportunities."
    },
    {
      number: "02",
      title: "Lack of Practical, Career-Ready Skills",
      description: "Our certification programs deliver hands-on skills in creative industries, leadership, entrepreneurship, and public speaking many more."
    },
    {
      number: "03",
      title: "Disconnected Youth Communities",
      description: "We foster collaboration and shared learning across borders through virtual meetups, workshops, and forums."
    },
    {
      number: "04",
      title: "Underrepresentation of Youth Talent",
      description: "Through the Voice of Tomorrow and outreach campaigns, we amplify youth stories and talents on local and global stages."
    }
  ];

  const generatePDF = (data, type) => {
    const doc = document.createElement('div');
    doc.style.fontFamily = 'Arial, sans-serif';
    doc.style.padding = '40px';
    doc.style.maxWidth = '800px';
    doc.style.margin = '0 auto';
    doc.style.backgroundColor = 'white';

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    let content = `
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="/logo.svg" alt="ONEFOCUS Logo" style="width: 120px; height: auto; margin-bottom: 20px;" />
        <h1 style="color: #2E3192; margin-bottom: 10px;">ONEFOCUS</h1>
        <h2 style="color: #1F99ED; margin-top: 0;">${type} Application</h2>
        <p style="color: #666;">Application Submitted: ${formatDate(data.signatureDate)}</p>
      </div>
      <div style="border: 2px solid #2E3192; padding: 20px; border-radius: 8px;">
        <h3 style="color: #2E3192; border-bottom: 2px solid #1F99ED; padding-bottom: 10px;">Personal Information</h3>
    `;

    if (type === 'Corporate Sponsorship') {
      content += `
        <p><strong>Organization Name:</strong> ${data.fullNameOrganization}</p>
        <p><strong>Your Role:</strong> ${data.occupationRole}</p>
        <p><strong>Organization Size:</strong> ${data.organizationSize}</p>
      `;
    } else {
      content += `
        <p><strong>Name:</strong> ${data.firstName} ${data.secondName}</p>
        <p><strong>Occupation:</strong> ${data.occupationRole}</p>
      `;
    }

    content += `
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phoneNumber}</p>
      <p><strong>Location:</strong> ${data.countryCity}</p>
      ${data.websiteSocialMedia ? `<p><strong>Website/Social Media:</strong> ${data.websiteSocialMedia}</p>` : ''}
    `;

    if (type === 'Basic Membership') {
      content += `
        <h3 style="color: #2E3192; border-bottom: 2px solid #1F99ED; padding-bottom: 10px; margin-top: 20px;">Membership Details</h3>
        <p><strong>Why Join ONEFOCUS:</strong></p>
        <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${data.whyJoinOnefocus}</p>
        <p><strong>Areas of Interest:</strong> ${data.areasOfInterest.join(', ')}</p>
      `;
    }

    if (type === 'Premium Membership') {
      content += `
        <h3 style="color: #2E3192; border-bottom: 2px solid #1F99ED; padding-bottom: 10px; margin-top: 20px;">Premium Details</h3>
        <p><strong>Career Growth Area:</strong> ${data.careerGrowthArea}</p>
        <p><strong>Monthly Contribution:</strong> ${data.monthlyContribution} RWF</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        <p><strong>Payment Frequency:</strong> ${data.contributionFrequency}</p>
      `;
    }

    if (type === 'Corporate Sponsorship') {
      content += `
        <h3 style="color: #2E3192; border-bottom: 2px solid #1F99ED; padding-bottom: 10px; margin-top: 20px;">Sponsorship Details</h3>
        <p><strong>Focus Areas:</strong> ${data.sponsorshipFocus.join(', ')}</p>
        <p><strong>Package:</strong> ${data.sponsorshipPackage}</p>
        ${data.customPackageDetails ? `<p><strong>Custom Details:</strong> ${data.customPackageDetails}</p>` : ''}
        <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        <p><strong>Payment Frequency:</strong> ${data.contributionFrequency}</p>
      `;
    }

    content += `
        <h3 style="color: #2E3192; border-bottom: 2px solid #1F99ED; padding-bottom: 10px; margin-top: 20px;">Agreement</h3>
        <p>✓ Information accuracy confirmed</p>
        <p>✓ Terms and conditions accepted</p>
        <p><strong>Digital Signature:</strong> ${data.signature}</p>
        <p><strong>Date:</strong> ${formatDate(data.signatureDate)}</p>
      </div>
      <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
        <p>This is Auto-generated document from ONEFOCUS</p>
        <p>For inquiries, please contact us through our official channels</p>
      </div>
    `;

    doc.innerHTML = content;
    return doc;
  };

  const downloadApplication = () => {
    const pdfContent = generatePDF(submittedData, membershipType);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${membershipType} Application</title>
        <style>
          body { font-family: Arial, sans-serif; }
          @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        ${pdfContent.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ONEFOCUS_${membershipType.replace(/\s+/g, '_')}_Application.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    message.success('Application downloaded successfully!');
  };

  // View application
  const viewApplication = () => {
    const pdfContent = generatePDF(submittedData, membershipType);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${membershipType} Application</title>
        <style>
          body { font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        ${pdfContent.innerHTML}
      </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  // Handle video hover
  const handleVideoHover = (index, isHovering) => {
    const video = videoRefs[index].current;
    if (video) {
      if (isHovering) {
        video.play().catch(err => console.log('Video play failed:', err));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  // Basic Membership Submit
  const handleBasicSubmit = async (values) => {
    setLoading(true);
    try {
      const submissionData = {
        ...values,
        signatureDate: values.signatureDate.toISOString(),
      };

      const response = await fetch(API_ENDPOINTS.BASIC_MEMBERSHIP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Check for email already exists error
        if (errorData.message && errorData.message.toLowerCase().includes('email')) {
          message.error('This email is already registered. Please use a different email address.');
        } else {
          throw new Error(errorData.message || 'Submission failed');
        }
        return;
      }
      
      const result = await response.json();
      
      // Store data and show success modal
      setSubmittedData(submissionData);
      setMembershipType('Basic Membership');
      setBasicModalOpen(false);
      basicForm.resetFields();
      setSuccessModalOpen(true);
      
    } catch (error) {
      message.error(error.message || 'Failed to submit application. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Premium Membership Submit
  const handlePremiumSubmit = async (values) => {
    setLoading(true);
    try {
      const submissionData = {
        ...values,
        signatureDate: values.signatureDate.toISOString(),
      };

      const response = await fetch(API_ENDPOINTS.PREMIUM_MEMBERSHIP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Check for email already exists error
        if (errorData.message && errorData.message.toLowerCase().includes('email')) {
          message.error('This email is already registered. Please use a different email address.');
        } else {
          throw new Error(errorData.message || 'Submission failed');
        }
        return;
      }
      
      const result = await response.json();
      
      // Store data and show success modal
      setSubmittedData(submissionData);
      setMembershipType('Premium Membership');
      setPremiumModalOpen(false);
      premiumForm.resetFields();
      setSuccessModalOpen(true);
      
    } catch (error) {
      message.error(error.message || 'Failed to submit application. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Corporate Sponsor Submit
  const handleCorporateSubmit = async (values) => {
    setLoading(true);
    try {
      const submissionData = {
        ...values,
        signatureDate: values.signatureDate.toISOString(),
      };

      const response = await fetch(API_ENDPOINTS.CORPORATE_SPONSOR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Check for email already exists error
        if (errorData.message && errorData.message.toLowerCase().includes('email')) {
          message.error('This email is already registered. Please use a different email address.');
        } else {
          throw new Error(errorData.message || 'Submission failed');
        }
        return;
      }
      
      const result = await response.json();
      
      // Store data and show success modal
      setSubmittedData(submissionData);
      setMembershipType('Corporate Sponsorship');
      setCorporateModalOpen(false);
      corporateForm.resetFields();
      setSuccessModalOpen(true);
      
    } catch (error) {
      message.error(error.message || 'Failed to submit application. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* Section 1: Hero - Empowering Dreams */}
      <section style={{ 
        background: '#ffffff',
        padding: '60px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        marginTop:'20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <Title level={1} style={{ 
              color: '#2E3192', 
              fontSize: 'clamp(1rem, 2.5vw, 3rem)', 
              marginBottom: '30px', 
              fontWeight: 700,
              lineHeight: 1.2 
            }}>
              Empowering Dreams,<br />Shaping Futures
            </Title>
            <Paragraph style={{ 
              color: '#000', 
              fontSize: 'clamp(1rem, 1vw, 1.1rem)', 
              marginBottom: '30px', 
              lineHeight: '1.8' 
            }}>
              As ONEFOCUS, we are building a transformational platform for discovering, nurturing, 
              and empowering the creative and leadership potential of youth across Africa and 
              globally. We are positioned at the intersection of talent development, digital 
              empowerment, and youth innovation.
            </Paragraph>
            <div style={{
              background: '#f0f8ff',
              padding: '20px 25px',
              borderRadius: '12px',
              borderLeft: '4px solid #1F99ED'
            }}>
              <Text style={{ 
                color: '#1F99ED', 
                fontSize: 'clamp(0.95rem, 1vw, 1.05rem)', 
                fontWeight: 500, 
                lineHeight: '1.7',
                display: 'block'
              }}>
                To become Africa's leading platform for nurturing young talent, connecting youth 
                across borders, and equipping them to create, lead, and transform their communities.
              </Text>
            </div>
          </div>
          
          <div style={{ 
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
              alt="Youth collaboration"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {/* Problem Statement */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Title level={2} style={{ 
            color: '#2E3192', 
            fontSize: 'clamp(1rem, 0.5vw, 2rem)', 
            marginBottom: '30px',
            fontWeight: 700,
            lineHeight: 1.5,
          
          }}>
            The ONEFOCUS aims to address the lack of platforms and opportunities for young 
            talented children Across Rwanda and African regions to showcase and develop their abilities.
          </Title>
          <Title level={3} style={{ 
            color: '#000', 
            fontSize: 'clamp(1rem, 0.5vw, 1.5rem)', 
            marginTop: '5px',
            fontWeight: 600,
            lineHeight: 1
          }}>
            Many gifted children, particularly those in underserved areas, lack of resources and 
            support, leading to untapped potential.
          </Title>
        </div>
      </section>

      {/* Section 2: Video Highlights - Four Pillars */}
      <section style={{ 
        padding: '0px 20px', 
        maxWidth: '1600px', 
        margin: '0 auto',
        background: '#f8f9fa'
      }}>
        <Title level={2} style={{ 
          textAlign: 'center', 
          marginBottom: '10px', 
          color: '#1F99ED',
          fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)'
        }}>
          Our Four Pillars
        </Title>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {videoSections.map((section, index) => (
            <div 
              key={index}
              style={{
                background: 'white',
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 153, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ 
                position: 'relative', 
                paddingTop: '56.25%', 
                background: section.bgColor 
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  src={section.videoUrl}
                  title={section.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Title level={4} style={{ 
                  color: '#2E3192', 
                  
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  fontWeight: 600,
                  lineHeight: 1.3
                }}>
                  {section.title}
                </Title>
                <Text style={{ 
                  color: '#666', 
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', 
                  lineHeight: '1.6',
                  flex: 1
                }}>
                  {section.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: What We Are Solving */}
      <section style={{ 
        padding: '20px 20px',
        background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop) center/cover',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(2px)'
        }} />
        
        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={2} style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            color: '#2E3192',
            fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
            fontWeight: 700
          }}>
            What We Are Solving
          </Title>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '10px' 
          }}>
            {problemAreas.map((area, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Title level={1} style={{ 
                  color: '#2E3192', 
                  fontSize: 'clamp(3rem, 8vw, 4rem)', 
                  marginBottom: '15px',
                  fontWeight: 700,
                  opacity: 0.6
                }}>
                  {area.number}
                </Title>
                <Title level={3} style={{ 
                  color: '#1F99ED', 
                  fontSize: 'clamp(1.1rem, 1vw, 1.3rem)', 
                  marginBottom: '15px',
                  fontWeight: 600,
                  lineHeight: 1.1
                }}>
                  {area.title}
                </Title>
                <Text style={{ 
                  color: '#333', 
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', 
                  lineHeight: '1.7',
                  display: 'block'
                }}>
                  {area.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Join Our Community */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '20px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={2} style={{ 
            textAlign: 'center', 
            marginBottom: '15px', 
            color: '#1F99ED',
            fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)'
          }}>
            JOIN OUR COMMUNITY
          </Title>
          <Paragraph style={{ 
            textAlign: 'center', 
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', 
            color: '#000', 
            marginBottom: '30px',
            fontWeight: 500
          }}>
            At ONEFOCUS, membership is more than just joining it's becoming part of a movement to 
            empower youth across Africa and globally.
          </Paragraph>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '10px' 
          }}>
            {/* Basic Membership Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '10px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop"
                  alt="Basic Membership"
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '12px 12px 0 0' 
                  }}
                />
              </div>
              <Title level={3} style={{ 
                color: '#2E3192', 
                fontSize: 'clamp(1.3rem, 2vw, 1.5rem)'
              }}>
                BASIC MEMBERSHIP
              </Title>
              <Text style={{ 
                color: '#666', 
                display: 'block', 
                
                lineHeight: '1.6',
                flex: 1,
                
                fontSize: 'clamp(0.9rem, 1vw, 1rem)'
              }}>
                Access to exclusive workshops, mentorship programs, networking events, Priority access to Voice of 
                Tomorrow Podcast episodes and early registration for events.
              </Text>
              <Button 
                type="primary" 
                size="large"
                onClick={() => setBasicModalOpen(true)}
                style={{
                  width: '100%',
                  height: '50px',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
                  border: 'none',
                  fontWeight: 600,
                 
                }}
              >
                Apply Now
              </Button>
            </div>

            {/* Premium Membership Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '10px',
              boxShadow: '0 8px 30px rgba(31, 153, 237, 0.3)',
              textAlign: 'center',
              border: '3px solid #1F99ED',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#000',
                color: 'white',
                padding: '5px 20px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 700
              }}>
                100% PREMIUM QUALITY
              </div>
              <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Premium Membership"
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                   borderRadius: '12px 12px 0 0' 
                  }}
                />
              </div>
              <Title level={3} style={{ 
                color: '#2E3192', 
                fontSize: 'clamp(1.3rem, 2vw, 1.5rem)'
              }}>
                PREMIUM
              </Title>
              <Text style={{ 
                color: '#666', 
                display: 'block', 
                marginBottom: '20px', 
                lineHeight: '1.6',
                flex: 1,
                fontSize: 'clamp(0.9rem, 1vw, 1rem)'
              }}>
                Basic membership, family member and saving income
              </Text>
              <Button 
                type="primary" 
                size="large"
                onClick={() => setPremiumModalOpen(true)}
                style={{
                  width: '100%',
                  height: '50px',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  background: '#1F99ED',
                  border: 'none',
                  fontWeight: 600
                }}
              >
                Apply Now
              </Button>
            </div>

            {/* Corporate Sponsor Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '10px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop"
                  alt="Corporate Sponsors"
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '12px 12px 0 0' 
                  }}
                />
              </div>
              <Title level={3} style={{ 
                color: '#2E3192', 
          
                fontSize: 'clamp(1.3rem, 2vw, 1.5rem)'
              }}>
                CORPORATE SPONSORS
              </Title>
              <Text style={{ 
                color: '#666', 
                display: 'block', 
                marginBottom: '20px', 
                lineHeight: '1.6',
                flex: 1,
                fontSize: 'clamp(0.9rem, 1vw, 1rem)'
              }}>
                Opportunities for branding, Sponsorship recognition, Participation in foundation projects.
              </Text>
              <Button 
                type="primary" 
                size="large"
                onClick={() => setCorporateModalOpen(true)}
                style={{
                  width: '100%',
                  height: '50px',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  background: 'linear-gradient(135deg, #2E3192, #1F99ED)',
                  border: 'none',
                  fontWeight: 600
                }}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Membership Modal */}
      <Modal
        title={<Title level={3} style={{ margin: 0 }}>Basic Membership Application</Title>}
        open={basicModalOpen}
        onCancel={() => setBasicModalOpen(false)}
        footer={null}
        width={800}
        className="onefocus-modal"
        destroyOnClose
      >
        <Form form={basicForm} onFinish={handleBasicSubmit} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
                <Input placeholder="John" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="secondName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="john.doe@example.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                <Input placeholder="+250788123456" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="countryCity" label="Country / City" rules={[{ required: true, message: 'Please enter your location' }]}>
                <Input placeholder="Kigali, Rwanda" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="occupationRole" label="Occupation / Role" rules={[{ required: true, message: 'Please enter your occupation' }]}>
                <Input placeholder="Software Developer" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="websiteSocialMedia" label="Website / Social Media (Optional)">
            <Input placeholder="https://linkedin.com/in/johndoe" />
          </Form.Item>

          <Form.Item 
            name="whyJoinOnefocus" 
            label="Why do you want to join ONEFOCUS?" 
            rules={[{ required: true, message: 'Please share your motivation' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Share your motivation..."
              showCount
              maxLength={1000}
            />
          </Form.Item>

          <Form.Item 
            name="areasOfInterest" 
            label="Areas of Interest" 
            rules={[{ required: true, message: 'Please select at least one area' }]}
          >
            <Select mode="multiple" placeholder="Select your interests">
              <Option value="workshops">Workshops & Training</Option>
              <Option value="mentorship">Mentorship Programs</Option>
              <Option value="voice_of_tomorrow_podcast">Voice of Tomorrow Podcast</Option>
              <Option value="networking_events">Networking Events</Option>
            </Select>
          </Form.Item>

          <Divider>Agreement</Divider>

          <Form.Item 
            name="confirmAccuracy" 
            valuePropName="checked"
            rules={[{ 
              required: true, 
              transform: value => value || undefined,
              type: 'boolean',
              message: 'You must confirm accuracy' 
            }]}
          >
            <Checkbox>I confirm that all information provided is accurate</Checkbox>
          </Form.Item>

          <Form.Item 
            name="agreeToTerms" 
            valuePropName="checked"
            rules={[{ 
              required: true,
              transform: value => value || undefined,
              type: 'boolean',
              message: 'You must agree to terms' 
            }]}
          >
            <Checkbox>I agree to ONEFOCUS rules, guidelines, and membership terms</Checkbox>
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="signature" label="Digital Signature" rules={[{ required: true, message: 'Please enter your full name' }]}>
                <Input placeholder="Type your full name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="signatureDate" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Premium Membership Modal */}
      <Modal
        title={<Title level={3} style={{ margin: 0 }}>Premium Membership Application</Title>}
        open={premiumModalOpen}
        onCancel={() => setPremiumModalOpen(false)}
        footer={null}
        width={800}
        className="onefocus-modal"
        destroyOnClose
      >
        <Form form={premiumForm} onFinish={handlePremiumSubmit} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
                <Input placeholder="Jane" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="secondName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
                <Input placeholder="Smith" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="jane.smith@example.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                <Input placeholder="+250788123456" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="countryCity" label="Country / City" rules={[{ required: true, message: 'Please enter your location' }]}>
                <Input placeholder="Kigali, Rwanda" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="occupationRole" label="Occupation / Role" rules={[{ required: true, message: 'Please enter your occupation' }]}>
                <Input placeholder="Business Owner" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="websiteSocialMedia" label="Website / Social Media (Optional)">
            <Input placeholder="https://instagram.com/janesmith" />
          </Form.Item>

          <Form.Item name="careerGrowthArea" label="Career Growth Area" rules={[{ required: true, message: 'Please select your focus area' }]}>
            <Select placeholder="Select your focus area">
              <Option value="artistic_talents">Artistic Talents</Option>
              <Option value="academic_intellectual">Academic & Intellectual</Option>
              <Option value="performing_arts">Performing Arts</Option>
              <Option value="sports_physical">Sports & Physical</Option>
              <Option value="entrepreneurship_business">Entrepreneurship & Business</Option>
              <Option value="technology_digital">Technology & Digital</Option>
              <Option value="cultural_traditional">Cultural & Traditional</Option>
              <Option value="social_community_impact">Social & Community Impact</Option>
              <Option value="culinary_arts">Culinary Arts</Option>
              <Option value="miscellaneous_skills">Miscellaneous Skills</Option>
            </Select>
          </Form.Item>

          <Divider>Contribution Details</Divider>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="monthlyContribution" label="Monthly Contribution" rules={[{ required: true, message: 'Please select amount' }]}>
                <Select placeholder="Select amount">
                  <Option value="5000">5,000 RWF</Option>
                  <Option value="15000">15,000 RWF</Option>
                  <Option value="30000">30,000 RWF</Option>
                  <Option value="45000">45,000 RWF</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: 'Please select payment method' }]}>
                <Select placeholder="Select method">
                  <Option value="mobile_money">Mobile Money</Option>
                  <Option value="bank_transfer">Bank Transfer</Option>
                  <Option value="credit_debit_card">Credit/Debit Card</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="contributionFrequency" label="Payment Frequency" rules={[{ required: true, message: 'Please select frequency' }]}>
            <Select placeholder="Select frequency">
              <Option value="monthly">Monthly</Option>
              <Option value="quarterly">Quarterly</Option>
              <Option value="annually">Annually</Option>
            </Select>
          </Form.Item>

          <Divider>Agreement</Divider>

          <Form.Item 
            name="confirmAccuracy" 
            valuePropName="checked"
            rules={[{ 
              required: true,
              transform: value => value || undefined,
              type: 'boolean',
              message: 'You must confirm accuracy' 
            }]}
          >
            <Checkbox>I confirm that all information provided is accurate</Checkbox>
          </Form.Item>

          <Form.Item 
            name="agreeToTerms" 
            valuePropName="checked"
            rules={[{ 
              required: true,
              transform: value => value || undefined,
              type: 'boolean',
              message: 'You must agree to terms' 
            }]}
          >
            <Checkbox>I agree to ONEFOCUS rules, guidelines, and membership terms</Checkbox>
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="signature" label="Digital Signature" rules={[{ required: true, message: 'Please enter your full name' }]}>
                <Input placeholder="Type your full name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="signatureDate" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Corporate Sponsor Modal */}
      <Modal
        title={<Title level={3} style={{ margin: 0 }}>Corporate Sponsorship Application</Title>}
        open={corporateModalOpen}
        onCancel={() => setCorporateModalOpen(false)}
        footer={null}
        width={800}
        className="onefocus-modal"
        destroyOnClose
      >
        <Form form={corporateForm} onFinish={handleCorporateSubmit} layout="vertical">
          <Form.Item name="fullNameOrganization" label="Organization Name" rules={[{ required: true, message: 'Please enter organization name' }]}>
            <Input placeholder="Tech Solutions Rwanda Ltd" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="info@techsolutions.rw" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter phone number' }]}>
                <Input placeholder="+250788123456" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="countryCity" label="Country / City" rules={[{ required: true, message: 'Please enter location' }]}>
                <Input placeholder="Kigali, Rwanda" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="occupationRole" label="Your Role" rules={[{ required: true, message: 'Please enter your role' }]}>
                <Input placeholder="CEO / Marketing Director" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="websiteSocialMedia" label="Company Website">
            <Input placeholder="https://www.techsolutions.rw" />
          </Form.Item>

          <Form.Item name="organizationSize" label="Organization Size" rules={[{ required: true, message: 'Please select organization size' }]}>
            <Select placeholder="Select size">
              <Option value="small_1_50">Small (1-50 employees)</Option>
              <Option value="medium_51_200">Medium (51-200 employees)</Option>
              <Option value="large_200_plus">Large (200+ employees)</Option>
            </Select>
          </Form.Item>

          <Divider>Sponsorship Details</Divider>

          <Form.Item 
            name="sponsorshipFocus" 
            label="Sponsorship Focus Areas" 
            rules={[{ required: true, message: 'Please select at least one focus area' }]}
          >
            <Select mode="multiple" placeholder="Select focus areas">
              <Option value="branding_marketing_visibility">Branding, Marketing & Visibility</Option>
              <Option value="csr_community_impact">CSR & Community Impact</Option>
              <Option value="talent_development_recruitment">Talent Development & Recruitment</Option>
            </Select>
          </Form.Item>

          <Form.Item name="sponsorshipPackage" label="Sponsorship Package" rules={[{ required: true, message: 'Please select a package' }]}>
            <Select placeholder="Select package">
              <Option value="bronze">Bronze Package</Option>
              <Option value="silver">Silver Package</Option>
              <Option value="gold">Gold Package</Option>
              <Option value="platinum">Platinum Package</Option>
              <Option value="custom">Custom Package</Option>
            </Select>
          </Form.Item>

          <Form.Item name="customPackageDetails" label="Custom Package Details (if applicable)">
            <TextArea 
              rows={3} 
              placeholder="Describe your custom requirements..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: 'Please select payment method' }]}>
                <Select placeholder="Select method">
                  <Option value="mobile_money">Mobile Money</Option>
                  <Option value="bank_transfer">Bank Transfer</Option>
                  <Option value="credit_debit_card">Credit/Debit Card</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="contributionFrequency" label="Payment Frequency" rules={[{ required: true, message: 'Please select frequency' }]}>
                <Select placeholder="Select frequency">
                  <Option value="monthly">Monthly</Option>
                  <Option value="quarterly">Quarterly</Option>
                  <Option value="annually">Annually</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider>Agreement</Divider>

          <Form.Item 
            name="confirmAccuracy" 
            valuePropName="checked"
            rules={[{ 
              required: true,
              transform: value => value || undefined,
              type: 'boolean',
              message: 'You must confirm accuracy' 
            }]}
          >
            <Checkbox>I confirm that all information provided is accurate</Checkbox>
          </Form.Item>

          <Form.Item 
            name="agreeToTerms" 
            valuePropName="checked"
            rules={[{ 
              required: true,
              transform: value => value || undefined,
              type: 'boolean',
              message: 'You must agree to terms' 
            }]}
          >
            <Checkbox>I agree to ONEFOCUS partnership terms and conditions</Checkbox>
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="signature" label="Digital Signature" rules={[{ required: true, message: 'Please enter your full name' }]}>
                <Input placeholder="Type your full name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="signatureDate" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Success Modal with View and Download Options */}
      <Modal
        title={null}
        open={successModalOpen}
        onCancel={() => setSuccessModalOpen(false)}
        footer={null}
        width={600}
        centered
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <Title level={2} style={{ color: '#2E3192', marginBottom: '10px' }}>
            Application Submitted Successfully!
          </Title>
          
          <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
            Thank you for applying to ONEFOCUS. Your {membershipType} application has been received.
          </Paragraph>

          <div style={{
            background: '#f0f8ff',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '30px',
            textAlign: 'left'
          }}>
            <Text style={{ color: '#1F99ED', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
              📄 Your Application Document
            </Text>
            <Text style={{ color: '#666', display: 'block', fontSize: '14px' }}>
              You can view or download your submitted application for your records.
            </Text>
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Button
                size="large"
                icon={<EyeOutlined />}
                onClick={viewApplication}
                style={{
                  width: '100%',
                  height: '50px',
                  borderColor: '#1F99ED',
                  color: '#1F99ED',
                  fontWeight: 600
                }}
              >
                View Application
              </Button>
            </Col>
            <Col xs={24} sm={12}>
              <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                onClick={downloadApplication}
                style={{
                  width: '100%',
                  height: '50px',
                  background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
                  border: 'none',
                  fontWeight: 600
                }}
              >
                Download Application
              </Button>
            </Col>
          </Row>

          <Divider />

          <Paragraph style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>
            We will review your application and contact you within 3-5 business days.
          </Paragraph>

          <Button 
            size="large"
            onClick={() => setSuccessModalOpen(false)}
            style={{
              width: '100%',
              height: '45px'
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default WhatWeBuildPage;