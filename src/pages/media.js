import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import MediaPage from '../components/MediaPage/Media'

const { Content } = Layout

export default function Media() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <MediaPage />
      </Content>
      <FooterComponent />
    </Layout>
  )
}