import { makeRequest } from "../utils";
import { Comic, ComicQueryOptions } from "../../../models/comic";
import { EventsQueryOptions } from "../../../models/events";
import { Character, CharacterQueryOptions } from "../../../models/character";
import { Creator, CreatorQueryOptions } from "../../../models/creators";
import { Series, SeriesQueryOptions } from "../../../models/series";

export function getStoriesList(queryOptions: EventsQueryOptions) {
    const endpoint = '/v1/public/stories';

    return makeRequest<Event>(endpoint, { ...queryOptions });
}

export function getStory(id: string) {
    const endpoint = `/v1/public/stories/${id}`;

    return makeRequest<Event>(endpoint);
}

export function getStoryCharacters(id: string, queryOptions: Omit<CharacterQueryOptions, "events">) {
    const endpoint = `/v1/public/stories/${id}/characters`;

    return makeRequest<Character>(endpoint, { ...queryOptions });
}

export function getStoryComics(id: string, queryOptions: Omit<ComicQueryOptions, "events">) {
    const endpoint = `/v1/public/stories/${id}/comics`;

    return makeRequest<Comic>(endpoint, { ...queryOptions });
}

export function getStoryCreators(id: string, queryOptions: Omit<CreatorQueryOptions, "events">) {
    const endpoint = `/v1/public/stories/${id}/creators`;

    return makeRequest<Creator>(endpoint, { ...queryOptions });
}

export function getStoryEvents(id: string, queryOptions: Omit<EventsQueryOptions, "events">) {
    const endpoint = `/v1/public/stories/${id}/events`;

    return makeRequest<Event>(endpoint, { ...queryOptions });
}

export function getStorySeries(id: string, queryOptions: Omit<SeriesQueryOptions, "events">) {
    const endpoint = `/v1/public/stories/${id}/series`;

    return makeRequest<Series>(endpoint, { ...queryOptions });
}