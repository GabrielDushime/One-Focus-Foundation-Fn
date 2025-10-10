import { useState } from 'react';
import { Typography, Form, Input, Button, message } from 'antd';
import { API_ENDPOINTS } from '../../config/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT || `${API_ENDPOINTS.JOIN_US.replace('/join-us', '')}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      const result = await response.json();
      message.success(result.message || 'Thank you for contacting us! We will get back to you soon.');
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit form. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section with Video Background */}
      <section style={{ 
        position: 'relative',
        height: '400px',
        overflow: 'hidden',
        marginBottom: '0'
      }}>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            zIndex: 1
          }}
        >
          <source src="media-hub.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 2
        }} />
        
        {/* Text Content */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 3,
          width: '90%',
          maxWidth: '800px'
        }}>
          <Text style={{ 
            color: 'white', 
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontStyle: 'italic',
            display: 'block',
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Don't unlimit your dream
          </Text>
          <Title level={1} style={{ 
            color: 'white', 
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            margin: 0,
            fontWeight: 700,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            anytime you can achieve it
          </Title>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 0,
        width: '100%',
        marginBottom:'30px'
        
      }}>
        {/* Contact Us - Black Background */}
        <div style={{
          background: '#000000',
          padding: '20px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '400px',
          marginTop:'-220px'
        }}>
          <Title level={2} style={{ 
            color: '#1F99ED', 
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            marginBottom: '10px',
            fontWeight: 600,
            letterSpacing: '3px',
            
          }}>
            CONTACT
          </Title>
          <Title level={2} style={{ 
            color: 'white', 
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            marginTop: 0,
            marginBottom: '40px',
            fontWeight: 600,
            letterSpacing: '3px'
          }}>
            US
          </Title>
          
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <div style={{ marginBottom: '25px' }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                display: 'block',
                lineHeight: '1.8'
              }}>
                WhatsApp: +250-781-132-467
              </Text>
              <Text style={{ 
                color: 'white', 
                fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                display: 'block',
                lineHeight: '1.8'
              }}>
                onefocusfoudation@gmail.com
              </Text>
              <Text style={{ 
                color: 'white', 
                fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                display: 'block',
                lineHeight: '1.8'
              }}>
                Kigali-Rwanda
              </Text>
            </div>
          </div>
        </div>

        {/* Visit Us - Dark Blue Background */}
        <div style={{
          background: '#2E3192',
          padding: '20px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '400px',
          marginTop:'-220px'
        }}>
          <Title level={2} style={{ 
            color: '#1F99ED', 
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            marginBottom: '10px',
            fontWeight: 600,
            letterSpacing: '3px'
          }}>
            VISIT
          </Title>
          <Title level={2} style={{ 
            color: 'white', 
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            marginTop: 0,
            marginBottom: '40px',
            fontWeight: 600,
            letterSpacing: '3px'
          }}>
            US
          </Title>
          
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <div style={{ marginBottom: '25px', borderBottom: '2px solid #1F99ED', paddingBottom: '15px' }}>
              <Text style={{ 
                color: 'white', 
                fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                display: 'block',
                lineHeight: '1.8'
              }}>
                Monday - Friday 9:00 - 5:00
              </Text>
              <Text style={{ 
                color: 'white', 
                fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
                display: 'block',
                lineHeight: '1.8'
              }}>
                Saturday 2:00 - 4:00
              </Text>
            </div>
          </div>
        </div>

        {/* Tell Us - Light Blue Background with Form */}
        <div style={{
          background: '#1F99ED',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '400px',
          marginTop:'-50px'
        }}>
          <Title level={2} style={{ 
            color: 'white', 
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            marginBottom: '10px',
            fontWeight: 600,
            letterSpacing: '3px'
          }}>
            TELL
          </Title>
          <Title level={2} style={{ 
            color: 'white', 
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            marginTop: 0,
            marginBottom: '30px',
            fontWeight: 600,
            letterSpacing: '3px'
          }}>
            US
          </Title>
          
          
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            style={{ width: '100%', maxWidth: '350px' }}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please enter your name' },
                { min: 2, message: 'Name must be at least 2 characters' },
                { max: 100, message: 'Name must not exceed 100 characters' }
              ]}
              style={{ marginBottom: '15px' }}
            >
              <Input 
                placeholder="Name" 
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 15px',
                  fontSize: '14px'
                }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
              style={{ marginBottom: '15px' }}
            >
              <Input 
                placeholder="Email" 
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 15px',
                  fontSize: '14px'
                }}
              />
            </Form.Item>

            <Form.Item
              name="subject"
              rules={[
                { required: true, message: 'Please enter the subject' },
                { min: 5, message: 'Subject must be at least 5 characters' },
                { max: 200, message: 'Subject must not exceed 200 characters' }
              ]}
              style={{ marginBottom: '20px' }}
            >
              <TextArea 
                placeholder="Type your message" 
                rows={4}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 15px',
                  fontSize: '14px',
                  resize: 'none'
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={loading}
                style={{
                  width: '100%',
                  height: '45px',
                  background: '#000000',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '1px'
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;