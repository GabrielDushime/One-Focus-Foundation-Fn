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
      image: "/volunter.jpg",
      bgColor: "bg-white"
    },
    {
      title: "Partner With Us", 
      description: "We welcome schools, NGOs, companies, and individuals to sponsor or co-host events.",
      buttonText: "Partner Now",
      image: "/handshake.jpg", 
      bgColor: "bg-white"
    },
    {
      title: "Join as a Mentor",
      description: "Share your wisdom with aspiring youth. One session could change a life.",
      buttonText: "Apply Today", 
      image: "/Mentor.jpg", 
      bgColor: "bg-white"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl"
        style={{
          textAlign:'center',
          paddingTop:'20px',
        }}
      >
        <Title level={2} className="text-center !mb-4 !text-3xl lg:!text-4xl font-bold text-black"
          style={{
            textAlign:'center',
            fontWeight:'bold',
           
          }}
        >
          GET INVOLVED
        </Title>
        
         <Row 
          gutter={[
            { xs: 8, sm: 16, md: 20, lg: 24, xl: 20 }, 
            { xs: 20, sm: 24, md: 28, lg: 20 }
          ]} 
          justify="center" 
          align="stretch"
          className="w-full"
        >
          {getInvolvedOptions.map((option, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card 
                className="text-center h-full rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 mx-2 md:mx-0"
                styles={{ body: { padding: '24px', backgroundColor: 'white' } }}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px 2px rgba(0, 0, 0, 0.05)'
                }}
                hoverable
              >
                <div className="!mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
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
                
                <Title level={3} className="!text-blue-500 !mb-4 !text-xl lg:!text-2xl"
                  style={{
                    color:'#1F99ED',
                    fontWeight:'bold',
                    textAlign:'center',
                    fontSize:'16px',
                    paddingTop:'0px'
                  }}
                >
                  {option.title}
                </Title>
                
                <Paragraph className="text-gray-600 !mb-8 !text-base leading-relaxed"
                  style={{
                    fontSize:'12px'
                  }}
                >
                  {option.description}
                </Paragraph>
                
                <Button
                  type="primary"
                  size="large"
                  className="bg-blue-500 border-blue-500 hover:bg-blue-600 !h-12 !px-8 font-semibold rounded-lg w-50"
                  style={{
                    borderRadius:'20px',
                    height:'30px',
                    fontSize:'12px',
                    marginBottom:'20px'
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