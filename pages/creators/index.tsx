import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { Creator } from '../../models/creators';
import { MarvelApiResponse } from '../../models/marvelApi';
import { CreatorsService } from '../../services/marvel-api';

const CreatorsListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Creator> | undefined>(undefined)

    useEffect(() => {
        CreatorsService.getCreatorsList({}).then(handleResponse)
    }, [])

    const handleResponse = (resp: MarvelApiResponse<Creator>) => {
        setData(resp);
        setLoading(false);
    }


    return (
        <pre>
            {isLoading ? "loading....." : JSON.stringify(data?.data?.results, null, 4)}
        </pre>
    )
}

export default CreatorsListPage;