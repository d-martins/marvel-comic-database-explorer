import { FC } from "react";
import Image from 'next/image'
import Link from 'next/link'
import styles from './Card.module.scss'

type CardProps = {
    thumbnail: { src: string, alt: string };
    byline: string;
    title: string;
    useOverlay: boolean;
    links?: Array<{ label: string, href: string }>;
    href?: string;
    onClick?: () => {}
}

const ImageCard: FC<CardProps> = ({ thumbnail, byline, links, title, useOverlay, href, onClick }) => {

    return (
        <div className={styles["custom-card"]} onClick={onClick}>
            {
                thumbnail?.src ?
                    (
                        <LinkWrapper href={href}>
                            <div className="card-image">
                                <Image src={thumbnail.src} alt={thumbnail.alt} width={6} height={9} layout="responsive" objectFit="cover" objectPosition=""></Image>
                                {/* <img src={thumbnail.src} alt={thumbnail.alt} width="100%" /> */}

                                {useOverlay ? <div className={`${styles["card-overlay"]} is-overlay has-background-primary`}></div> : null}
                            </div>
                        </LinkWrapper>
                    ) : null
            }

            <div className="card-content p-0 pt-2">
                <p className="subtitle is-size-6 mb-2">{byline}</p>
                <LinkWrapper href={href}>
                    <p className="title is-size-6">{title}</p>
                </LinkWrapper>
            </div>
            <div className="card-footer is-size-7 is-block mt-1">
                {links?.map(link => {
                    return (
                        <Link href={link.href} key={link.href}>
                            <a className="mr-2">{link.label}</a>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

const LinkWrapper: FC<{ href?: string }> = ({ children, href }) => {

    if (href) {
        return (<Link href={href}><a>{children}</a></Link>)
    } else {
        return <>{children}</>
    }
}

export default ImageCard