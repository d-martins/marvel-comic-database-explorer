import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { Comic } from '../../models/comic';
import { MarvelApiResponse } from '../../models/marvelApi';
import { ComicsService } from '../../services/marvel-api';
import Card from '../../components/Card/Card';
import Error from 'next/error'
import GridLayout from '../../components/GridLayout/GridLayout';
import { ColumnSizes } from '../../models/bulma';

const ComicsListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Comic> | undefined>(undefined)

    useEffect(() => {
        const now = new Date();
        const pastDate = new Date(now.getFullYear() - 6, now.getMonth() + 1, now.getDate());

        ComicsService.getComicsList({ dateRange: [pastDate, now] }).then(handleResponse)
    }, [])

    const handleResponse = (resp: MarvelApiResponse<Comic>) => {
        setData(resp);
        setLoading(false);
    }

    if (isLoading) { return <span>loading...</span>; }

    if (data?.code !== 200) {
        return <Error statusCode={data?.code || 500} title={data?.status}></Error>
    }

    const results = data.data?.results || [{}]

    return (
        <section className="section">
            <div className="container">
                <GridLayout columnSize={{
                    mobile: ColumnSizes.Half,
                    tablet: ColumnSizes.Half,
                    desktop: ColumnSizes.OneThird,
                    widescreen: ColumnSizes.OneQuarter
                }}>
                    {results.map(comic => {
                        const creators = comic.creators?.items.filter(creator => creator.name && creator.resourceURI) || [];
                        const creatorLinks = creators.map(creator => {
                            return {
                                label: creator.name || '',
                                href: `/creators/${creator.resourceURI?.split('/').pop()}`
                            }
                        })

                        return <Card
                            key={comic.id}
                            title={comic.title || ""}
                            byline={comic.dates?.find(date => date.type === 'onsaleDate')?.date?.toString() || ""}
                            links={creatorLinks}
                            thumbnail={{ src: `${comic.thumbnail?.path}/portrait_incredible.${comic.thumbnail?.extension}`, alt: "cover image of the comic book" }}
                            useOverlay={true}
                            href={`/comics/${comic.id}`}
                        ></Card>
                    }) || null}
                </GridLayout>
            </div>
        </section>)


}

export default ComicsListPage;