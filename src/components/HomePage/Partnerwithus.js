import React, { useState, useRef } from 'react';
import { Typography, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

const STATS = [
  { value: '54', label: 'African Nations' },
  { value: '1.4B', label: 'People & Growing' },
  { value: '60%', label: 'Under 25 Years Old' },
];

const Partnerwithus = () => {
  const videoRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="py-16 mb-16" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eaf6 50%, #f5f7fa 100%)' }}>
      <style jsx>{`
        .video-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: linear-gradient(160deg, #1a2a4a 0%, #0d1a2d 40%, #1a2d4a 70%, #0a1530 100%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(30, 60, 114, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .play-overlay:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .play-circle {
          width: 80px;
          height: 80px;
          background: rgba(31, 153, 237, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 8px 30px rgba(31, 153, 237, 0.5);
        }
        
        .play-circle svg {
          width: 32px;
          height: 32px;
        }
        
        @media (max-width: 768px) {
          .stat-value {
            font-size: 24px;
          }
          .play-circle {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>

      <div className="container mx-auto max-w-6xl px-4">
        <Row gutter={[48, 48]} align="middle">
          {/* LEFT SIDE - TEXT CONTENT */}
          <Col xs={24} lg={12}>
            <div>
              <Title 
                level={2} 
                style={{ 
                  color: '#1F99ED',
                  fontWeight: 800,
                  fontSize: '40px',
                  marginBottom: '8px',
                  lineHeight: 1.2
                }}
              >
                Investing in Youth
              </Title>
              <Title 
                level={2} 
                style={{ 
                  color: '#2E3192',
                  fontWeight: 800,
                  fontSize: '40px',
                  marginBottom: '20px',
                  lineHeight: 1.2
                }}
              >
                is Investing in Africa's Future
              </Title>

              <Paragraph style={{ fontSize: '15px', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
                Every generation carries the seed of transformation. Water it. Nurture it. Watch Africa rise through the power of youth innovation and leadership.
              </Paragraph>

              {/* Stats */}
              <Row gutter={[12, 12]} style={{ marginBottom: '20px' }}>
                {STATS.map((stat, index) => (
                  <Col xs={8} key={index}>
                    <div className="stats-card" style={{
                      background: 'white',
                      padding: '20px 24px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}>
                      <div className="stat-value" style={{
                        fontSize: '32px',
                        fontWeight: 800,
                        color: '#1F99ED',
                        lineHeight: 1
                      }}>{stat.value}</div>
                      <div className="stat-label" style={{
                        fontSize: '12px',
                        color: '#64748b',
                        marginTop: '6px',
                        fontWeight: 500
                      }}>{stat.label}</div>
                    </div>
                  </Col>
                ))}
              </Row>

              {/* 2-Column, 2-Row Grid Layout with Blue Bullets */}
              <Row gutter={[24, 16]}>
                {/* Column 1 */}
                <Col xs={12}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="bullet-circle" style={{
                        width: '10px',
                        height: '10px',
                        background: '#1F99ED',
                        borderRadius: '50%',
                        flexShrink: 0
                      }}></div>
                      <Text strong style={{ fontSize: '15px', color: '#2E3192' }}>Become a Partner</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="bullet-circle" style={{
                        width: '10px',
                        height: '10px',
                        background: '#1F99ED',
                        borderRadius: '50%',
                        flexShrink: 0
                      }}></div>
                      <Text strong style={{ fontSize: '15px', color: '#2E3192' }}>Sponsor HYPERDRIVE</Text>
                    </div>
                  </div>
                </Col>
                {/* Column 2 */}
                <Col xs={12}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="bullet-circle" style={{
                        width: '10px',
                        height: '10px',
                        background: '#1F99ED',
                        borderRadius: '50%',
                        flexShrink: 0
                      }}></div>
                      <Text style={{ fontSize: '15px', color: '#2e3192' }}>Sponsor a School Outreach Impact</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="bullet-circle" style={{
                        width: '10px',
                        height: '10px',
                        background: '#1F99ED',
                        borderRadius: '50%',
                        flexShrink: 0
                      }}></div>
                      <Text style={{ fontSize: '15px', color: '#2e3192' }}>Join as Mentor</Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* RIGHT SIDE - VIDEO */}
          <Col xs={24} lg={12}>
            <div 
              className="video-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <video 
                ref={videoRef}
                src="/best.mp4"
                muted
                loop
                playsInline
              />
              <div className="play-overlay">
                <div className="play-circle">
                  <svg viewBox="0 0 32 32" fill="white">
                    <polygon points="8,5 27,16 8,27"/>
                  </svg>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Accent Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #1F99ED 0%, #2E3192 50%, #1F99ED 100%)'
      }}></div>
    </section>
  );
};

export default Partnerwithus;
