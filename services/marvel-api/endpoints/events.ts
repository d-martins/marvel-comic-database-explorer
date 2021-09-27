import { makeRequest } from "../utils";
import { Comic, ComicQueryOptions } from "../../../models/comic";
import { Series, SeriesQueryOptions } from "../../../models/series";
import { StoryQueryOptions as StoryQueryOptions, Story } from "../../../models/stories";
import { Events, EventsQueryOptions } from "../../../models/events";
import { Character, CharacterQueryOptions } from "../../../models/character";
import { Creator, CreatorQueryOptions } from "../../../models/creators";

export function getEventsList(queryOptions: EventsQueryOptions) {
    const endpoint = '/v1/public/events';

    return makeRequest<Events>(endpoint, { ...queryOptions });
}

export function getEvent(id: string) {
    const endpoint = `/v1/public/events/${id}`;

    return makeRequest<Events>(endpoint);
}

export function getEventCharacters(id: string, queryOptions: Omit<CharacterQueryOptions, "events">) {
    const endpoint = `/v1/public/events/${id}/characters`;

    return makeRequest<Character>(endpoint, { ...queryOptions });
}

export function getEventComics(id: string, queryOptions: Omit<ComicQueryOptions, "events">) {
    const endpoint = `/v1/public/events/${id}/comics`;

    return makeRequest<Comic>(endpoint, { ...queryOptions });
}

export function getEventCreators(id: string, queryOptions: Omit<CreatorQueryOptions, "events">) {
    const endpoint = `/v1/public/events/${id}/creators`;

    return makeRequest<Creator>(endpoint, { ...queryOptions });
}

export function getEventSeries(id: string, queryOptions: Omit<SeriesQueryOptions, "events">) {
    const endpoint = `/v1/public/events/${id}/series`;

    return makeRequest<Series>(endpoint, { ...queryOptions });
}

export function getEventStories(id: string, queryOptions: Omit<StoryQueryOptions, "events">) {
    const endpoint = `/v1/public/events/${id}/stories`;

    return makeRequest<Story>(endpoint, { ...queryOptions });
}