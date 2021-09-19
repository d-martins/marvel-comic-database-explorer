import { makeRequest } from "../utils";
import { Comic, ComicQueryOptions } from "../../../models/comic";
import { StoryQueryOptions as StoryQueryOptions, Story } from "../../../models/stories";
import { EventsQueryOptions } from "../../../models/events";
import { Character, CharacterQueryOptions } from "../../../models/character";
import { Creator, CreatorQueryOptions } from "../../../models/creators";

export function getSeriesList(queryOptions: EventsQueryOptions) {
    const endpoint = '/v1/public/series';

    return makeRequest<Event>(endpoint, { ...queryOptions });
}

export function getSeries(id: string) {
    const endpoint = `/v1/public/series/${id}`;

    return makeRequest<Event>(endpoint);
}

export function getSeriesCharacters(id: string, queryOptions: Omit<CharacterQueryOptions, "events">) {
    const endpoint = `/v1/public/series/${id}/characters`;

    return makeRequest<Character>(endpoint, { ...queryOptions });
}

export function getSeriesComics(id: string, queryOptions: Omit<ComicQueryOptions, "events">) {
    const endpoint = `/v1/public/series/${id}/comics`;

    return makeRequest<Comic>(endpoint, { ...queryOptions });
}

export function getSeriesCreators(id: string, queryOptions: Omit<CreatorQueryOptions, "events">) {
    const endpoint = `/v1/public/series/${id}/creators`;

    return makeRequest<Creator>(endpoint, { ...queryOptions });
}

export function getSeriesEvents(id: string, queryOptions: Omit<EventsQueryOptions, "events">) {
    const endpoint = `/v1/public/series/${id}/events`;

    return makeRequest<Event>(endpoint, { ...queryOptions });
}

export function getSeriesStories(id: string, queryOptions: Omit<StoryQueryOptions, "events">) {
    const endpoint = `/v1/public/series/${id}/stories`;

    return makeRequest<Story>(endpoint, { ...queryOptions });
}