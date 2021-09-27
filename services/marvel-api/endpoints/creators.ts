import { makeRequest } from "../utils";
import { Comic, ComicQueryOptions } from "../../../models/comic";
import { Series, SeriesQueryOptions } from "../../../models/series";
import { StoryQueryOptions as StoryQueryOptions, Story } from "../../../models/stories";
import { EventsQueryOptions } from "../../../models/events";
import { Creator, CreatorQueryOptions } from "../../../models/creators";

export function getCreatorsList(queryOptions: CreatorQueryOptions) {
    const endpoint = '/v1/public/creators';

    return makeRequest<Creator>(endpoint, { ...queryOptions });
}

export function getCreator(id: string) {
    const endpoint = `/v1/public/creators/${id}`;

    return makeRequest<Creator>(endpoint);
}

export function getCreatorSeries(id: string, queryOptions: Omit<SeriesQueryOptions, "creators">) {
    const endpoint = `/v1/public/creators/${id}/series`;

    return makeRequest<Series>(endpoint, { ...queryOptions });
}

export function getCreatorEvents(id: string, queryOptions: Omit<EventsQueryOptions, "creators">) {
    const endpoint = `/v1/public/creators/${id}/events`;

    return makeRequest<Event>(endpoint, { ...queryOptions });
}

export function getCreatorComics(id: string, queryOptions: Omit<ComicQueryOptions, "creators">) {
    const endpoint = `/v1/public/creators/${id}/creators`;

    return makeRequest<Comic>(endpoint, { ...queryOptions });
}

export function getCreatorStories(id: string, queryOptions: Omit<StoryQueryOptions, "creators">) {
    const endpoint = `/v1/public/creators/${id}/stories`;

    return makeRequest<Story>(endpoint, { ...queryOptions });
}