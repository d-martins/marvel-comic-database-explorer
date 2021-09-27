import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Comic } from '../../../models/comic';
import { MarvelApiResponse } from '../../../models/marvelApi';
import { ComicsService } from '../../../services/marvel-api';

const ComicDetailsPage: NextPage = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Comic> | undefined>(undefined)

    useEffect(() => {
        let id = router.query.id || ''

        if (Array.isArray(id)) { id = id[0] }

        ComicsService.getComic(id).then(handleResponse)
    }, [router])

    const handleResponse = (resp: MarvelApiResponse<Comic>) => {
        setData(resp);
        setLoading(false);
    }

    return (
        <pre>
            {isLoading ? "loading....." : JSON.stringify(data?.data?.results, null, 4)}
        </pre>
    )
}

export default ComicDetailsPage;