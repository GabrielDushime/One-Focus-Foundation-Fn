'use client'

import { Typography, Button, Card, Row, Col } from 'antd'
import Image from 'next/image'

const { Title, Paragraph } = Typography

const GetInvolvedSection = () => {
  const getInvolvedOptions = [
    {
      title: "Volunteer With Us",
      description: "Be a mentor, trainer, or support team member. Shape the future with us.",
      buttonText: "Sign Up",
      image: "/Volunter.svg",
      bgColor: "bg-white"
    },
    {
      title: "Partner With Us", 
      description: "We welcome schools, NGOs, companies, and individuals to sponsor or co-host events.",
      buttonText: "Partner Now",
      image: "/handshake-icon-concept-partnership-agreement.jpg", 
      bgColor: "bg-white"
    },
    {
      title: "Join as a Mentor",
      description: "Share your wisdom with aspiring youth. One session could change a life.",
      buttonText: "Apply Today", 
      image: "/Mentor.svg", 
      bgColor: "bg-white"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <Title level={2} className="text-center !mb-16 !text-3xl lg:!text-4xl font-bold text-black"
          style={{
            textAlign:'center',
            fontWeight:'bold',
            paddingTop:'20px'
          }}
        >
          GET INVOLVED
        </Title>
        <Row gutter={[32, 32]} justify="center">
          {getInvolvedOptions.map((option, index) => (
            <Col xs={24} md={12} lg={5} key={index}>
              <Card 
                className="text-center h-full rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300"
                style={{
                  width: '250px',
                  margin: '0 auto'
                }}
                hoverable
              >
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        marginLeft:'30%'
                      }}
                    >
                      <Image
                        src={option.image}
                        alt={option.title}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full p-2"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-blue-500 flex items-center justify-center" style={{ display: 'none' }}>
                        <span className="text-white text-2xl font-bold">
                          {index === 0 ? '🤝' : index === 1 ? '🤝' : '👤'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Title level={3} className="!text-blue-600 !mb-4 !text-xl lg:!text-2xl font-bold"
                  style={{
                    color:'#1F99ED ',
                    fontWeight:'bold',
                    textAlign:'center',
                    fontSize:'16px',
                    margin: '0 0 10px 0'
                  }}
                >
                  {option.title}
                </Title>
                <Paragraph className="text-gray-600 !mb-8 !text-base leading-relaxed"
                  style={{
                    textAlign:'center',
                    fontSize:'12px',
                    margin: '0 0 5px 0',
                    lineHeight: '1.4'
                  }}
                >
                  {option.description}
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  className="bg-onefocus-primary-dark border-onefocus-primary-dark hover:bg-blue-800 !h-12 !px-8 font-semibold rounded-lg"
                  style={{
                    fontWeight: 'bold',
                    height: '30px',
                    borderRadius: '20px',
                    marginTop: '20px',
                    fontSize: '12px',
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {option.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default GetInvolvedSection