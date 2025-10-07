import { Typography, Button, Card, Row, Col, Input, message } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Image from 'next/image'
import { API_ENDPOINTS } from '@/config/api'

const { Title, Text, Paragraph } = Typography

const BottomSections = () => {
  const [chatVisible, setChatVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const testimonials = [
    { 
      name: "Alphonse", 
      text: "A real leader is someone who creates opportunities for others to grow, shine, and eventually lead on their own. If your influence dies with you, then you have not led you have only managed.",
      image: "/Alphonse.jpeg" 
    },
    { 
      name: "Grace", 
      text: "We dare, we do, and we move forward — with purpose, passion, and vision. Every step we take is a step toward progress. The journey continues, and we're just getting started.",
      image: "/grace.jpeg" 
    },
    { 
      name: "Nicolas", 
      text: "When you start feeling those fears, pause and reflect on them. Try to understand where they're coming from and what's triggering them. Awareness is the first step to overcoming what's holding you back.",
      image: "/Nicolas.jpeg" 
    }
  ]

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'flex';
    }
  }

  const handleSubscribe = async () => {
    if (!email) {
      message.warning('Please enter your email address')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(API_ENDPOINTS.SUBSCRIBE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        message.success(data.message || 'Thank you for subscribing! You will receive our latest updates.')
        setEmail('') // Clear the input
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          message.warning(data.message || 'This email is already subscribed')
        } else {
          message.error(data.message || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Subscribe error:', error)
      message.error('Failed to subscribe. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe()
    }
  }

  return (
    <>
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl" >
          
          {/* Testimonials Grid - Same responsive layout as ProgramsSection */}
          <Row 
            gutter={[
              { xs: 8, sm: 16, md: 20, lg: 24, xl: 20 }, 
              { xs: 20, sm: 24, md: 28, lg: 20 }
            ]} 
            justify="center" 
            align="stretch"
            className="w-full"
          >
            {testimonials.map((testimonial, index) => (
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
                      marginTop: '20px',
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
                    minHeight: '320px',
                    backgroundColor: 'white'
                  }}
                >
                  {/* Card Content */}
                  <div className="flex-1 flex flex-col p-4 sm:p-5 lg:p-6 text-center" style={{ flexGrow: 1 }}>
                    {/* Profile Image */}
                    <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-6 overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                        className="object-cover w-full h-full"
                        onError={handleImageError}
                      />
                      <div className="w-full h-full bg-gray-400 flex items-center justify-center" style={{ display: 'none' }}>
                        <Text className="text-white text-xs">Photo</Text>
                      </div>
                    </div>
                    
                    {/* Name */}
                    <Title 
                      level={3} 
                      className="mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl leading-tight text-center font-semibold"
                      style={{
                        color: '#2E3192',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginTop: 0,
                        marginBottom: '12px'
                      }}
                    >
                      {testimonial.name}
                    </Title>
                    
                    {/* Testimonial Text - Flex grow to take available space */}
                    <div className="flex-1 mb-4 sm:mb-6" style={{ flexGrow: 1 }}>
                      <Paragraph 
                        className="text-gray-600 mb-0 text-xs sm:text-sm lg:text-base leading-relaxed text-center"
                        style={{
                          fontWeight: '600',
                          fontSize: '12px',
                          textAlign: 'center',
                          marginBottom: '0px'
                        }}
                      >
                        {testimonial.text}
                      </Paragraph>
                    </div>
                    
                    {/* Quote Symbol - Always at bottom */}
                    <div className="text-center ">
                      <div 
                        className="text-6xl opacity-90 leading-none transform scale-x-[-1]"
                        style={{
                          fontSize: '40px',
                          color: '#2E3192',
                          WebkitTextFillColor: '#2E3192',
                          textShadow: 'none',
                          marginBottom:'60px'
                        }}
                      >
                        ❝
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

       {/* Newsletter Section */}
      <section className="py-20" style={{ background: '#1F99ED' }}>
        <div className="container mx-auto px-6 max-w-4xl text-center"
          style={{
            textAlign:'center',
            marginTop:'0px',
          }}
        >
          <Title level={2} className="!text-white !mb-6 !text-3xl lg:!text-4xl font-bold"
            style={{
              fontWeight:'bold',
              fontSize:'20px',
              color:'white',
              paddingTop:'10px'
            }}
          >
            Stay Connected
          </Title>
          <Text className="!text-white !text-lg lg:!text-xl block mb-12 font-light"
            style={{
              color:'white',
            }}
          >
            Join our monthly newsletter to get stories of hope and youth transformation.
          </Text>
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-2 shadow-lg max-w-md w-full flex items-center"
             style={{
                width: '450px',
                maxWidth: '90%',
                margin: '0 auto',
                marginTop:'15px'
              }}
            >
              <Input
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="flex-1 border-0 bg-transparent text-lg px-4"
                style={{ 
                  boxShadow: 'none',
                  outline: 'none',
                  height:'40px',
                  borderRadius:'20px 0 0 20px',
                  border: 'none',
                  backgroundColor: 'white',
                  fontSize: 'clamp(12px, 3vw, 16px)',
                  marginTop:"10px" ,
                  marginBottom:'10px'
                }}
              />
              <Button
                type="primary"
                loading={loading}
                onClick={handleSubscribe}
                className="bg-black border-black hover:bg-gray-800 font-semibold rounded-full px-6 py-2 ml-2"
                style={{
                  borderRadius: '0 20px 20px 0px',
                  height:'40px',
                  backgroundColor:'black',
                  maxWidth:'150px',
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-12 md:py-16" style={{ background: 'black' }}>
        <div className="container mx-auto px-6 max-w-7xl"
        style={{
      marginBottom:'10px',
     

        }}>
          {/* Desktop and Tablet Layout */}
          <div 
            className="hidden md:flex"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: '30px',
              flexWrap: 'wrap'
            }}>
            {/* Title with vertical line - Left side */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              minWidth: 'fit-content'
            }}>
              <Title level={2} className="!text-white !mb-0 !text-2xl md:!text-3xl font-bold"
                style={{
                  fontWeight:'bold',
                  fontSize: 'clamp(20px, 4vw, 30px)',
                  color:'white',
                  margin: '0',
                  whiteSpace: 'nowrap'
                }}
              >
                Our Partners
              </Title>
              
              {/* Vertical white line next to text */}
              <div style={{
                width: '1px',
                height: '80px',
                backgroundColor: 'white',
                display: 'block'
              }}></div>
            </div>

            {/* Partner Logos - Horizontal row */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              alignItems: 'center',
              flexWrap: 'wrap',
              flex: 1,
              marginTop:'20px'
            }}>
              {/* Partner 1-8 */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div 
                  key={num}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'white',
                    borderRadius: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  className="hover:scale-110 hover:shadow-xl"
                >
                  <Image
                    src="/logo.svg"
                    alt={`Partner ${num}`}
                    width={80}
                    height={80}
                    style={{
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Fixed Chat Button */}
    {/*   <Button 
        type="primary"
        shape="round"
        size="large"
        icon={<CommentOutlined />}
        className="bg-blue-600 border-blue-600 hover:bg-blue-700 shadow-2xl flex items-center !h-14 !px-6 !text-lg font-semibold"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999
        }}
        onClick={() => setChatVisible(!chatVisible)}
      >
        Let&apos;s Chat!
      </Button> */}
    </>
  )
}

export default BottomSections