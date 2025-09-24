import { Typography, Button, Row, Col } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Title, Paragraph } = Typography

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50 about-section"
      style={{
        padding:'35px',
      }}
    >
      {/* CSS for responsive design */}
      <style jsx>{`
        .about-section {
          padding: 35px !important;
        }

        @media (max-width: 1023px) {
          .about-section {
            padding: 25px 15px !important;
            padding-top: 50px !important;
            padding-bottom: 50px !important;
          }
          
          .about-title {
            font-size: 22px !important;
            padding-top: 20px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          
          .about-subtitle {
            font-size: 16px !important;
          }
          
          .about-content {
            font-size: 14px !important;
            padding-right: 15px !important;
          }
          
          .about-left-card {
            padding: 24px !important;
            margin-bottom: 20px !important;
          }
          
          .about-right-card {
            padding: 24px !important;
          }
        }
        
        @media (max-width: 768px) {
          .about-section {
            padding: 20px 10px !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          
          .about-title {
            font-size: 20px !important;
            padding-top: 15px !important;
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
          
          .about-subtitle {
            font-size: 15px !important;
          }
          
          .about-content {
            font-size: 13px !important;
            padding-right: 10px !important;
          }
          
          .about-left-card {
            padding: 20px !important;
            margin-bottom: 15px !important;
          }
          
          .about-right-card {
            padding: 20px !important;
          }
          
          .about-button {
            height: 40px !important;
            padding: 0 24px !important;
            font-size: 14px !important;
          }
        }
        
        @media (max-width: 480px) {
          .about-section {
            padding: 15px 5px !important;
            padding-top: 30px !important;
            padding-bottom: 30px !important;
          }
          
          .about-title {
            font-size: 18px !important;
            padding-top: 12px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          
          .about-subtitle {
            font-size: 14px !important;
          }
          
          .about-content {
            font-size: 12px !important;
            padding-right: 8px !important;
          }
          
          .about-left-card {
            padding: 16px !important;
            margin-bottom: 12px !important;
          }
          
          .about-right-card {
            padding: 16px !important;
          }
          
          .about-button {
            height: 36px !important;
            padding: 0 20px !important;
            font-size: 13px !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-6 max-w-6xl">
        <Row gutter={[48, 32]} align="middle">
          <Col xs={24} lg={12}>
            <div 
              className="about-left-card text-white p-8 lg:p-12 rounded-2xl shadow-xl"
              style={{ background: 'linear-gradient(135deg, #2E3192 10%,#1F99ED 40% )',paddingBottom:'20px' }}
            >
              <Title level={2} className="about-title !text-white !mb-6 !text-2xl lg:!text-3xl font-bold"
                style={{
                  paddingTop:'30px',
                  paddingLeft:'30px',
                  paddingRight:'30px',
                  textAlign:'center',
                  color:'white'
                }}
              >
                Empowering Young Talents Across Rwanda and Africa
              </Title>
              <Paragraph className="about-subtitle !text-white !mb-8 !text-lg font-medium"
                style={{
                  fontWeight:'700',
                  textAlign:'center',
                }}
              >
                Empowering Dreams, Shaping Futures
              </Paragraph>
              <Link href="/about">
                <Button
                  size="large"
                  className="about-button bg-white text-blue-600 border-white hover:bg-gray-100 hover:text-blue-700 !h-12 !px-8 font-semibold"
                  style={{
                    fontWeight:'500',
                    textAlign: 'center',
                    display: 'block',
                    margin: '0 auto',
                  }}
                >
                  Read More <ArrowRightOutlined />
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="about-right-card bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
              <Paragraph className="about-content text-gray-700 !text-lg leading-relaxed !mb-0"
                style={{
                  fontSize:'15px',
                  paddingRight:'20px'
                }}
              >
                ONEFOCUS is dedicated to discovering and nurturing young talents across 
                Rwanda and Africa, offering opportunities in fields such as Artists Talents, 
                Performing Arts, Academic and Intellectual Talents, Sports and Physical Talents, 
                Entrepreneurship and Business skills talents, Traditional and Cultural talent, 
                Technology and Digital talents, Social and community Impact Talents and many 
                more careers. Through talent discovery events, media exposure, and mentorship, 
                we provide long-term support for children to develop their skills and gain recognition.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default AboutSection