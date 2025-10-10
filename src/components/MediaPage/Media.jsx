import { useState } from 'react';
import { Typography, Button, Form, Input, Select, Row, Col, Card } from 'antd';
import { PlayCircleOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const MediaPage = () => {
  const [form] = Form.useForm();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images for scrolling section
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
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop"
    }
  ];

  // Events data
  const events = [
    {
      title: "Empowerment Conference Africa",
      description: "Bringing together leaders, innovators, and young minds to discuss career pathways, digital transformation, and youth-led impact.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      alignment: "left"
    },
    {
      title: "Live Panels & Talent Exhibitions",
      description: "Hosted during workshops, festivals, or partner events—featuring music, Performance, spoken word, and creative showcases.",
      image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=600&h=400&fit=crop",
      alignment: "right"
    },
    {
      title: "Monthly Community Meetups",
      description: "Connecting African youth across borders for mentorship, training, Q&A, and collaboration.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
      alignment: "left"
    }
  ];

  // Blog posts
  const blogPosts = [
    {
      title: "From Street Artist to Tech Entrepreneur",
      subtitle: "Youth Spotlight",
      description: "How Tadele used digital skills to transform his passion into a thriving business.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      alignment: "left"
    },
    {
      title: "Sustainable Fashion in Rwanda",
      subtitle: "Creative Projects & Startups",
      description: "How Tadele used digital skills to transform his passion into a thriving business.",
      image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=400&h=300&fit=crop",
      alignment: "right"
    },
    {
      title: "Digital Storytelling Revolution",
      subtitle: "African Talent Trends",
      description: "How Gen Z creators are changing the narrative about Africa through social media.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      alignment: "left"
    },
    {
      title: "Learning in a Digital Age",
      subtitle: "Skill Development Tips",
      description: "Essential online resources for self-education when formal options are limited.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      alignment: "right"
    }
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <div style={{ background: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* Section 1: Image Gallery with Scroll */}
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
            {/* Left side - Podcast info */}
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

            {/* Right side - Description */}
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
              The main purpose of the Voice of Tomorrow Podcast is to empower and inspire young individuals by providing a platform where they can share their dreams, talents, and aspirations. Through engaging discussions and interviews, the podcast aims to educate listeners about various fields, entertain them with inspiring stories, and build their confidence in pursuing their goals.
            </Paragraph>

            <Paragraph style={{
              fontSize: 'clamp(1rem, 1vw, 1.05rem)',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto 40px',
              lineHeight: '1.8'
            }}>
              By showcasing the journeys of others who have overcome challenges to achieve their dreams, the podcast encourages listeners to believe in themselves and take action towards their own aspirations. Ultimately, it seeks to instill a sense of determination and resilience, motivating young people to pursue their dreams relentlessly until they become reality.
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
            {events.map((event, index) => (
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
            <Button 
              style={{
                background: '#2E3192',
                color: 'white',
                border: 'none',
                height: '40px',
                padding: '0 30px',
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '20px'
              }}
            >
              Visit Blog
            </Button>
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginTop:'-40px'
          }}>
            {blogPosts.map((post, index) => (
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
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '25px' }}>
                  <Title level={4} style={{
                    color: '#2E3192',
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.2rem)',
                    marginBottom: '10px',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </Title>
                  <Text style={{
                    display: 'block',
                    color: '#1F99ED',
                    fontSize: '15px',
                    fontWeight: 600,
                    marginBottom: '15px'
                  }}>
                    {post.subtitle}
                  </Text>
                  <Paragraph style={{
                    fontSize: 'clamp(0.95rem, 1vw, 1rem)',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '15px'
                  }}>
                    {post.description}
                  </Paragraph>
                  <Button 
                    type="link"
                    style={{
                      color: '#1F99ED',
                      fontSize: '15px',
                      fontWeight: 600,
                      padding: 0
                    }}
                  >
                    Read More <RightOutlined />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4.5: Gallery Archives (After Blog) */}
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
            margin: '0 auto 60px',
            fontWeight: 500
          }}>
            See what passion looks like in action! From school visits to workshop performances—relive our moments through photos and video highlights.
          </Paragraph>

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

    </div>
  );
};

export default MediaPage;