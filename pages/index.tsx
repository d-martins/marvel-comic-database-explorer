import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

const Home: NextPage = ({children}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ultimate Marvel Database Explorer</title>
        <meta name="description" content="Discover Marvel comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/characters"><a>Characters</a></Link>

        {children}
      </main>

      <footer className={styles.footer}>
      <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  )
}

export default Home
