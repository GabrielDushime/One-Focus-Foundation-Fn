import '../styles/globals.css'
import { ConfigProvider } from 'antd'
import { useEffect } from 'react'

const theme = {
  token: {
    colorPrimary: '#1F99ED',
    colorBgContainer: '#f5f5f5',
    colorText: '#333333',
    colorTextSecondary: 'rgba(51, 51, 51, 0.7)',
    borderRadius: 8,
    colorBorder: '#1F99ED',
    colorBgLayout: '#ffffff',
    fontFamily:
      "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  components: {
    Layout: {
      headerBg: 'linear-gradient(135deg, #1F99ED, #2E3192)',
      footerBg: 'linear-gradient(135deg, #1F99ED, #2E3192)',
      bodyBg: '#ffffff',
    },
    Button: {
      primaryColor: '#ffffff',
      colorPrimary: '#1F99ED',
      colorPrimaryHover: '#2E3192',
      colorPrimaryActive: '#2E3192',
    },
    Menu: {
      itemColor: '#000000',
      itemHoverColor: '#1F99ED',
      itemSelectedColor: '#1F99ED',
      horizontalItemSelectedColor: '#1F99ED',
    },
  },
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    console.log('ONEFOCUS Project - Application Started')
  }, [])

  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}