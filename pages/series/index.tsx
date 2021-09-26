import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { Character } from '../../src/models/character';
import { MarvelApiResponse } from '../../src/models/marvelApi';
import { Series } from '../../src/models/series';
import { SeriesService } from '../../src/services/marvel-api';

const SeriesListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Character> | undefined>(undefined)

    useEffect(() => {
        SeriesService.getSeriesList({}).then(handleResponse)
    }, [])

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

export default SeriesListPage;