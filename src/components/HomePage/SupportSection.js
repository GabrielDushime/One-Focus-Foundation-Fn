import React, { useState } from 'react';
import { 
  Typography, 
  Button, 
  Card, 
  Row, 
  Col, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Checkbox, 
  message,
  Spin,
  Divider,
  Space,
  InputNumber
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  DollarOutlined,
  CreditCardOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { API_ENDPOINTS } from '../../config/api';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Enums from backend
const DonationType = {
  ONE_TIME: 'one_time',
  MONTHLY: 'monthly',
  RECURRING: 'recurring'
};

const Currency = {
  RWF: 'RWF',
  USD: 'USD',
  EUR: 'EUR'
};

const PaymentMethod = {
  MOBILE_MONEY: 'mobile_money',
  BANK_TRANSFER: 'bank_transfer',
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  OTHER: 'other'
};

const DonationPurpose = {
  GENERAL_SUPPORT: 'general_support',
  YOUTH_WORKSHOPS: 'youth_workshops',
  MENTORSHIP_PROGRAM: 'mentorship_program',
  PODCAST: 'podcast',
  OTHER: 'other'
};

const SupportSection = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [donationForm] = Form.useForm();

  const supportPackages = [
    {
      title: "Bronze Package",
      price: "25$",
      amount: 25,
      description: "Sponsor a student's participation in our workshops for one month.",
      bgColor: "bg-white",
      purpose: DonationPurpose.YOUTH_WORKSHOPS
    },
    {
      title: "Silver Package",
      price: "100$",
      amount: 100,
      description: "Sponsor a full workshop session for Talented vision Dreamers",
      bgColor: "bg-white",
      purpose: DonationPurpose.MENTORSHIP_PROGRAM
    },
    {
      title: "Gold Package",
      price: "500$",
      amount: 500,
      description: "Sponsor Africa youth empowerment campaign Summit with your name.",
      bgColor: "bg-white",
      purpose: DonationPurpose.GENERAL_SUPPORT,
      isCustomAmount: true
    }
  ];

  const handleDonateClick = (packageInfo) => {
    setSelectedPackage(packageInfo);
    setModalVisible(true);
    
    // Set default values based on package
    donationForm.setFieldsValue({
      donationAmount: packageInfo.amount,
      currency: Currency.USD,
      donationType: DonationType.ONE_TIME,
      purposeOfDonation: packageInfo.purpose,
      agreeToContributionUse: false,
      agreeToReceiveUpdates: false
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedPackage(null);
    donationForm.resetFields();
  };

  const handleDonationSubmit = async (values) => {
    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.DONATIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        message.success({
          content: result.message || "Thank you for your generous support! Your contribution will directly empower young Africans through mentorship, workshops, and innovation. You'll receive a confirmation email shortly.",
          duration: 8,
          style: {
            marginTop: '20px',
          },
        });
        handleModalClose();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      message.error('Network error. Please check your connection and try again.');
      console.error('Donation submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const DonationModalForm = () => (
    <div className="space-y-6">
      {/* Donor Information Section */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <Title level={4} className="!mb-3 text-blue-700 flex items-center gap-2">
          <UserOutlined />
          Donor Information
        </Title>
        
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: 'Please enter your full name' },
                { min: 2, max: 100, message: 'Name must be between 2-100 characters' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter your full name"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Enter your email address"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number (Optional)"
            >
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="+250788123456"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="countryCity"
              label="Country and City"
              rules={[
                { required: true, message: 'Please enter your country and city' },
                { min: 2, max: 100, message: 'Location must be between 2-100 characters' }
              ]}
            >
              <Input 
                prefix={<EnvironmentOutlined />} 
                placeholder="Kigali, Rwanda"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Donation Details Section */}
      <div className="bg-green-50 p-4 rounded-lg">
        <Title level={4} className="!mb-3 text-green-700 flex items-center gap-2">
          <DollarOutlined />
          Donation Details
        </Title>
        
        <Row gutter={16}>
          <Col xs={24} sm={selectedPackage?.isCustomAmount ? 12 : 8}>
            <Form.Item
              name="donationAmount"
              label={selectedPackage?.isCustomAmount ? "Donation Amount (Minimum $500)" : "Donation Amount"}
              rules={[
                { required: true, message: 'Please enter donation amount' },
                { 
                  validator: (_, value) => {
                    if (selectedPackage?.isCustomAmount && value < 500) {
                      return Promise.reject(new Error('Gold package requires minimum $500 donation'));
                    }
                    if (value <= 0) {
                      return Promise.reject(new Error('Amount must be greater than 0'));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <InputNumber
                prefix="$"
                placeholder="Enter amount"
                size="large"
                style={{ width: '100%' }}
                min={selectedPackage?.isCustomAmount ? 500 : selectedPackage?.amount || 1}
                step={selectedPackage?.isCustomAmount ? 50 : 1}
                precision={2}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={selectedPackage?.isCustomAmount ? 6 : 8}>
            <Form.Item
              name="currency"
              label="Currency"
              rules={[{ required: true, message: 'Please select currency' }]}
            >
              <Select placeholder="Currency" size="large">
                <Option value={Currency.USD}>USD ($)</Option>
                <Option value={Currency.EUR}>EUR (€)</Option>
                <Option value={Currency.RWF}>RWF (₣)</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={selectedPackage?.isCustomAmount ? 6 : 8}>
            <Form.Item
              name="donationType"
              label="Donation Type"
              rules={[{ required: true, message: 'Please select donation type' }]}
            >
              <Select placeholder="Type" size="large">
                <Option value={DonationType.ONE_TIME}>One-time</Option>
                <Option value={DonationType.MONTHLY}>Monthly</Option>
                <Option value={DonationType.RECURRING}>Recurring</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="paymentMethod"
              label="Preferred Payment Method"
              rules={[{ required: true, message: 'Please select payment method' }]}
            >
              <Select placeholder="Select payment method" size="large">
                <Option value={PaymentMethod.MOBILE_MONEY}>Mobile Money</Option>
                <Option value={PaymentMethod.CREDIT_CARD}>Credit Card</Option>
                <Option value={PaymentMethod.BANK_TRANSFER}>Bank Transfer</Option>
                <Option value={PaymentMethod.PAYPAL}>PayPal</Option>
                <Option value={PaymentMethod.OTHER}>Other</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12}>
            <Form.Item
              name="purposeOfDonation"
              label="Purpose of Donation"
            >
              <Select placeholder="Select purpose" size="large">
                <Option value={DonationPurpose.GENERAL_SUPPORT}>General Support</Option>
                <Option value={DonationPurpose.YOUTH_WORKSHOPS}>Youth Workshops</Option>
                <Option value={DonationPurpose.MENTORSHIP_PROGRAM}>Mentorship Program</Option>
                <Option value={DonationPurpose.PODCAST}>Podcast</Option>
                <Option value={DonationPurpose.OTHER}>Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Message Section */}
      <div className="bg-orange-50 p-4 rounded-lg">
        <Title level={4} className="!mb-3 text-orange-700 flex items-center gap-2">
          <HeartOutlined />
          Message (Optional)
        </Title>
        
        <Form.Item
          name="messageToOnefocus"
          label="Message to ONEFOCUS Foundation"
          rules={[{ max: 500, message: 'Message must not exceed 500 characters' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Share your thoughts or encouragement with us..."
            showCount
            maxLength={500}
          />
        </Form.Item>
      </div>

      {/* Consent Section */}
      <Divider />
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <Title level={5} className="!mb-4 text-gray-700">
          Consent & Agreements
        </Title>
        
        <Space direction="vertical" size="middle" className="w-full">
          <Form.Item
            name="agreeToContributionUse"
            valuePropName="checked"
            rules={[{ 
              validator: (_, value) => 
                value ? Promise.resolve() : Promise.reject(new Error('Please agree to contribution use')) 
            }]}
          >
            <Checkbox className="text-sm">
              I agree to allow ONEFOCUS to use my contribution for youth empowerment programs and initiatives
            </Checkbox>
          </Form.Item>

          <Form.Item
            name="agreeToReceiveUpdates"
            valuePropName="checked"
            rules={[{ 
              validator: (_, value) => 
                value ? Promise.resolve() : Promise.reject(new Error('Please agree to receive updates')) 
            }]}
          >
            <Checkbox className="text-sm">
              I would like to receive updates and impact reports about ONEFOCUS projects and the difference my contribution is making
            </Checkbox>
          </Form.Item>
        </Space>
      </div>
    </div>
  );

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
        
        {/* Support Packages Grid */}
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
                      {pkg.isCustomAmount ? `${pkg.price}+` : pkg.price}
                    </span>
                    {pkg.isCustomAmount && (
                      <div className="text-sm text-gray-500 mt-1">
                        Minimum amount
                      </div>
                    )}
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
                  <div className="text-center mt-auto" style={{ marginBottom: '20px', marginTop:'20px' }}>
                    <Button
                      type="primary"
                      size="large"
                      className="bg-blue-500 border-blue-500 hover:bg-blue-600 font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base min-h-[40px] sm:min-h-[44px]"
                      style={{
                        borderRadius: '20px',
                        height: '30px',
                        fontSize: '12px'
                      }}
                      onClick={() => handleDonateClick(pkg)}
                    >
                      Donate Now
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        
        
      </div>

      {/* Donation Modal */}
      <Modal
        title={
          <div className="text-center pb-4">
            <Title level={3} className="!mb-2 text-blue-600 flex items-center justify-center gap-2">
              <CreditCardOutlined />
              {selectedPackage?.title} Donation
            </Title>
            <Text type="secondary" className="text-sm">
              Support youth empowerment through {selectedPackage?.title.toLowerCase()}
            </Text>
          </div>
        }
        open={modalVisible}
        onCancel={handleModalClose}
        width={800}
        footer={[
          <Button 
            key="cancel" 
            onClick={handleModalClose}
            size="large"
            disabled={loading}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={loading}
            onClick={() => donationForm.submit()}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading}
            icon={<HeartOutlined />}
          >
            {loading ? 'Processing...' : `Complete Donation`}
          </Button>
        ]}
        className="onefocus-modal"
        styles={{
          content: {
            padding: '24px',
          },
          body: {
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '20px 0',
          }
        }}
        destroyOnClose={true}
        centered
      >
        <Spin spinning={loading}>
          <Form
            form={donationForm}
            layout="vertical"
            onFinish={handleDonationSubmit}
            scrollToFirstError
          >
            <DonationModalForm />
          </Form>
        </Spin>
      </Modal>
      {/* Direct Donation Options */}
        <div className="mt-12 mb-16">
          <div className="text-center mb-10"
          style={{
            padding:'20px'
          }}
          >
            <Title 
              level={3} 
              className="!mb-2 !text-lg md:!text-xl lg:!text-2xl font-bold"
              style={{ color: '#1F99ED', }}
            >
              Quick & Direct Donation
            </Title>
            <Text className="text-gray-600 text-sm" >
              Choose your preferred method to make an instant impact
            </Text>
          </div>
          
          <Row 
            gutter={[
              { xs: 8, sm: 16, md: 20, lg: 24, xl: 20 }, 
              { xs: 20, sm: 24, md: 28, lg: 20 }
            ]} 
            justify="center" 
            align="stretch"
          >
            {/* Bank Account Card */}
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Card 
                className="w-full rounded-2xl border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
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
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px 2px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex-1 flex flex-col p-4 sm:p-5 text-center" style={{ flexGrow: 1 }}>
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <div 
                      className="flex items-center justify-center rounded-full"
                      style={{ 
                        width: '48px', 
                        height: '48px',
                        background: 'linear-gradient(135deg, #1F99ED, #2E3192)'
                      }}
                    >
                      <CreditCardOutlined className="text-2xl text-white" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <Title 
                    level={4} 
                    className="mb-3 text-base sm:text-lg font-semibold"
                    style={{
                      color: '#1F99ED',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    Bank Transfer
                  </Title>
                  
                  {/* Content */}
                  <div className="flex-1" style={{ flexGrow: 1 }}>
                    <div className="mb-3">
                      <Text className="text-gray-400 text-xs block mb-1" style={{ fontSize: '10px' }}>
                        ACCOUNT NUMBER
                      </Text>
                      <Text 
                        strong 
                        className="text-base block font-bold"
                        style={{ 
                          color: '#2E3192',
                          fontFamily: 'monospace',
                          fontSize: '14px'
                        }}
                      >
                        10017-8799988
                      </Text>
                    </div>
                    
                    <div className="mb-3">
                      <Text className="text-gray-400 text-xs block mb-1" style={{ fontSize: '10px' }}>
                        ACCOUNT NAME
                      </Text>
                      <Text 
                        strong 
                        className="text-xs block font-bold"
                        style={{ color: '#333333', fontSize: '11px' }}
                      >
                        ONEFOCUS FOU 
                      </Text>
                    </div>
                    
                    <div className="mb-3">
                      <Text className="text-gray-400 text-xs block mb-1" style={{ fontSize: '10px' }}>
                        BANK
                      </Text>
                      <Text 
                        strong 
                        className="text-xs block font-bold"
                        style={{ color: '#333333', fontSize: '11px' }}
                      >
                        Bank of Kigali
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            {/* Mobile Money Card */}
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Card 
                className="w-full rounded-2xl border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
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
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px 2px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex-1 flex flex-col p-4 sm:p-5 text-center" style={{ flexGrow: 1 }}>
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <div 
                      className="flex items-center justify-center rounded-full"
                      style={{ 
                        width: '48px', 
                        height: '48px',
                        background: 'linear-gradient(135deg, #2E3192, #1F99ED)'
                      }}
                    >
                      <PhoneOutlined className="text-2xl text-white" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <Title 
                    level={4} 
                    className="mb-3 text-base sm:text-lg font-semibold"
                    style={{
                      color: '#2E3192',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    Mobile Money
                  </Title>
                  
                  {/* Content */}
                  <div className="flex-1" style={{ flexGrow: 1 }}>
                    <div className="mb-3">
                      <Text className="text-gray-400 text-xs block mb-1" style={{ fontSize: '10px' }}>
                        Momo Pay Code(2500100)
                      </Text>
                      <Text 
                        strong 
                        className="text-base block font-bold"
                        style={{ 
                          color: '#2E3192',
                          fontFamily: 'monospace',
                          fontSize: '14px'
                        }}
                      >
                        *182*8*1*2500100*Amount*PIN#
                      </Text>
                       <Text className="text-gray-400 text-xs block mb-1" style={{ fontSize: '10px' }}>
                        Names
                      </Text>
                      <Text 
                        strong 
                        className="text-xs block font-bold"
                        style={{ color: '#333333', fontSize: '11px',marginBottom:'5px' }}
                      >
                        ONEFOCUS FOU 
                      </Text>
                    </div>
                    
                    <div 
                      className="p-2 rounded-lg"
                      style={{ 
                        background: 'rgba(46, 49, 146, 0.05)',
                        border: '1px dashed rgba(46, 49, 146, 0.2)'
                      }}
                    >
                      <Text className="text-gray-600 block" style={{ fontSize: '10px', lineHeight: '1.4' }}>
                        <span className="font-semibold block mb-1" style={{ color: '#2E3192', fontSize: '10px' }}>
                          📱 Networks:
                        </span>
                        MTN Momo Pay
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        
        <div className="text-center mt-8"
          style={{
            fontWeight: '600',
            marginTop:'20px'
          }}
        >
          <Text 
            className="text-gray-600 !text-lg"
          >
            For other donation options or to discuss sponsorship packages, please contact us
          </Text>
        </div>
    </section>
    
  )
}

export default SupportSection;