import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { Events } from '../../models/events';
import { MarvelApiResponse } from '../../models/marvelApi';
import { EventsService } from '../../services/marvel-api';

const EventsListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Events> | undefined>(undefined)

    useEffect(() => {
        EventsService.getEventsList({}).then(handleResponse)
    }, [])

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

export default EventsListPage;