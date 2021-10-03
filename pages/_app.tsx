import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'


function MyApp({ Component, pageProps, router }: AppProps) {

  if (router.pathname === '/') {
    return <Component {...pageProps} />
  } else {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}
export default MyApp
