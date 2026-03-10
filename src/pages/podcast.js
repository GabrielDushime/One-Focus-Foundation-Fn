import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import PodcastPage from '../components/PodcastPage/Podcast'

const { Content } = Layout

export default function Podcast() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <PodcastPage />
      </Content>
      <FooterComponent />
    </Layout>
  )
}
