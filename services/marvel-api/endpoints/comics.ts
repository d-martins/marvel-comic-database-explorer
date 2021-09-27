import { makeRequest } from "../utils";
import { Comic, ComicQueryOptions } from "../../../models/comic";
import { StoryQueryOptions as StoryQueryOptions, Story } from "../../../models/stories";
import { EventsQueryOptions } from "../../../models/events";
import { Character, CharacterQueryOptions } from "../../../models/character";
import { Creator, CreatorQueryOptions } from "../../../models/creators";

export function getComicsList(queryOptions: ComicQueryOptions) {
    const endpoint = '/v1/public/comics';

    return makeRequest<Comic>(endpoint, { ...queryOptions });
}

export function getComic(id: string) {
    const endpoint = `/v1/public/comics/${id}`;

    return makeRequest<Comic>(endpoint);
}

export function getComicCharacters(id: string, queryOptions: Omit<CharacterQueryOptions, "comics">) {
    const endpoint = `/v1/public/comics/${id}/characters`;

    return makeRequest<Character>(endpoint, { ...queryOptions });
}

export function getComicEvents(id: string, queryOptions: Omit<EventsQueryOptions, "comics">) {
    const endpoint = `/v1/public/comics/${id}/events`;

    return makeRequest<Event>(endpoint, { ...queryOptions });
}

export function getComicCreators(id: string, queryOptions: Omit<CreatorQueryOptions, "comics">) {
    const endpoint = `/v1/public/comics/${id}/creators`;

    return makeRequest<Creator>(endpoint, { ...queryOptions });
}

export function getComicStories(id: string, queryOptions: Omit<StoryQueryOptions, "comics">) {
    const endpoint = `/v1/public/comics/${id}/stories`;

    return makeRequest<Story>(endpoint, { ...queryOptions });
}