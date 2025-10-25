import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import ServicesPage from '../components/Service/Service'

const { Content } = Layout

export default function Services() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <ServicesPage />
      </Content>
      <FooterComponent />
    </Layout>
  )
}