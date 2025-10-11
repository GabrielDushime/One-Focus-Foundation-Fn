import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import Home from '../components/Home'

const { Content } = Layout

export default function Index() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <Home />
      </Content>
      <FooterComponent />
    </Layout>
  )
}