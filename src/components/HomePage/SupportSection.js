'use client'

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
      <div className="container mx-auto px-6 max-w-6xl"
        style={{
          textAlign:'center',
          paddingTop:'20px',
        }}
      >
        <Title level={2} className="text-center !mb-4 !text-3xl lg:!text-4xl font-bold  text-black">
          SUPPOORT OUR MISSION
        </Title>
        <Row gutter={[32, 32]} justify="center" className="mt-12">
          {supportPackages.map((pkg, index) => (
            <Col xs={24} md={12} lg={5} key={index}>
              <Card 
                className="text-center h-full rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 mx-2 md:mx-0"
                styles={{ body: { padding: '24px', backgroundColor: 'white' } }}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
                hoverable
              >
                <Title level={3} className="!text-blue-500 !mb-4 !text-xl lg:!text-2xl "
                  style={{
                    color:'#1F99ED ',
                    fontWeight:'bold',
                    textAlign:'center',
                    fontSize:'16px',
                    paddingTop:'0px'
                  }}
                >
                  {pkg.title}
                </Title>
                <div className="!mb-6">
                  <span className="text-4xl lg:text-5xl font-bold text-black"
                    style={{
                      fontWeight:'bold'
                    }}
                  >{pkg.price}</span>
                </div>
                <Paragraph className="text-gray-600 !mb-8 !text-base leading-relaxed"
                  style={{
                    fontSize:'12px'
                  }}
                >
                  {pkg.description}
                </Paragraph>
                <Button 
                  type="primary"
                  size="large"
                  className="bg-blue-500 border-blue-500 hover:bg-blue-600 !h-12 !px-8 font-semibold rounded-lg w-full"
                  style={{
                    borderRadius:'20px',
                    height:'30px',
                    fontSize:'12px'
                  }}
                >
                  Donate Now
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-12">
          <Text className="text-gray-600 !text-lg "
            style={{
              fontWeight:'600'
            }}
          >
            For other donation options or to discuss sponsorship packages, please contact us
          </Text>
        </div>
      </div>
    </section>
  )
}

export default SupportSection