'use client'

import { Typography, Button, Card, Row, Col } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Image from 'next/image'

const { Title, Text, Paragraph } = Typography

const EventsSection = () => {
  const events = [
    {
      title: "Online Empowerment Conference Africa",
      description: "Join us for our flagship event bringing together young talents from across Africa.",
      buttonText: "Register Now",
      image: "/Conference Africa.png",
      bgColor: "bg-blue-500"
    },
    {
      title: "School Outreach & Dream Career Club Program", 
      description: "To identify, inspire, and nurture brilliant students across schools.",
      buttonText: "Partner with us",
      image: "/2.png", 
      bgColor: "bg-blue-600"
    },
    {
      title: "Weekly Workshops",
      description: "Join our regular skills development workshops at Kigali-Rwanda.",
      buttonText: "View Schedule", 
      image: "/8.png", 
      bgColor: "bg-blue-700"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <Title level={2} className="text-center !mb-16 !text-3xl lg:!text-4xl font-bold text-black"
          style={{
            textAlign:'center',
            fontWeight:'bold',
            paddingTop:'20px'
          }}
        >
          EVENTS
        </Title>
        <Row gutter={[32, 32]} justify="center" align="middle">
          {events.map((event, index) => (
            <Col xs={24} md={12} lg={5} key={index}>
              <Card 
                hoverable
                className="h-full overflow-hidden rounded-2xl shadow-lg border-0"
                style={{
                  width: '250px',
                  margin: '0 auto'
                }}
                cover={
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={250}
                      height={150}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={`h-48 ${event.bgColor} flex items-center justify-center relative`} style={{ display: 'none' }}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <Text className="text-white text-lg font-semibold z-10">Event Image</Text>
                    </div>
                  </div>
                }
                styles={{ body: { padding: '12px 24px', background: ' #1F99ED ' } }}
              >
                <div className="text-center">
                  <Title level={3} className="!text-blue-600 !mb-4 !text-xl lg:!text-2xl font-bold"
                    style={{
                      color:'white', 
                      fontWeight:'bold',
                      textAlign:'center',
                      fontSize:'12px',
                      margin: '0 0 10px 0'
                    }}
                  >
                    {event.title}
                  </Title>
                  <Paragraph className="text-gray-600 !mb-8 !text-base leading-relaxed"
                    style={{
                      color:'white',
                      textAlign:'center',
                      fontSize:'10px',
                      fontWeight:'500',
                      margin: '0 0 5px 0',
                      lineHeight: '1.4'
                    }}
                  >
                    {event.description}
                  </Paragraph>
                  <Button 
                    type="primary" 
                    size="large"
                    className="bg-blue-500 border-blue-500 hover:bg-blue-600 !h-8 !px-4 font-semibold rounded-lg"
                    style={{
                      fontWeight:'bold',
                      height:'20px',
                      borderRadius:'10px',
                      marginLeft:'30px',
                      marginTop:'20px',
                      fontSize: '12px',
                      color:'black',
                      background:'white'
                    }}
                  >
                    {event.buttonText} <ArrowRightOutlined />
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default EventsSection