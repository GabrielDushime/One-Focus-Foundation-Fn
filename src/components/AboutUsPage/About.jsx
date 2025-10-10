import { Typography, Button } from 'antd';

const { Title, Paragraph, Text } = Typography;

const AboutPage = () => {
  const handleJoinCommunity = () => {
    window.location.href = '/what-we-build';
  };

  return (
    <div style={{ background: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* Section 1: Our Story */}
      <section 
      
      style={{ 
        padding: '20px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        marginTop: '60px',
        marginLeft:'150px'
         
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
            width: '70%',
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

          {/* Related Links Section */}
          <div style={{
            marginTop: '10px',
            padding: '20px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
          }}>
            <Title level={3} style={{ 
              textAlign: 'center', 
              marginBottom: '25px', 
              color: '#000',
              fontSize: 'clamp(1.3rem, 1vw, 2rem)',
              fontWeight: 700
            }}>
              RELATED LINKS
            </Title>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              <a href="/join-us" style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: '#F8F9FA',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1F99ED';
                  e.currentTarget.querySelector('span').style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F8F9FA';
                  e.currentTarget.querySelector('span').style.color = '#2E3192';
                }}>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}>
                    Join Community
                  </Text>
                </div>
              </a>

              <a href="/get-involved" style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: '#F8F9FA',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1F99ED';
                  e.currentTarget.querySelector('span').style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F8F9FA';
                  e.currentTarget.querySelector('span').style.color = '#2E3192';
                }}>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}>
                    Partnership
                  </Text>
                </div>
              </a>

              <a href="/what-we-build" style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: '#F8F9FA',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1F99ED';
                  e.currentTarget.querySelector('span').style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F8F9FA';
                  e.currentTarget.querySelector('span').style.color = '#2E3192';
                }}>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}>
                    Apply Membership
                  </Text>
                </div>
              </a>

              <a href="/events" style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: '#F8F9FA',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1F99ED';
                  e.currentTarget.querySelector('span').style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F8F9FA';
                  e.currentTarget.querySelector('span').style.color = '#2E3192';
                }}>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}>
                    Upcoming Events
                  </Text>
                </div>
              </a>

              <a href="/impact" style={{ textDecoration: 'none' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: '#F8F9FA',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1F99ED';
                  e.currentTarget.querySelector('span').style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F8F9FA';
                  e.currentTarget.querySelector('span').style.color = '#2E3192';
                }}>
                  <Text style={{ 
                    color: '#2E3192', 
                    fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                    fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}>
                    Review Our Impact
                  </Text>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;