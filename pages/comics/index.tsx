import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { Comic } from '../../models/comic';
import { MarvelApiResponse } from '../../models/marvelApi';
import { ComicsService } from '../../services/marvel-api';

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