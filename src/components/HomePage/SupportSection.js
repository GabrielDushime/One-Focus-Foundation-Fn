import { Typography, Button, Card, Row, Col } from 'antd'

const { Title, Text, Paragraph } = Typography

const SupportSection = () => {
  const supportPackages = [
    {
      title: "Bronze Package",
      price: "25$",
      description: "Sponsor a student's participation in our workshops for one month.",
      bgColor: "bg-white"
    },
    {
      title: "Silver Package",
      price: "100$", 
      description: "Sponsor a full workshop session for Talented vision Dreamers",
      bgColor: "bg-white"
    },
    {
      title: "Gold Package",
      price: "500$",
      description: "Sponsor Africa youth empowerment campaign Summit with your name.",
      bgColor: "bg-white"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-7xl"
      
       style={{
          textAlign:'center',
          paddingTop:'20px',
        }}
      >
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
            SUPPORT OUR MISSION
          </Title>
        </div>
        
        {/* Support Packages Grid - Same responsive layout as ProgramsSection */}
        <Row 
          gutter={[
            { xs: 8, sm: 16, md: 20, lg: 24, xl: 20 }, 
            { xs: 20, sm: 24, md: 28, lg: 20 }
          ]} 
          justify="center" 
          align="stretch"
          className="w-full"
        >
          {supportPackages.map((pkg, index) => (
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
                className="w-full rounded-2xl border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 lg:hover:-translate-y-3 transition-all duration-300 overflow-hidden group"
                styles={{
                  body: { 
                    padding: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                   
                  }
                }}
                bodyStyle={{
                  padding: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  
                }}
                style={{
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '150px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 15px -3px rgba(18, 15, 15, 0.1), 0 4px 6px 2px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Card Content */}
                <div className="flex-1 flex flex-col p-4 sm:p-5 lg:p-6 text-center" style={{ flexGrow: 1 }}>
                  {/* Title */}
                  <Title 
                    level={3} 
                    className="mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl leading-tight text-center font-semibold"
                    style={{
                      color: '#1F99ED',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '16px',
                      marginTop: '10px',
                      marginBottom: '12px'
                    }}
                  >
                    {pkg.title}
                  </Title>
                  
                  {/* Price */}
                  <div className="mb-6" style={{ marginBottom: '24px' }}>
                    <span 
                      className="text-4xl lg:text-5xl font-bold text-black"
                      style={{
                        fontWeight: 'bold'
                      }}
                    >
                      {pkg.price}
                    </span>
                  </div>
                  
                  {/* Description - Flex grow to take available space */}
                  <div className="flex-1 mb-4 sm:mb-6" style={{ flexGrow: 1 }}>
                    <Paragraph 
                      className="text-gray-600 mb-0 text-xs sm:text-sm lg:text-base leading-relaxed text-center"
                      style={{
                        fontSize: '12px',
                        textAlign: 'center',
                        marginBottom: '0px'
                      }}
                    >
                      {pkg.description}
                    </Paragraph>
                  </div>
                  
                  {/* Button - Always at bottom */}
                  <div className="text-center mt-auto" style={{ marginBottom: '20px',marginTop:'20px' }}>
                    <Button
                      type="primary"
                      size="large"
                      className="bg-blue-500 border-blue-500 hover:bg-blue-600 font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[44px]"
                      style={{
                        borderRadius: '20px',
                        height: '30px',
                        fontSize: '12px'
                      }}
                    >
                      Donate Now
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center "
        style={{
              fontWeight: '600',
              marginTop:'20px'
            }}>
          <Text 
            className="text-gray-600 !text-lg"
            
          >
            For other donation options or to discuss sponsorship packages, please contact us
          </Text>
        </div>
      </div>
    </section>
  )
}

export default SupportSection