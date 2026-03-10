import React from 'react';
import { Typography, Row, Col } from 'antd';
import Image from 'next/image';
import { Bold } from 'lucide-react';

const { Title, Paragraph } = Typography;

const ProgramsSection = () => {
  const programs = [
    {
      title: "INZIRA AI",
      description: "AI technology helps young people discover their personal passions and career paths through conversations in Kinyarwanda, English, and French.",
      image: "/INZIRA.png",
      color: "#1F99ED"
    },
    {
      title: "Workshops",
      description: "Experienced coaching with goal-oriented team dynamics for continuous progress and lasting motivation.",
      image: "/_NIY1931.jpg",
      color: "#1F99ED"
    },
    {
      title: "Mentorship Programs",
      description: "Connecting young talents with experienced mentors across Africa and the globe for personal and academic growth.",
      image: "/_NIY3164.jpg",
      color: "#1F99ED"
    },
    {
      title: "School Outreach",
      description: "Building confidence and career skills beyond the classroom through ONEFOCUS Africa Club.",
      image: "/scho.jpg",
      color: "#1F99ED"
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <Title 
            level={2} 
            className="!mb-2 !text-2xl md:!text-3xl font-bold"
            style={{
              fontWeight: 800,
              textAlign: 'center',
              color: '#1F99ED',
              marginBottom: '8px'
            }}
          >
            OUR PROGRAMS
          </Title>
          <div className="flex justify-center gap-2">
            <div className="h-1 w-8 bg-[#1F99ED] rounded-full"></div>
            <div className="h-1 w-16 bg-[#2E3192] rounded-full"></div>
            <div className="h-1 w-8 bg-[#1F99ED] rounded-full"></div>
          </div>
        </div>
        
        {/* 4 Programs in One Row - 1:1 Square Images */}
        <Row gutter={[16, 16]} justify="center">
          {programs.map((program, index) => (
            <Col xs={12} sm={12} md={6} lg={6} key={index}>
              <div 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col"
              >
                {/* 1:1 Square Image */}
                <div 
                  className="relative w-full"
                  style={{ 
                    paddingTop: '100%', // Creates 1:1 aspect ratio
                  }}
                >
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                {/* Content */}
                <div className="p-3" style={{ borderTop: `3px solid ${program.color}` }}>
                  {/* Title */}
                  <Title 
                    level={5} 
                    className="!mb-1 !text-base font-bold"
                    style={{ color: program.color }}
                  >
                    {program.title}
                  </Title>
                  
                  {/* Description */}
                  <Paragraph 
                    className="text-gray-600 text-xs leading-relaxed !mb-0"
                    style={{ lineHeight: 1.5 }}
                  >
                    {program.description}
                  </Paragraph>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Final Message - Gradient background */}
        <div 
          className="text-center mt-10 rounded-lg"
          style={{
            padding: '24px 16px',
            background: 'linear-gradient(135deg, #1F99ED 100%)'
          }}
        >
          <p 
            className="!text-white !text-base md:!text-lg font-bold !mb-0"
            style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 1.5, color: '#FFFFFF' , fontWeight:Bold }}
          >
            We are building the future pathway of Africa's next creators, leaders, and innovators.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
