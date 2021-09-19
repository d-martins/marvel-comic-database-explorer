import { makeRequest } from "../utils";
import { Character, CharacterQueryOptions } from "../../../models/character";
import { Comic, ComicQueryOptions } from "../../../models/comic";
import { Series, SeriesQueryOptions } from "../../../models/series";
import { StoryQueryOptions as StoryQueryOptions, Story } from "../../../models/stories";
import { EventsQueryOptions } from "../../../models/events";

export function getCharactersList(queryOptions: CharacterQueryOptions) {
    const endpoint = '/v1/public/characters';

    return makeRequest<Character>(endpoint, {...queryOptions});
}

export function getCharacter(id: string) {
    const endpoint = `/v1/public/characters/${id}`;

    return makeRequest<Character>(endpoint);
}

export function getCharacterComics(id: string, queryOptions: Omit<ComicQueryOptions, "characters">) {
    const endpoint = `/v1/public/characters/${id}/comics`;

    return makeRequest<Comic>(endpoint, {...queryOptions});
}

export function getCharacterEvents(id: string, queryOptions: Omit<EventsQueryOptions, "characters">) {
    const endpoint = `/v1/public/characters/${id}/events`;

    return makeRequest<Event>(endpoint, {...queryOptions});
}

export function getCharacterSeries(id: string, queryOptions: Omit<SeriesQueryOptions, "characters">) {
    const endpoint = `/v1/public/characters/${id}/series`;

    return makeRequest<Series>(endpoint, {...queryOptions});
}

export function getCharacterStories(id: string, queryOptions: Omit<StoryQueryOptions, "characters">) {
    const endpoint = `/v1/public/characters/${id}/stories`;

    return makeRequest<Story>(endpoint, {...queryOptions});
}