import { Typography, Button, Card, Row, Col } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Image from 'next/image'

const { Title, Text, Paragraph } = Typography

const EventsSection = ({ onRegister, onPartner, onViewSchedule }) => {
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

  const handleButtonClick = (buttonText) => {
    if (buttonText === "Register Now" && onRegister) {
      onRegister()
    } else if (buttonText === "Partner with us" && onPartner) {
      onPartner()
    } else if (buttonText === "View Schedule" && onViewSchedule) {
      onViewSchedule()
    }
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <Title 
            level={2} 
            className="!mb-4 !text-2xl md:!text-3xl lg:!text-4xl xl:!text-5xl font-bold text-black !leading-tight"
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            EVENTS
          </Title>
        </div>
        
        {/* Events Grid */}
        <Row 
          gutter={[
            { xs: 8, sm: 16, md: 20, lg: 24, xl: 20 }, 
            { xs: 20, sm: 24, md: 28, lg: 20 }
          ]} 
          justify="center" 
          align="stretch"
          className="w-full"
        >
          {events.map((event, index) => (
            <Col 
              xs={24} 
              sm={12} 
              md={12} 
              lg={8} 
              xl={8}
              key={index}
              className="flex"
              style={{ display: 'flex' }}
            >
              <Card 
                className="w-full rounded-2xl border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 lg:hover:-translate-y-3 transition-all duration-300 overflow-hidden group bg-[#1F99ED]"
                styles={{
                  body: { 
                    padding: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }
                }}
                bodyStyle={{
                  padding: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                style={{
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '320px'
                }}
              >
                
                <div 
                  className="relative w-full overflow-hidden" 
                  style={{ 
                    margin: 0, 
                    padding: 0, 
                    height: '150px',
                    minHeight: '150px',
                    maxHeight: '150px',
                    flexShrink: 0,  
                    flexGrow: 0     
                  }}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                      width: '100%',
                      height: '100%'
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback background */}
                  <div 
                    className={`absolute inset-0 ${event.bgColor} flex items-center justify-center`} 
                    style={{ 
                      display: 'none',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <Text className="text-white text-base md:text-lg font-semibold z-10">
                      {event.title}
                    </Text>
                  </div>
                </div>

                {/* Card Content - Flex grow to fill remaining space */}
                <div className="flex-1 flex flex-col p-4 sm:p-5 lg:p-6" style={{ flexGrow: 1 }}>
                  {/* Title */}
                  <Title 
                    level={3} 
                    className="text-white mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl leading-tight text-center font-semibold"
                    style={{
                      fontSize: '15px',
                      marginTop: '10px',
                      color: 'white',
                      marginBottom: '12px'
                    }}
                  >
                    {event.title}
                  </Title>
                  
                  {/* Description - Flex grow to take available space */}
                  <div className="flex-1 mb-4 sm:mb-6" style={{ flexGrow: 1 }}>
                    <Paragraph 
                      className="text-black mb-0 text-xs sm:text-sm lg:text-base leading-relaxed text-left"
                      style={{
                        color: 'black',
                        textAlign: 'left',
                        marginLeft:'10px',
                        marginBottom:'0px'
                      }}
                    >
                      {event.description}
                    </Paragraph>
                  </div>
                  
                  {/* Button - Always at bottom */}
                  <div className="text-center mt-auto" style={{ marginBottom: '20px' }}>
                    <Button
                      type="primary"
                      size="large"
                      className="bg-white text-blue-600 border-white hover:bg-gray-100 hover:text-blue-700 font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[44px] group/btn"
                      onClick={() => handleButtonClick(event.buttonText)}
                    >
                      <span>{event.buttonText}</span>
                      <ArrowRightOutlined className="text-xs transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
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