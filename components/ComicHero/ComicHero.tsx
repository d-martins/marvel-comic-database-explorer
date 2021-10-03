import { FC, useEffect, useState } from "react";
import { Comic } from "../../models/comic";
import Link from "next/link";
import Image from "next/image";
import styles from "./ComicHero.module.scss";
import useMarvelImage, { ImageSizes } from "../../hooks/useMarvelImage";

const ComicHero: FC<{ comic?: Comic }> = ({ comic }) => {
    const thumbnail = useMarvelImage(comic?.thumbnail, ImageSizes.LandscapeIncredible);

    let seriesId = comic?.series?.resourceURI?.split('/').pop();
    let seriesName = comic?.series?.name

    if (!comic) { return null; }
    return (
        <section className={`hero is-large is-primary is-relative ${styles["hero"]}`}>
            <div className="hero-image">
                <Image
                    src={thumbnail}
                    alt="Cover of the issue"
                    layout="fill"
                    objectFit="cover"
                    objectPosition={`50%`}
                    priority={true}
                ></Image>
            </div>
            <div className="hero-body pb-6">
                <div className="container">
                    <div className="title">{comic?.title}</div>
                    {seriesId && seriesName ? (
                        <div className="subtitle is-size-6">
                            <span className="mr-2">From the series:</span>
                            <span>
                                <Link href={`/series/${seriesId}`}>
                                    <a className="is-link">{seriesName}</a>
                                </Link>
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        </section >
    )
}

export default ComicHero