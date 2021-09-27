import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { MarvelApiResponse } from '../../../models/marvelApi';
import { Series } from '../../../models/series';
import { SeriesService } from '../../../services/marvel-api';

const SeriesDetailsPage: NextPage = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Series> | undefined>(undefined)

    useEffect(() => {
        let id = router.query.id || ''

        if (Array.isArray(id)) { id = id[0] }

        SeriesService.getSeries(id).then(handleResponse)
    }, [router])

    const handleResponse = (resp: MarvelApiResponse<Series>) => {
        setData(resp);
        setLoading(false);
    }

    return (
        <pre>
            {isLoading ? "loading....." : JSON.stringify(data?.data?.results, null, 4)}
        </pre>
    )
}

export default SeriesDetailsPage;