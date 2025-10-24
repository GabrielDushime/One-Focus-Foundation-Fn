import { useState, useEffect } from 'react';
import { Typography, Button, Form, Input, Select, Row, Col, Card, Modal, message, Spin, Checkbox } from 'antd';
import { PlayCircleOutlined, RightOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../config/api';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;


const getImageUrl = (path) => {
  if (!path) {
    return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop';
  }
  
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  
  const baseUrl = 'https://onefocus-fou.onrender.com';
  

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
};

const MediaPage = () => {
  const [form] = Form.useForm();
  const [guestForm] = Form.useForm();
  const [eventForm] = Form.useForm();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [beGuestModalVisible, setBeGuestModalVisible] = useState(false);
  const [eventRegistrationModalVisible, setEventRegistrationModalVisible] = useState(false);
  const [blogModalVisible, setBlogModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);

  // Gallery images
  const galleryImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1531537571171-a707bf2683da?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop"
  ];

  // Podcast episodes
  const podcastEpisodes = [
    {
      title: "South Korea shares why Rwanda's rapid growth, hospitality, and culture are a model for the world.",
      guest: "Featuring South Korea Guy",
      duration: "22 mins",
      date: "August 2025",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&h=300&fit=crop"
    },
    {
      title: "I wasn't Expect to see Rwanda as cleanest 😁 country in the world",
      guest: "Featuring Norman Bücher From Germany, Speaker",
      duration: "20 mins",
      date: "July 2025",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=300&fit=crop"
    },
    {
      title: "EPISODE 1_ Every choice we make shapes our future",
      guest: "Featuring Alain & Sugira",
      duration: "21 mins",
      date: "July 2025",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc678?w=400&h=300&fit=crop"
    }
  ];

  // Events data (fallback)
  const eventsData = [
    {
      title: "Empowerment Conference Africa",
      description: "Bringing together leaders, innovators, and young minds to discuss career pathways, digital transformation, and youth-led impact.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    },
    {
      title: "Live Panels & Talent Exhibitions",
      description: "Hosted during workshops, festivals, or partner events—featuring music, Performance, spoken word, and creative showcases.",
      image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=600&h=400&fit=crop",
    },
    {
      title: "Monthly Community Meetups",
      description: "Connecting African youth across borders for mentorship, training, Q&A, and collaboration.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
    }
  ];

  // Fetch published blogs and events on component mount
  useEffect(() => {
    fetchPublishedBlogs();
    fetchPublishedEvents();
  }, []);

  const fetchPublishedBlogs = async () => {
    setBlogLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.BLOGS_PUBLISHED}?limit=4`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.data.blogs || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setBlogLoading(false);
    }
  };
const fetchPublishedEvents = async () => {
  setEventsLoading(true);
  try {
    const response = await fetch(`${API_ENDPOINTS.EVENTS_PUBLISHED}?limit=50`);
    if (response.ok) {
      const data = await response.json();
      // Handle different possible response structures
      const eventsArray = data.data?.events || data.data || data.events || data || [];
      console.log('Fetched events:', eventsArray); // Debug log
      setEvents(eventsArray);
      
      if (eventsArray.length === 0) {
        message.info('No upcoming events available at the moment.');
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      message.error(errorData.message || 'Failed to load published events.');
    }
  } catch (error) {
    console.error('Error fetching published events:', error);
    message.warning('Could not load events. Please try again later.');
  } finally {
    setEventsLoading(false);
  }
};

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        phoneNumber: values.phone,
        email: values.email,
        interestArea: values.interestArea,
        isWhatsapp: true,
      };

      const response = await fetch(API_ENDPOINTS.GET_INVOLVED_ACTIONS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success('Thank you! Your request has been submitted successfully. We will contact you soon.');
        form.resetFields();
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

  const handleBeGuestSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.BE_GUEST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Thank you for your interest! Your guest request has been submitted successfully. We will review your application and contact you soon.');
        guestForm.resetFields();
        setBeGuestModalVisible(false);
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

  const handleEventRegistrationSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        eventId: values.eventId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        organization: values.organization,
        jobTitle: values.jobTitle,
        ageGroup: values.ageGroup,
        gender: values.gender,
        city: values.city,
        country: values.country || 'Rwanda',
        dietaryRestrictions: values.dietaryRestrictions,
        specialRequirements: values.specialRequirements,
        howDidYouHear: values.howDidYouHear,
        additionalNotes: values.additionalNotes,
        agreedToTerms: values.agreedToTerms || false,
        consentForPhotography: values.consentForPhotography || false,
        consentForCommunication: values.consentForCommunication || false,
      };

      const response = await fetch(API_ENDPOINTS.EVENT_REGISTRATIONS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success('Successfully registered for the event! We will send you confirmation details soon.');
        eventForm.resetFields();
        setEventRegistrationModalVisible(false);
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

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setBlogModalVisible(true);
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{ background: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* Section 1: Image Gallery */}
      <section style={{ 
        padding: '20px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        marginTop:'70px'
      }}>
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={handlePrevImage}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(31, 153, 237, 0.9)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ‹
          </button>

          <div style={{
            width: '100%',
            height: '500px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <img 
              src={galleryImages[currentImageIndex]}
              alt="Gallery"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          <button
            onClick={handleNextImage}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(31, 153, 237, 0.9)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ›
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginTop: '30px' 
        }}>
          {galleryImages.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                width: index === currentImageIndex ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: index === currentImageIndex ? '#1F99ED' : '#ccc',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Voice of Tomorrow Podcast */}
      <section style={{
        background: '#f8f9fa',
        padding: '10px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Title level={2} style={{ 
              color: '#000',
              fontSize: 'clamp(2rem, 2vw, 2.5rem)',
              marginBottom: '10px'
            }}>
              Voice of Tomorrow <span style={{ color: '#1F99ED' }}>Podcast</span>
            </Title>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px',
            marginBottom: '30px',
            marginTop:'-30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <img 
                  src="/11.png"
                  alt="Podcast Host"
                  style={{
                    width: '100%',
                    maxWidth: '800px',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Paragraph style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                lineHeight: '1.8',
                color: '#333',
                marginBottom: '20px'
              }}>
                <strong>Our Voice of Tomorrow Podcast is a platform like no other, with three unique segments:</strong>
              </Paragraph>

              <div style={{ marginBottom: '15px' }}>
                <Text style={{ fontSize: '14px', color: '#1F99ED', fontWeight: 600 }}>
                  Young Talents on the Journey to Greatness:{' '}
                </Text>
                <Text style={{ fontSize: '14px', color: '#333' }}>
                  We host young individuals who are using their talents to achieve their dreams, showcasing their determination and self-creativity.
                </Text>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <Text style={{ fontSize: '14px', color: '#1F99ED', fontWeight: 600 }}>
                  Successful Personalities:{' '}
                </Text>
                <Text style={{ fontSize: '14px', color: '#333' }}>
                  Inspirational guests who have achieved greatness share their journeys, struggles, and insights to motivate and guide the next generation.
                </Text>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <Text style={{ fontSize: '14px', color: '#1F99ED', fontWeight: 600 }}>
                  Visionary Minds in Business:{' '}
                </Text>
                <Text style={{ fontSize: '14px', color: '#333' }}>
                  Businessmen, business women, and private institutions share their expertise, ideas, and strategies.
                </Text>
              </div>

              <Paragraph style={{
                fontSize: '15px',
                fontStyle: 'italic',
                color: '#666',
                marginTop: '20px'
              }}>
                "They provide guidance on starting and sustaining businesses, leveraging social media, and building impactful personal brands."
              </Paragraph>

              <Text style={{
                fontSize: '15px',
                fontStyle: 'italic',
                color: '#1F99ED',
                fontWeight: 600,
                marginTop: '20px',
                display: 'block'
              }}>
                "Stories that Inspire. Events that Empower. Voices that Change Lives."
              </Text>
            </div>
          </div>

          {/* Podcast Episodes */}
          <Title level={3} style={{
            color: '#2E3192',
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Popular Episodes
          </Title>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            {podcastEpisodes.map((episode, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img 
                  src={episode.image}
                  alt={episode.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '20px' }}>
                  <Title level={4} style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                    color: '#1F99ED',
                    marginBottom: '10px',
                    lineHeight: '1.4'
                  }}>
                    {episode.title}
                  </Title>
                  <Text style={{ display: 'block', marginBottom: '10px', color: '#666' }}>
                    {episode.guest}
                  </Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: '14px', color: '#999' }}>
                      {episode.duration} | {episode.date}
                    </Text>
                    <Button 
                      type="link" 
                      icon={<PlayCircleOutlined />}
                      style={{ color: '#1F99ED', fontWeight: 600 }}
                      onClick={() => window.open('https://www.youtube.com/@ONEFOCUSFOU', '_blank')}
                    >
                      Listen
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button 
              size="large"
              onClick={() => window.open('https://www.youtube.com/@ONEFOCUSFOU', '_blank')}
              style={{
                background: '#000',
                color: 'white',
                border: 'none',
                height: '40px',
                padding: '0 40px',
                fontSize: '16px',
                fontWeight: 600,
                marginTop:'-30px'
              }}
            >
              View All Episodes
            </Button>
          </div>

          {/* Listen Now & Be Guest Buttons */}
          <div style={{
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <Title level={3} style={{
              color: '#2E3192',
              fontSize: 'clamp(1.5rem, 1.5vw, 1.8rem)',
              marginBottom: '30px'
            }}>
              Step into the minds of dreamers, doers, and changemakers across Africa
            </Title>
            
            <Paragraph style={{
              fontSize: 'clamp(1rem, 1vw, 1.1rem)',
              color: '#333',
              maxWidth: '800px',
              margin: '0 auto 30px',
              lineHeight: '1.8'
            }}>
              The main purpose of the Voice of Tomorrow Podcast is to empower and inspire young individuals by providing a platform where they can share their dreams, talents, and aspirations.
            </Paragraph>

            <Paragraph style={{
              fontSize: 'clamp(1rem, 1vw, 1.05rem)',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto 40px',
              lineHeight: '1.8'
            }}>
              By showcasing the journeys of others who have overcome challenges to achieve their dreams, the podcast encourages listeners to believe in themselves and take action towards their own aspirations.
            </Paragraph>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div style={{
                background: 'white',
                padding: '10px',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                marginBottom: '40px',
                maxWidth: '700px',
                textAlign: 'center',
                marginTop:'-20px',
                maxHeight:'50px'
              }}>
                <Title level={4} style={{ color: '#2E3192', marginBottom: '20px' }}>
                  Available on YouTube
                </Title>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <Button
                size="large"
                onClick={() => window.open('https://www.youtube.com/@ONEFOCUSFOU', '_blank')}
                style={{
                  background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Listen Now
              </Button>
              
              <Button
                size="large"
                onClick={() => setBeGuestModalVisible(true)}
                style={{
                  background: 'linear-gradient(135deg, #2E3192, #1F99ED)',
                  color: 'white',
                  border: 'none',
                  height: '45px',
                  padding: '0 40px',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Be Guest
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Hybrid Events & Conferences */}
      <section style={{
        padding: '20px 20px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={2} style={{
            textAlign: 'center',
            color: '#1F99ED',
            fontSize: 'clamp(1.8rem, 2vw, 2.5rem)',
            marginBottom: '20px'
          }}>
            Hybrid Events & Conferences
          </Title>

          <Paragraph style={{
            textAlign: 'center',
            fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
            color: '#000',
            maxWidth: '900px',
            margin: '0 auto 60px',
            fontWeight: 500
          }}>
            We host dynamic online and in-person events—bridging communities across Rwanda, Africa, and beyond.
          </Paragraph>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '20px',
            marginTop:'-20px'
          }}>
            {eventsData.map((event, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img 
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '25px' }}>
                  <Title level={4} style={{
                    color: '#1F99ED',
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                    marginBottom: '15px',
                    lineHeight: '1.3'
                  }}>
                    {event.title}
                  </Title>
                  <Paragraph style={{
                    fontSize: 'clamp(0.95rem, 1vw, 1rem)',
                    color: '#333',
                    lineHeight: '1.7',
                    marginBottom: '0'
                  }}>
                    {event.description}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Button 
              size="large"
              onClick={() => setEventRegistrationModalVisible(true)}
              style={{
                background: '#000',
                color: 'white',
                border: 'none',
                height: '45px',
                padding: '0 50px',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              Join Our Upcoming Events
            </Button>
          </div>
        </div>
      </section>

       {/* Section 4: Blog & Stories */}
      <section style={{
        background: '#f8f9fa',
        padding: '20px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
           
            <Title level={2} style={{
              color: '#1F99ED',
              fontSize: 'clamp(1.8rem, 2vw, 2.5rem)'
            }}>
              Blog & Stories
            </Title>
          </div>

          <Paragraph style={{
            textAlign: 'center',
            fontSize: 'clamp(1rem, 1vw, 1.15rem)',
            color: '#000',
            maxWidth: '800px',
            margin: '0 auto 60px',
            fontWeight: 500
          }}>
            Read inspiring articles written by youth, mentors, and creative minds.
          </Paragraph>

          {blogLoading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              marginTop:'-40px'
            }}>
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img 
                    src={getImageUrl(blog.blogPhoto)}
                    alt={blog.blogTitle}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop';
                    }}
                  />
                  <div style={{ padding: '25px' }}>
                    <Title level={4} style={{
                      color: '#2E3192',
                      fontSize: 'clamp(1.1rem, 1.5vw, 1.2rem)',
                      marginBottom: '10px',
                      lineHeight: '1.3'
                    }}>
                      {blog.blogTitle}
                    </Title>
                    {blog.blogSubtitle && (
                      <Text style={{
                        display: 'block',
                        color: '#1F99ED',
                        fontSize: '15px',
                        fontWeight: 600,
                        marginBottom: '15px'
                      }}>
                        {blog.blogSubtitle}
                      </Text>
                    )}
                    <Paragraph style={{
                      fontSize: 'clamp(0.95rem, 1vw, 1rem)',
                      color: '#666',
                      lineHeight: '1.6',
                      marginBottom: '15px'
                    }}>
                      {blog.blogDescription?.substring(0, 120)}...
                    </Paragraph>
                    <Button 
                      type="link"
                      style={{
                        color: '#1F99ED',
                        fontSize: '15px',
                        fontWeight: 600,
                        padding: 0
                      }}
                      onClick={() => handleBlogClick(blog)}
                    >
                      Read More <RightOutlined />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 4.5: Gallery Archives */}
      <section style={{
        background: 'white',
        padding: '20px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={2} style={{
            textAlign: 'center',
            color: '#1F99ED',
            fontSize: 'clamp(1.8rem, 2vw, 2.5rem)',
            marginBottom: '10px',
            textDecoration: 'underline',
            textDecorationColor: '#1F99ED',
            textUnderlineOffset: '10px'
          }}>
            Gallery Archives
          </Title>

          <Paragraph style={{
            textAlign: 'center',
            fontSize: 'clamp(1rem, 1vw, 1.15rem)',
            color: '#2E3192',
            maxWidth: '900px',
            margin: '0 auto 30px',
            fontWeight: 500
          }}>
            See what passion looks like in action! From school visits to workshop performances—relive our moments through photos and video highlights.
          </Paragraph>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Button 
              size="large"
              onClick={() => window.open('https://www.flickr.com/photos/onefocusfou/', '_blank')}
              style={{
                background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
                color: 'white',
                border: 'none',
                height: '45px',
                padding: '0 40px',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              View All Gallery
            </Button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px',
            marginTop:'-30px'
          }}>
            {/* Gallery Events Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2px',
                background: '#f0f0f0'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
                  alt="Gallery 1"
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
                <img 
                  src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop"
                  alt="Gallery 2"
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
                <img 
                  src="https://images.unsplash.com/photo-1531537571171-a707bf2683da?w=400&h=300&fit=crop"
                  alt="Gallery 3"
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop"
                  alt="Gallery 4"
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '30px', textAlign: 'center' }}>
                <Title level={3} style={{
                  color: '#1F99ED',
                  fontSize: 'clamp(1.3rem, 2vw, 1.5rem)',
                  marginBottom: '20px'
                }}>
                  Gallery Events
                </Title>
              </div>
            </div>

            {/* Video Events Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Video Events"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ padding: '30px', textAlign: 'center' }}>
                <Title level={3} style={{
                  color: '#2E3192',
                  fontSize: 'clamp(1.3rem, 2vw, 1.5rem)',
                  marginBottom: '20px'
                }}>
                  Video Events
                </Title>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Be Part of the Action */}
      <section style={{
        background: 'white',
        padding: '20px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <Title level={2} style={{
              color: '#1F99ED',
              fontSize: 'clamp(2rem, 1.6vw, 2.5rem)',
              marginBottom: '0',
              textDecoration: 'underline',
              textDecorationColor: '#1F99ED',
              textUnderlineOffset: '10px'
            }}>
              Be Part of the Action
            </Title>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px',
            alignItems: 'start'
          }}>
            {/* Left Side - Text Content */}
            <div>
              <Title level={3} style={{
                color: '#1F99ED',
                fontSize: 'clamp(1.5rem, 1.5vw, 1.8rem)',
                marginBottom: '10px'
              }}>
                Join Our Media & Events Network
              </Title>

              <Paragraph style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                color: '#2E3192',
                lineHeight: '1.8',
                marginBottom: '25px',
                fontWeight: 500
              }}>
                Want to be featured in our podcast or blog? Want to perform or speak at our next conference? Want to co-host or sponsor a media event?
              </Paragraph>

              <Paragraph style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.05rem)',
                color: '#333',
                lineHeight: '1.8',
                marginBottom: '30px'
              }}>
                Fill out this form and join our growing community of changemakers!
              </Paragraph>
            </div>

            {/* Right Side - Form */}
            <div style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              padding: '40px',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  name="name"
                  label={<Text style={{ fontWeight: 600, fontSize: '15px' }}>Name</Text>}
                  rules={[{ required: true, message: 'Please enter your full name' }]}
                >
                  <Input 
                    placeholder="Enter full name"
                    size="large"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={<Text style={{ fontWeight: 600, fontSize: '15px' }}>Phone Number (Whatsapp preferable)</Text>}
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input 
                    placeholder="+ country code"
                    size="large"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<Text style={{ fontWeight: 600, fontSize: '15px' }}>Email</Text>}
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    placeholder="Enter email"
                    size="large"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  name="interestArea"
                  label={<Text style={{ fontWeight: 600, fontSize: '15px' }}>Interest Area</Text>}
                  rules={[{ required: true, message: 'Please select an interest area' }]}
                >
                  <Select 
                    placeholder="Select your interest"
                    size="large"
                    style={{ borderRadius: '8px' }}
                  >
                    <Option value="podcast_guest">
                      <div style={{ padding: '5px 0' }}>
                        <Text style={{ fontWeight: 600, color: '#2E3192' }}>Podcast Guest</Text>
                      </div>
                    </Option>
                    <Option value="event_speaker">
                      <div style={{ padding: '5px 0' }}>
                        <Text style={{ fontWeight: 600, color: '#2E3192' }}>Event Speaker</Text>
                      </div>
                    </Option>
                    <Option value="media_collaborator">
                      <div style={{ padding: '5px 0' }}>
                        <Text style={{ fontWeight: 600, color: '#2E3192' }}>Media Collaborator</Text>
                      </div>
                    </Option>
                    <Option value="story_contributor">
                      <div style={{ padding: '5px 0' }}>
                        <Text style={{ fontWeight: 600, color: '#2E3192' }}>Story Contributor</Text>
                      </div>
                    </Option>
                    <Option value="volunteer">
                      <div style={{ padding: '5px 0' }}>
                        <Text style={{ fontWeight: 600, color: '#2E3192' }}>Volunteer</Text>
                      </div>
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, marginTop: '30px' }}>
                  <Button 
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                    style={{
                      background: 'linear-gradient(135deg, #1F99ED, #2E3192)',
                      border: 'none',
                      height: '50px',
                      fontSize: '16px',
                      fontWeight: 600,
                      borderRadius: '8px'
                    }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Be Guest Modal */}
      <Modal
        title={
          <div style={{ textAlign: 'center', paddingBottom: '16px' }}>
            <Title level={3} style={{ marginBottom: '8px', color: '#1F99ED' }}>
              Be a Guest
            </Title>
            <Text type="secondary">
              Join us on Voice of Tomorrow Podcast
            </Text>
          </div>
        }
        open={beGuestModalVisible}
        onCancel={() => {
          setBeGuestModalVisible(false);
          guestForm.resetFields();
        }}
        width={700}
        footer={[
          <Button 
            key="cancel" 
            onClick={() => {
              setBeGuestModalVisible(false);
              guestForm.resetFields();
            }}
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
            onClick={() => guestForm.submit()}
            style={{
              background: '#1F99ED',
              borderColor: '#1F99ED'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        ]}
        className="onefocus-modal"
      >
        <Spin spinning={loading}>
          <Form
            form={guestForm}
            layout="vertical"
            onFinish={handleBeGuestSubmit}
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
                placeholder="Enter your email"
                size="large"
              />
            </Form.Item>

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

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="organization"
                  label="Organization/Company"
                  rules={[{ required: true, message: 'Please enter your organization' }]}
                >
                  <Input 
                    placeholder="Your organization"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jobTitle"
                  label="Job Title"
                  rules={[{ required: true, message: 'Please enter your job title' }]}
                >
                  <Input 
                    placeholder="Your job title"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="guestType"
              label="Type of Appearance"
              rules={[{ required: true, message: 'Please select appearance type' }]}
            >
              <Select placeholder="Select type" size="large">
                <Option value="podcast">Podcast</Option>
                <Option value="workshop">Workshop</Option>
                <Option value="event_speaker">Event Speaker</Option>
                <Option value="webinar">Webinar</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="topicExpertise"
              label="Topic/Area of Expertise (Max 500 characters)"
              rules={[
                { required: true, message: 'Please describe your expertise' },
                { max: 500, message: 'Maximum 500 characters' }
              ]}
            >
              <TextArea 
                rows={3}
                placeholder="Describe your area of expertise..."
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Form.Item
              name="whyBeGuest"
              label="Why do you want to be a guest? (Max 1000 characters)"
              rules={[
                { required: true, message: 'Please tell us why you want to be a guest' },
                { max: 1000, message: 'Maximum 1000 characters' }
              ]}
            >
              <TextArea 
                rows={4}
                placeholder="Share your motivation..."
                showCount
                maxLength={1000}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Event Registration Modal */}
      <Modal
        title={
          <div style={{ textAlign: 'center', paddingBottom: '16px' }}>
            <Title level={3} style={{ marginBottom: '8px', color: '#1F99ED' }}>
              Register for Event
            </Title>
            <Text type="secondary">
              Join our upcoming event
            </Text>
          </div>
        }
        open={eventRegistrationModalVisible}
        onCancel={() => {
          setEventRegistrationModalVisible(false);
          eventForm.resetFields();
        }}
        width={800}
        footer={[
          <Button 
            key="cancel" 
            onClick={() => {
              setEventRegistrationModalVisible(false);
              eventForm.resetFields();
            }}
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
            onClick={() => eventForm.submit()}
            style={{
              background: '#1F99ED',
              borderColor: '#1F99ED'
            }}
          >
            {loading ? 'Submitting...' : 'Register'}
          </Button>
        ]}
      >
        <Spin spinning={loading || eventsLoading}>
          <Form
            form={eventForm}
            layout="vertical"
            onFinish={handleEventRegistrationSubmit}
            initialValues={{ country: 'Rwanda' }}
          >
             <Form.Item
              name="eventId"
              label="Select Event"
              rules={[{ required: true, message: 'Please select an event' }]}
            >
              <Select 
                placeholder={eventsLoading ? "Loading events..." : events.length > 0 ? "Choose an event" : "No events available"} 
                size="large"
                loading={eventsLoading}
                disabled={eventsLoading || events.length === 0}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label || '').toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={eventsLoading ? <Spin size="small" /> : "No events found"}
              >
                {events.length > 0 ? (
                  events.map((event) => {
                    const eventTitle = event.eventTitle || event.title || 'Untitled Event';
                    const eventDate = event.eventDate || event.date;
                    
                    // Build the display text with title and date in brackets
                    const displayText = eventDate 
                      ? `${eventTitle} (${formatEventDate(eventDate)})`
                      : eventTitle;
                    
                    return (
                      <Option 
                        key={event.id || event._id} 
                        value={event.id || event._id}
                        label={displayText}
                      >
                        {displayText}
                      </Option>
                    );
                  })
                ) : (
                  !eventsLoading && (
                    <Option disabled value="">
                      No upcoming events available
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input 
                    placeholder="Enter first name"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input 
                    placeholder="Enter last name"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
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
                    placeholder="Enter your email"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
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
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="organization"
                  label="Organization/Company"
                >
                  <Input 
                    placeholder="Your organization (optional)"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jobTitle"
                  label="Job Title"
                >
                  <Input 
                    placeholder="Your job title (optional)"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="ageGroup"
                  label="Age Group"
                >
                  <Select placeholder="Select age group" size="large">
                    <Option value="18-24">18-24</Option>
                    <Option value="25-34">25-34</Option>
                    <Option value="35-44">35-44</Option>
                    <Option value="45-54">45-54</Option>
                    <Option value="55+">55+</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                >
                  <Select placeholder="Select gender" size="large">
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                    <Option value="Prefer not to say">Prefer not to say</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="City"
                >
                  <Input 
                    placeholder="Your city"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="Country"
                >
                  <Input 
                    placeholder="Your country"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="dietaryRestrictions"
              label="Dietary Restrictions"
            >
              <Input 
                placeholder="Any dietary restrictions (optional)"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="specialRequirements"
              label="Special Requirements"
            >
              <TextArea 
                rows={2}
                placeholder="Accessibility needs or special requirements (optional)"
              />
            </Form.Item>

            <Form.Item
              name="howDidYouHear"
              label="How did you hear about this event?"
            >
              <Select placeholder="Select option" size="large">
                <Option value="Social Media">Social Media</Option>
                <Option value="Website">Website</Option>
                <Option value="Friend/Colleague">Friend/Colleague</Option>
                <Option value="Email">Email</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="additionalNotes"
              label="Additional Notes"
            >
              <TextArea 
                rows={3}
                placeholder="Any additional information you'd like to share (optional)"
              />
            </Form.Item>

            <Form.Item
              name="agreedToTerms"
              valuePropName="checked"
              rules={[
                { 
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms'))
                }
              ]}
            >
              <Checkbox>I agree to the terms and conditions</Checkbox>
            </Form.Item>

            <Form.Item
              name="consentForPhotography"
              valuePropName="checked"
            >
              <Checkbox>I consent to event photography and media</Checkbox>
            </Form.Item>

            <Form.Item
              name="consentForCommunication"
              valuePropName="checked"
            >
              <Checkbox>I consent to receive future communications</Checkbox>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Blog Detail Modal */}
      <Modal
        title={null}
        open={blogModalVisible}
        onCancel={() => {
          setBlogModalVisible(false);
          setSelectedBlog(null);
        }}
        width={900}
        footer={null}
        style={{ top: 20 }}
      >
        {selectedBlog && (
          <div>
            {selectedBlog.blogPhoto && (
              <img 
                src={getImageUrl(selectedBlog.blogPhoto)}
                alt={selectedBlog.blogTitle}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&h=400&fit=crop';
                }}
              />
            )}
            <Title level={2} style={{ color: '#2E3192', marginBottom: '12px' }}>
              {selectedBlog.blogTitle}
            </Title>
            {selectedBlog.blogSubtitle && (
              <Title level={4} style={{ color: '#1F99ED', fontWeight: 600, marginBottom: '20px' }}>
                {selectedBlog.blogSubtitle}
              </Title>
            )}
            <Paragraph style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333',
              whiteSpace: 'pre-wrap'
            }}>
              {selectedBlog.blogDescription}
            </Paragraph>
            {selectedBlog.blogContent && (
              <div style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#333',
                marginTop: '24px'
              }}
              dangerouslySetInnerHTML={{ __html: selectedBlog.blogContent }}
              />
            )}
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #e8e8e8'
            }}>
              <Text type="secondary">
                Published on {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MediaPage;