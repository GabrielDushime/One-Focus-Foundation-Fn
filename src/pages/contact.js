import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import ContactPage from '../components/ContactPage/Contact'

const { Content } = Layout

export default function Contact() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <ContactPage />
      </Content>
      <FooterComponent />
    </Layout>
  )
}