import { Layout } from 'antd'
import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'
import WhatWeBuildPage from '../components/WhatWeBuildPage/WhatWeBuild'

const { Content } = Layout

export default function WhatWeBuild() {
  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <WhatWeBuildPage />
      </Content>
      <FooterComponent />
    </Layout>
  )
}