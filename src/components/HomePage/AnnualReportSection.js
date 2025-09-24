import { Typography, Button } from 'antd'

const { Text } = Typography

const AnnualReportSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-7xl text-center"
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
            line-height: 2.2;
            
            /* Desktop styles */
            height: 20px;
            width: 25%;
            font-size: 12px;
            padding: 4px 12px;
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
          className="annual-report-button !h-12 !px-12 !text-lg font-semibold rounded-lg"
          style={{ 
            background: '#2E3192',
            borderColor: '#2E3192',
            marginTop:'20px',
            borderRadius:'5px',
            fontWeight:'500',
            fontSize:'14px',
            width:'300px'
          }}
        >
          Review Our Annual Impact Report
        </Button>
      </div>
    </section>
  )
}

export default AnnualReportSection