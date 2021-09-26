import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Creator } from '../../../src/models/creators';
import { MarvelApiResponse } from '../../../src/models/marvelApi';
import { CreatorsService } from '../../../src/services/marvel-api';

const CreatorDetailsPage: NextPage = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Creator> | undefined>(undefined)

    useEffect(() => {
        let id = router.query.id || ''

        if (Array.isArray(id)) { id = id[0] }

        CreatorsService.getCreator(id).then(handleResponse)
    }, [router])

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

export default CreatorDetailsPage;