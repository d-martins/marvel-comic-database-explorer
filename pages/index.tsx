import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link';

const Home: NextPage = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ultimate Marvel Database Explorer</title>
        <meta name="description" content="Discover Marvel comics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/comics"><a>Comics</a></Link>

        {children}
      </main>

      <footer className={styles.footer}>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  )
}

export default Home
