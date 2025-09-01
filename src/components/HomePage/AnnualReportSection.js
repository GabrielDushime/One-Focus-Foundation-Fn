'use client'

import { Typography, Button } from 'antd'

const { Text } = Typography

const AnnualReportSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6 max-w-6xl text-center"
        style={{
          textAlign:'center'
        }}
      >
        <style jsx>{`
          .annual-report-button {
            background: #2E3192 !important;
            border-color: #2E3192 !important;
            margin-top: 20px;
            border-radius: 5px;
            font-weight: bold;
            white-space: normal;
            line-height: 1.2;
            
            /* Desktop styles */
            height: 40px;
            width: 25%;
            font-size: 12px;
            padding: 8px 12px;
            
          }
          
          @media (max-width: 768px) {
            .annual-report-button {
              height: auto !important;
              min-height: 50px;
              width: auto !important;
              min-width: 280px;
              max-width: 90%;
              font-size: 14px !important;
              padding: 12px 16px !important;
            }
          }
          
          @media (max-width: 480px) {
            .annual-report-button {
              min-width: 260px;
              max-width: 95%;
              font-size: 13px !important;
            }
          }
        `}</style>
        <Button 
          type="primary"
          size="large"
          className="annual-report-button !h-14 !px-12 !text-lg font-semibold rounded-lg"
          style={{ 
            background: '#2E3192',
            borderColor: '#2E3192',
            marginTop:'20px',
          
            borderRadius:'5px',
            fontWeight:'bold',
            fontSize:'12px'
          }}
        >
          Review Our Annual Impact Report
        </Button>
      </div>
    </section>
  )
}

export default AnnualReportSection