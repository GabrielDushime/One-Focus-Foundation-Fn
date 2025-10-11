import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import CareerPage from '../components/CareerPage/Career'

const { Content } = Layout

export default function Career() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <CareerPage />
      </Content>
      <FooterComponent />
    </Layout>
  )
}