'use client'

import { useState, useEffect } from 'react'
import { Typography, Button, Row, Col, Statistic } from 'antd'
import Image from 'next/image'

const { Title, Text } = Typography

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const heroSlides = [
    {
      title: "ONEFOCUS",
      subtitle: "WATCH OUTREACH VIDEO.",
      src: "/_YouTube Banner.png", 
      hasVideo: true,
      containerSize: { width: 'w-64 lg:w-72', height: 'h-64 lg:h-72' },
      imageSize: { width: 400, height: 280 },
      imagePadding: '15px'
    },
    {
      title: "ELEVATE YOUR FUTURE",
      subtitle: "Discover. Create. Lead with us.",
      src: "/freepik_br_636f19f8-578f-4888-b939-b12c40f91f24.png", 
      hasVideo: true,
      containerSize: { width: 'w-64 lg:w-72', height: 'h-64 lg:h-72' },
      imageSize: { width: 200, height: 280 },
      imagePadding: '15px',
    },
    {
      title: "EMPOWER YOUR DREAMS", 
      subtitle: "Shape tomorrow, today.",
      src: "/slide1-removebg-preview.png", 
      hasVideo: true,
      containerSize: { width: 'w-64 lg:w-72', height: 'h-64 lg:h-72' },
      imageSize: { width: 400, height: 280 },
      imagePadding: '15px'
    }
  ]

  const stats = [
    { title: "Younger Talent we are connected Across Africa", value: "20+", suffix: "" },
    { title: "Younger Talent Succeed in Different career Across Africa", value: "0", suffix: "" },
    { title: "Africa Country Membership", value: "4+", suffix: "" }
  ]

  const ONEFOCUS_YOUTUBE_URL = "https://www.youtube.com/@ONEFOCUSFOU"

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 3000) 

    return () => clearInterval(interval)
  }, [heroSlides.length])

  const currentSlideData = heroSlides[currentSlide]

  return (
    <>
      {/* Hero Section with Fade Animation */}
      <section className="relative" 
        style={{ 
          paddingTop: '80px',
          paddingLeft:'5px',
          paddingRight:'5px'
        }}>
        
        {/* CSS for responsive design and smooth transitions */}
        <style jsx>{`
          .slide-container {
            position: relative;
            height: 350px;
            overflow: hidden;
          }
          
          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
          }
          
          .slide-enter {
            opacity: 1;
            transform: translateX(0);
          }
          
          .slide-exit {
            opacity: 0;
            transform: translateX(-20px);
          }
          
          .slide-indicators {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
          }
          
          .indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .indicator.active {
            background: white;
            transform: scale(1.2);
          }
          
          .indicator:hover {
            background: rgba(255, 255, 255, 0.8);
            transform: scale(1.1);
          }
          
          @media (min-width: 1024px) {
            .hero-section {
              padding-left: 18% !important;
              padding-right: 18% !important;
            }
          }
          
          @media (max-width: 1023px) {
            .hero-title {
              font-size: 24px !important;
              padding-top: 60px !important; /* Increased from 20px */
              padding-left: 15px !important;
              padding-right: 15px !important;
              margin-top: 20px !important; /* Added extra top margin */
            }
            
            .hero-subtitle {
              font-size: 14px !important;
              padding-left: 15px !important;
              padding-right: 15px !important;
              margin-top: 10px !important; /* Added top margin */
            }
            
            .youtube-button {
              margin-left: 0 !important;
              margin-top: 15px !important; 
              
            }
            
            .youtube-icon {
              width: 32px !important;
              height: 32px !important;
            }
            
            .slide-container {
              height: 400px !important; /* Increased height for mobile */
            }
          }
          
          @media (max-width: 768px) {
            .hero-title {
              font-size: 18px !important; /* Increased from 14px */
              padding-top: 80px !important; /* Increased significantly */
              padding-left: 10px !important;
              padding-right: 10px !important;
              margin-top: 30px !important; /* Added more top margin */
            }
            
            .hero-subtitle {
              font-size: 13px !important;
              padding-left: 10px !important;
              padding-right: 10px !important;
              margin-top: 15px !important; /* Added top margin */
            }
            
            .youtube-button {
              margin-top: 20px !important; /* Added top margin */
            }
            
            .slide-container {
              height: 450px !important; /* Increased height even more for small screens */
            }
          }
          
          @media (max-width: 480px) {
            .hero-title {
              font-size: 16px !important; /* Increased from 14px */
              padding-top: 100px !important; /* Increased significantly for very small screens */
              padding-left: 8px !important;
              padding-right: 8px !important;
              margin-top: 40px !important; /* Added even more top margin */
            }
            
            .hero-subtitle {
              font-size: 12px !important;
              padding-left: 8px !important;
              padding-right: 8px !important;
              margin-top: 20px !important; /* Added top margin */
            }
            
            .youtube-icon {
              width: 28px !important;
              height: 28px !important;
            }
            
            .youtube-button {
              margin-top: 25px !important; /* Added top margin */
            }
            
            .slide-container {
              height: 500px !important; /* Increased height for very small screens */
            }
          }
        `}</style>

        <div className="hero-section">
          <div className="slide-container">
            {heroSlides.map((slide, index) => (
              <div 
                key={index}
                className={`slide ${index === currentSlide ? 'slide-enter' : 'slide-exit'}`}
                style={{
                  background: ' #1F99ED ',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <div className="container mx-auto px-6 max-w-6xl">
                  <Row align="middle" gutter={[32, 24]}>
                    <Col xs={24} lg={12}>
                      <div className="text-center lg:text-center text-white">
                        <Title 
                          level={1} 
                          className="hero-title text-white mb-4 !text-3xl lg:!text-5xl font-bold tracking-wide"
                          style={{ 
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            color:'white', 
                            fontSize:'30px',
                            paddingTop:'50px',
                            paddingLeft:'50px',
                            paddingRight:'50px',
                          }}
                        >
                          {slide.title}
                        </Title>
                        <Text className="hero-subtitle !text-white !text-lg lg:!text-xl mb-6 block font-light"
                          style={{ 
                            color:'white', 
                            fontSize:'16px',
                            paddingLeft:'50px',
                            paddingRight:'50px'
                          }}
                        >
                          {slide.subtitle}
                        </Text>
                        {slide.hasVideo && (
                          <div 
                            className="youtube-button"
                            style={{
                              marginTop: '20px',
                  
                              cursor: 'pointer',
                              display: 'inline-block'
                            }}
                            onClick={() => window.open(ONEFOCUS_YOUTUBE_URL, '_blank')}
                          >
                            <svg
                              className="youtube-icon"
                              width="38"
                              height="38"
                              viewBox="0 0 24 24"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                transition: 'transform 0.2s ease',
                                background:"#FF0000",
                                padding:"4px"
                              }}
                              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col xs={24} lg={12}>
                      <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                          <div className={`${slide.containerSize.width} ${slide.containerSize.height} bg-transparent rounded-2xl flex items-center justify-center overflow-hidden`}>
                            <Image
                              src={slide.src}
                              alt={slide.title}
                              width={slide.imageSize.width}
                              height={slide.imageSize.height}
                              className="object-contain rounded-2xl"
                              style={{
                                padding: slide.imagePadding,
                                backgroundColor: 'transparent'
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="w-full h-full bg-white/20 rounded-2xl flex items-center justify-center" style={{ display: 'none' }}>
                              <Text className="text-white text-center">Professional Image</Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ))}
            
            {/* Slide Indicators */}
            <div className="slide-indicators">
              {heroSlides.map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-onefocus-primary-dark py-12 stats-section"
        style={{
          marginLeft:'5px',
          marginRight:'5px'
        }}>
        
        <style jsx>{`
          @media (min-width: 1024px) {
            .stats-section {
              margin-left: 18% !important;
              margin-right: 18% !important;
            }
          }
          
          @media (max-width: 768px) {
            .stats-text {
              font-size: 10px !important;
              padding-left: 10px !important;
              padding-right: 10px !important;
              padding-top: 8px !important;
            }
            
            .stats-section {
              padding-top: 24px !important;
              padding-bottom: 24px !important;
            }
          }
          
          @media (max-width: 480px) {
            .stats-text {
              font-size: 9px !important;
              padding-left: 8px !important;
              padding-right: 8px !important;
              padding-top: 6px !important;
            }
            
            .stats-section {
              padding-top: 20px !important;
              padding-bottom: 20px !important;
            }
          }
        `}</style>
        
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]} className="text-center" justify="center">
            {stats.map((stat, index) => (
              <Col xs={24} md={8} key={index}>
                <div className="text-white text-center flex flex-col items-center">
                  <Text
                    className="stats-text mb-2 text-center"
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      width: '100%',
                      display: 'block',
                      paddingTop:'10px',
                      paddingLeft:'20px',
                      paddingRight:'20px',
                      fontWeight:'bold',
                      fontSize:'12px'
                    }}
                  >
                    {stat.title}
                  </Text>
                  <Statistic
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                    className="text-center"
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </>
  )
}

export default HeroSection