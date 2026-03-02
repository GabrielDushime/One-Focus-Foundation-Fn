import { useState, useEffect } from 'react'
import { Typography } from 'antd'
import Image from 'next/image'

const { Text } = Typography

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Animation states
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)

  const heroSlides = [
    { src: "/NIY488.jpeg" },
    { src: "/_NIY1911.JPG" },
    { src: "/brand.png" },
    { src: "/_NIY1926.JPG" },
    { src: "/_NIY4.jpeg" },
    { src: "/_NIY3164.JPG" }
  ]

  useEffect(() => {
    // Auto-rotate slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroSlides.length])

  useEffect(() => {
    // Trigger entrance animations
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 300)
    const buttonTimer = setTimeout(() => setButtonVisible(true), 600)

    return () => {
      clearTimeout(subtitleTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  const handleYouTubeClick = () => {
    if (typeof window !== 'undefined') {
      window.open('https://www.youtube.com/@ONEFOCUSAFRICA', '_blank')
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative" style={{ paddingTop: '80px' }}>
      {/* CSS for animations and layout */}
      <style jsx>{`
        .hero-bg {
          position: relative;
          height: 650px;
          width: 100%;
          overflow: hidden;
        }
        
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        
        .slide.active {
          opacity: 1;
        }
        
        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 5;
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 40px 60px;
          gap: 60px;
        }
        
        .hero-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 800px;
        }
        
        .hero-right {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        
        .hero-tagline {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }
        
        .hero-tagline.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .youtube-button {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }
        
        .youtube-button.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .youtube-rect {
          transition: transform 0.3s ease;
        }
        
        .youtube-rect:hover {
          transform: scale(1.05);
        }
        
        .slide-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 15;
        }
        
        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        
        .indicator:hover {
          background: rgba(255, 255, 255, 0.8);
        }
        
        .indicator.active {
          background: #1F99ED;
          transform: scale(1.2);
        }
        
        @media (max-width: 992px) {
          .hero-content {
            flex-direction: column;
            padding: 30px 20px;
            gap: 30px;
          }
          
          .hero-left {
            text-align: center;
            max-width: 100%;
          }
          
          .hero-right {
            margin-top: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .hero-bg {
            height: 550px;
          }
        }
      `}</style>

      <div className="hero-bg">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        
        {/* Dark Overlay */}
        <div className="hero-bg-overlay" />
        
        {/* Content */}
        <div className="hero-content">
          {/* Left Side - Tagline */}
          <div className="hero-left">
            <Text 
              className={`hero-tagline !text-white mb-8 block ${subtitleVisible ? 'visible' : ''}`}
              style={{ 
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 700,
                textAlign: 'left',
                maxWidth: '800px',
                lineHeight: 1.5,
                textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                textTransform: 'capitalize',
              }}
            >
              ONEFOCUS AFRICA is a Pan-African Ecosystem Hub accelerating the growth of innovators, entrepreneurs, and professionals 
              through AI-powered guidance, mentorship, media, and real-world opportunities.
            </Text>
          </div>
          
          {/* Right Side - YouTube Button */}
          <div className="hero-right">
            <div 
              className={`youtube-button ${buttonVisible ? 'visible' : ''}`}
            >
              <div
                className="youtube-rect"
                style={{ cursor: 'pointer' }}
                onClick={handleYouTubeClick}
              >
                <svg
                  width="80"
                  height="50"
                  viewBox="0 0 80 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    background: "#FF0000",
                    borderRadius: "8px",
                    padding: "12px 20px"
                  }}
                >
                  <path d="M32 12.5V37.5L52 25L32 12.5Z" fill="white"/>
                </svg>
              </div>
            </div>
            
            <Text 
              className={`!text-white !text-sm block text-center ${buttonVisible ? 'visible' : ''}`}
              style={{ 
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              WATCH VOICE OF TOMORROW PODCAST<br />POWERED BY ONEFOCUS AFRICA
            </Text>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
