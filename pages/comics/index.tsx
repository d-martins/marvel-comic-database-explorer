import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { Comic } from '../../src/models/comic';
import { MarvelApiResponse } from '../../src/models/marvelApi';
import { ComicsService } from '../../src/services/marvel-api';

const ComicsListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Comic> | undefined>(undefined)

    useEffect(() => {
        ComicsService.getComicsList({}).then(handleResponse)
    }, [])

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

export default ComicsListPage;