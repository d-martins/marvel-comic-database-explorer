import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Image from 'next/image';
import NavHeader from '../components/NavHeader/NavHeader';
import { FC, useState } from 'react';
import { navOptions } from '../components/Layout/Layout';
import { MarvelApiResponse } from '../models/marvelApi';
import { Comic } from '../models/comic';
import ComicCard from '../components/ComicCard/ComicCard';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home: NextPage = ({ children }) => {
    return (
        <div >
            <Head>
                <title>Ultimate Marvel Database Explorer</title>
                <meta name="description" content="Discover Marvel comics" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main >
                <HomeHero></HomeHero>
                <HomeLatestComics></HomeLatestComics>
            </main>

            <footer className="footer is-block has-text-centered">
                <div>
                    <a
                        className="has-text-white"
                        href="http://marvel.com"
                        target="_blank"
                        rel="noreferrer"
                    >Data provided by Marvel.© 2021 MARVEL
                    </a>
                </div>
                <div className="is-size-5 mt-2">
                    <a
                        className="has-text-white"
                        href="https://github.com/d-martins/marvel-comic-database-explorer"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                    </a>
                </div>
            </footer >
        </div >
    )
}


const HomeLatestComics: FC<{}> = ({ }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Comic> | undefined>(undefined)
    const results = data?.data?.results || [];

    return (
        <section className="section">
            <div className="container">
                <p className="title has-text-centered">Latest Comics</p>
                <div className="columns is-mobile is-relative is-8 is-variable">
                    <div className="column is-one-third">
                        <ComicCard comic={results[0] || {}}></ComicCard>
                    </div>
                    <div className="column is-one-third">
                        <ComicCard comic={results[0] || {}}></ComicCard>
                    </div>
                    <div className="column is-one-third">
                        <ComicCard comic={results[0] || {}}></ComicCard>
                    </div>
                </div>
                {isLoading ? (
                    <div className="is-overlay is-fade-in-out has-background-light"></div>
                ) : null}
            </div>
        </section>
    )


}

const HomeHero: FC<{}> = () => {
    return (
        <section className={`hero is-halfheight is-primary is-relative ${styles["hero"]}`}>
            <div className="hero-image">
                <Image
                    src="/hero.png"
                    alt="Cover of the issue"
                    layout="fill"
                    objectFit="cover"
                    objectPosition={`50%`}
                    priority={true}
                ></Image>
            </div>
            <div className="hero-body">
                <div className="container is-family-secondary has-text-centered">
                    <Image src="/marvel.svg" alt="the marvel logo" width="130" height="52"></Image>
                    <div className="title is-size-1 mt-4 mb-2">Marvel Comics</div>
                    <div className="title is-size-2">Ultimate database explorer</div>
                </div>

            </div>
            <div className="hero-foot">
                <NavHeader justNav={true} items={navOptions}></NavHeader>
            </div>
        </section >
    )
}


export default Home
