import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { MarvelApiResponse } from '../../src/models/marvelApi';
import { Story } from '../../src/models/stories';
import { StoriesService } from '../../src/services/marvel-api';

const StoriesListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Story> | undefined>(undefined)

    useEffect(() => {
        StoriesService.getStoriesList({}).then(handleResponse)
    }, [])

    const handleResponse = (resp: MarvelApiResponse<Story>) => {
        setData(resp);
        setLoading(false);
    }


    return (
        <pre>
            {isLoading ? "loading....." : JSON.stringify(data?.data?.results, null, 4)}
        </pre>
    )
}

export default StoriesListPage;