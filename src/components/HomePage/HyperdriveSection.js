import React from 'react';
import { Typography, Row, Col } from 'antd';
import Image from "next/image";

const { Title, Paragraph } = Typography;

const HyperdriveSection = () => {
  return (
    <section className="py-16 bg-white">
      {/* CSS for responsive design */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hyperdrive-section {
            padding: 40px 15px !important;
          }
          .hyperdrive-title {
            font-size: 28px !important;
          }
          .hyperdrive-subtitle {
            font-size: 16px !important;
          }
          .hyperdrive-image {
            height: 500px !important;
            margin-bottom: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .hyperdrive-image {
            height: 450px !important;
          }
        }
        @media (min-width: 1024px) {
          .hyperdrive-image {
            height: 550px !important;
          }
        }
      `}</style>

<div className="hyperdrive-section container mx-auto max-w-6xl px-4">
        <Row gutter={[48, 48]} align="middle">
          {/* LEFT SIDE - IMAGE */}
          <Col xs={24} lg={12}>
<div className="hyperdrive-image relative w-full h-[550px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/young.jpg"
                alt="Hyperdrive Event"
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </Col>

          {/* RIGHT SIDE - CONTENT */}
          <Col xs={24} lg={12}>
            <div className="bg-white">
              <Title 
                level={2} 
                className="hyperdrive-title !text-4xl font-extrabold !text-blue-600 !mb-2"
                style={{ color: '#1F99ED' }}
              >
                HYPERDRIVE
              </Title>
              <Paragraph className="hyperdrive-subtitle !text-lg font-semibold !text-gray-700 !mb-6">
                by ONEFOCUS AFRICA
              </Paragraph>

              <Paragraph className="!text-gray-600 !mb-4">
                HYPERDRIVE is a weekly youth empowerment experience created to 
                connect young people and experienced professionals in one powerful 
                space for learning, sharing, and growth.
              </Paragraph>

              <Paragraph className="!text-gray-600 !mb-4">
                The program helps youth discover dream careers, build confidence, 
                and receive practical guidance by speaking and pitching ideas.
              </Paragraph>

              <Paragraph className="!text-gray-600 !mb-6">
                Participants share ideas, business concepts, personal stories, 
                and career ambitions while receiving real-time feedback from mentors.
              </Paragraph>

{/* EXPERIENCE LIST */}
              <div className="mb-8" style={{ padding: '20px 24px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <Title level={4} className="!text-xl font-bold !mb-4" style={{ marginBottom: '16px', textAlign: 'center' }}>
                  What You'll Experience
                </Title>
                <div className="flex flex-wrap justify-center items-center gap-4 text-gray-700" style={{ gap: '20px', justifyContent: 'center' }}>
                  <span className="flex items-center gap-2 font-bold" style={{ fontWeight: 700 }}>
                    <span className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></span>
                    <span>Youth Pitches</span>
                  </span>
                  <span className="text-gray-400" style={{ color: '#94a3b8' }}>•</span>
                  <span className="flex items-center gap-2 font-bold" style={{ fontWeight: 700 }}>
                    <span className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></span>
                    <span>Expert Mentors</span>
                  </span>
                  <span className="text-gray-400" style={{ color: '#94a3b8' }}>•</span>
                  <span className="flex items-center gap-2 font-bold" style={{ fontWeight: 700 }}>
                    <span className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></span>
                    <span>Storytelling</span>
                  </span>
                </div>
              </div>

              {/* PURPOSE SECTION */}
              <div 
                className="text-white p-6 rounded-xl shadow-lg"
              >
                <Title level={3} className="!text-2xl font-bold !text-white !mb-3">Purpose</Title>
                <Paragraph className="!text-white !mb-0">
                  HYPERDRIVE aligns with ONEFOCUS AFRICA&apos;s mission to discover,
                  nurture, and empower African youth. It is not just an event,
                it is a launchpad for Africa&apos;s next generation of leaders,
                  creators, and innovators.
                </Paragraph>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HyperdriveSection;
