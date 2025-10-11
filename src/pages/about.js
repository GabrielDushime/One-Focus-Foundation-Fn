import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import AboutPage from '../components/AboutUsPage/About'

const { Content } = Layout

export default function About() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <AboutPage />
      </Content>
      <FooterComponent />
    </Layout>
  )
}