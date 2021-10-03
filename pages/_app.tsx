import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import InProgress from '../components/WIP/InProgress'


function MyApp({ Component, pageProps, router }: AppProps) {

  if (router.pathname === '/') {
    return <Component {...pageProps} />
  } else {
    return (
      <Layout>
        {router.pathname.startsWith('/comics') ? null : <InProgress></InProgress>}
        <Component {...pageProps} />
      </Layout>
    )
  }
}
export default MyApp
