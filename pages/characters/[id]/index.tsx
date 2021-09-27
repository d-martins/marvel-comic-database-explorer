import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Character } from '../../../models/character';
import { MarvelApiResponse } from '../../../models/marvelApi';
import { CharacterService } from '../../../services/marvel-api';

const CharacterDetailsPage: NextPage = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Character> | undefined>(undefined)

    useEffect(() => {
        let id = router.query.id || ''

        if (Array.isArray(id)) { id = id[0] }

        CharacterService.getCharacter(id).then(handleResponse)
    }, [router])

    const handleResponse = (resp: MarvelApiResponse<Character>) => {
        setData(resp);
        setLoading(false);
    }

    return (
        <pre>
            {isLoading ? "loading....." : JSON.stringify(data?.data?.results, null, 4)}
        </pre>
    )
}

export default CharacterDetailsPage;