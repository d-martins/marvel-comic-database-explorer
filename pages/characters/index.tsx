import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { Character } from '../../src/models/character';
import { MarvelApiResponse } from '../../src/models/marvelApi';
import { CharacterService } from '../../src/services/marvel-api';

const CharactersListPage: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<MarvelApiResponse<Character> | undefined>(undefined)

    useEffect(() => {
        CharacterService.getCharactersList({}).then(handleResponse)
    }, [])

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

export default CharactersListPage;