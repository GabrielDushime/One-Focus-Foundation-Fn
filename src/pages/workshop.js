import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import WorkshopPage from '../components/WorkshopPage/Workshop'

const { Content } = Layout

export default function Workshop() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <WorkshopPage />
      </Content>
      <FooterComponent />
    </Layout>
  )
}