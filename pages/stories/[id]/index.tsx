import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { MarvelApiResponse } from '../../../models/marvelApi';
import { Story } from '../../../models/stories';
import { StoriesService } from '../../../services/marvel-api';

const StoriesDetailsPage: NextPage = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Story> | undefined>(undefined)

    useEffect(() => {
        let id = router.query.id || ''

        if (Array.isArray(id)) { id = id[0] }

        StoriesService.getStory(id).then(handleResponse)
    }, [router])

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

export default StoriesDetailsPage;