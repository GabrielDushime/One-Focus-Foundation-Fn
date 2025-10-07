import { Typography, Button } from 'antd'

const { Text } = Typography

const AnnualReportSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-7xl text-center"
        style={{
          textAlign:'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <style jsx>{`
          .annual-report-button {
            background: #2E3192 !important;
            border-color: #2E3192 !important;
            border-radius: 5px;
            font-weight: bold;
            white-space: normal;
            line-height: 2.2;
            
            /* Desktop styles */
            height: 50px;
            width: 300px;
            font-size: 14px;
            padding: 4px 12px;
          }
          
          .sponsorship-button {
            background: #1F99ED !important;
            border-color: #1F99ED !important;
            border-radius: 50px !important;
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

        <a 
          href="/files/sponsorship-packages.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            type="primary"
            size="large"
            className="annual-report-button sponsorship-button"
            style={{
            background:'#1F99ED',
            borderRadius:'50px',
            fontWeight:'bold',
            marginTop:'20px'
            }}
          >
            SPONSORSHIP PACKAGES
          </Button>
        </a>

        <a 
          href="/files/onefocus-annual-report.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            type="primary"
            size="large"
            className="annual-report-button"
            style={{
            background:'#2E3192',
      
            fontWeight:'500',
            marginTop:'20px'
            }}
          >
            Review Our Annual Impact Report
          </Button>
        </a>
      </div>
    </section>
  )
}

export default AnnualReportSection