import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Events } from '../../../src/models/events';
import { MarvelApiResponse } from '../../../src/models/marvelApi';
import { EventsService } from '../../../src/services/marvel-api';

const EventDetailsPage: NextPage = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Events> | undefined>(undefined)

    useEffect(() => {
        let id = router.query.id || ''

        if (Array.isArray(id)) { id = id[0] }

        EventsService.getEvent(id).then(handleResponse)
    }, [router])

    const handleResponse = (resp: MarvelApiResponse<Events>) => {
        setData(resp);
        setLoading(false);
    }

    return (
        <pre>
            {isLoading ? "loading....." : JSON.stringify(data?.data?.results, null, 4)}
        </pre>
    )
}

export default EventDetailsPage;