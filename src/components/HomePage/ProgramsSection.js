'use client'

import { Typography, Button, Card, Row, Col } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Image from 'next/image'

const { Title, Text, Paragraph } = Typography

const ProgramsSection = ({ onJoinUs, onBookUs, onGetInvolved }) => {
  const programs = [
    {
      title: "Workshops",
      description: "Since February 1st, 2025, we've launched workshops and workplace at National Training center. These sessions include public speaking, art, design, music, and business skills.",
      buttonText: "Join Us",
      image: "/Workshop Presentation_edited.jpg",
      bgColor: "bg-blue-500"
    },
    {
      title: "Voice of Tomorrow Podcast", 
      description: "A storytelling platform hosted on Spotify and YouTube, where youth share dreams, challenges, and success stories.",
      buttonText: "Book now",
      image: "/11.png", 
      bgColor: "bg-blue-600"
    },
    {
      title: "Mentorship Program",
      description: "To guide, empower, and accelerate the personal, academic, and creative growth of young talents by connecting them with experienced mentors in various fields across Africa and the globe.",
      buttonText: "Get Involved",
      image: "/Mentorship.jpg", 
      bgColor: "bg-orange-500"
    }
  ]

  const handleButtonClick = (buttonText) => {
    if (buttonText === "Join Us" && onJoinUs) {
      onJoinUs()
    } else if (buttonText === "Book now" && onBookUs) {
      onBookUs()
    } else if (buttonText === "Get Involved" && onGetInvolved) {
      onGetInvolved()
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <Title level={2} className="text-center !mb-16 !text-3xl lg:!text-4xl font-bold text-black"
          style={{
            textAlign:'center',
            fontWeight:'bold',
            paddingBottom:'10px'
          }}
        >
          OUR PROGRAMS
        </Title>
        
        <div className="flex justify-center">
          <div className="inline-flex gap-2.5">
            <Row gutter={[20, 20]} justify="center" align="middle">
              {programs.map((program, index) => (
                <Col xs={24} md={12} lg={5} key={index}>
                  <Card 
                    hoverable
                    className="h-full overflow-hidden rounded-2xl shadow-lg border-0"
                    style={{
                      width: '250px',
                      margin: '0 auto'
                    }}
                    cover={
                      <div className="h-32 relative overflow-hidden">
                        <Image
                          src={program.image}
                          alt={program.title}
                          width={250}
                          height={130} 
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className={`h-32 ${program.bgColor} flex items-center justify-center relative`} style={{ display: 'none' }}>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <Text className="text-white text-lg font-semibold z-10">Program Image</Text>
                        </div>
                      </div>
                    }
                    styles={{ body: { padding: '16px 12px', background: ' #1F99ED ' } }}
                  >
                    <div className="text-center">
                      <Title level={3} className="!text-blue-600  !text-lg font-bold"
                        style={{
                          color:'white',
                          fontWeight:'bold',
                          textAlign:'center',
                          fontSize:'12px',
                          margin: '0 0 12px 0'
                        }}
                      >
                        {program.title}
                      </Title>
                      <Paragraph className="text-gray-600 !mb-4 !text-sm leading-relaxed"
                        style={{
                          color:'white',
                          textAlign:'center',
                          fontSize:'10px',
                          fontWeight:'500',
                          margin: '0 0 16px 0',
                          lineHeight: '1.4'
                        }}
                      >
                        {program.description}
                      </Paragraph>
                      <Button 
                        type="primary" 
                        size="small"
                        className="bg-white text-blue-600 border-white hover:bg-gray-100 !h-8 !px-4 font-semibold rounded-lg"
                        style={{
                          fontWeight:'600',
                          float:'right',
                          fontSize: '12px'
                        }}
                        onClick={() => handleButtonClick(program.buttonText)}
                      >
                        {program.buttonText} <ArrowRightOutlined />
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection