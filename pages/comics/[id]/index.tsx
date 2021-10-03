import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from "react";
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import LoadScreen from '../../../components/LoadScreen/LoadScreen';
import { Comic, ComicSummary } from '../../../models/comic';
import { MarvelApiResponse } from '../../../models/marvelApi';
import { ComicsService } from '../../../services/marvel-api';
import ComicHero from '../../../components/ComicHero/ComicHero';
import ComicDescription from '../../../components/ComicDescription/ComicDescription';
import ComicCreators from '../../../components/ComicCreators/ComicCreators';
import ComicSummaryFooter from '../../../components/ComicSummaryFooter/ComicSummaryFooter';

type ServerSideProps = {
    fallbackData?: MarvelApiResponse<Comic> | null
}

async function getData(id: string) {
    return await ComicsService.getComic(id)
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ params }) => {
    if (!params || !params["id"]) { return { props: { fallbackData: null } } }
    const idParam = params["id"]
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    const resp = await getData(id)

    return {
        props: {
            fallbackData: resp.code === 200 ? resp : null
        }
    }
}

const ComicDetailsPage: NextPage<ServerSideProps> = ({ fallbackData, }) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<MarvelApiResponse<Comic> | undefined>(fallbackData || undefined)
    const [error, setError] = useState<string>();
    const comic = data?.data?.results[0];

    const loadData = useCallback(() => {
        const idParam = router.query.id;
        const id = Array.isArray(idParam) ? idParam[0] : idParam

        if (id) {
            setLoading(true);
            getData(id).then(handleResponse);
        }
    }, [router])

    const handleResponse = (resp: MarvelApiResponse<Comic>) => {
        setData(resp);
        setLoading(false);

        if (resp.code !== 200) {
            setError(resp.status);
        } else if (resp.data?.count === 0) {
            setError("Couldn't find comic data");
        } else {
            setError(undefined);
        }
    }

    useEffect(() => {
        loadData();
    }, [loadData])

    return (
        <LoadScreen isLoading={isLoading && !data}>
            {error ? (
                <ErrorScreen
                    title={error}
                    onTryAgain={data?.code !== 200 ? loadData : undefined}
                ></ErrorScreen>
            ) : (
                <div className="content-wrapper is-relative">
                    <ComicHero comic={comic}></ComicHero>
                    <section className="section">
                        <div className="container">
                            <div className="columns">
                                <div className="column is-one-third">

                                    <ComicDescription comic={comic}></ComicDescription>
                                </div>
                                <div className="column is-two-thirds">
                                    <ComicCreators comic={comic}></ComicCreators>
                                </div>
                            </div>
                        </div>
                    </section>
                    <ComicSummaryFooter comic={comic}></ComicSummaryFooter>
                    {isLoading ? (
                        <div className="is-overlay is-fade-in-out has-background-light"></div>
                    ) : null}
                </div>
            )}
        </LoadScreen>
    )
}

export default ComicDetailsPage;