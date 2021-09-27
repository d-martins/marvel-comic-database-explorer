import { CharacterSummary } from "./character";
import { ComicSummary } from "./comic";
import { CreatorSummary } from "./creators";
import { MarvelImage, MarvelUrl, BaseQueryOptions, ResourceList } from "./marvelApi";
import { SeriesSummary } from "./series";
import { StorySummary } from "./stories";

export enum EventsOrderByFields { Name = "name", Modified = "modified", StartDate="startDate" }

export interface EventsQueryOptions extends BaseQueryOptions {
    /** Full character name */
    name?: string
    /** Search for characters begning with the provided string */
    nameStartsWith?: string
    /** Format YYYY-MM-DD */
    modifiedSince?: Date
    /** Array of comic ids */
    comics?: number[]
    /** Array of series ids */
    series?: number[]
    /** Array of event ids */
    characters?: number[]
    /** Array of creator ids */
    creators?: number[]
    /** Array of story ids */
    stories?: number[]
    /** Field to order results by */
    orderBy?: EventsOrderByFields
}


export type EventSummary = {
    /** The path to the individual event resource */
    resourceURI?: string
    /** The name of the event */
    name?: string
}

export type Events = {
    /** The unique ID of the event resource */
    id: number
    /** The title of the event */
    title: string
    /** A description of the event */
    description: string
    /** The canonical URL identifier for this resource */
    resourceURI: string
    /** A set of public web site URLs for the event */
    urls: MarvelUrl[]
    /** The date the resource was most recently modified */
    modified: Date
    /** The date of publication of the first issue in this event */
    start: Date
    /** The date of publication of the last issue in this event */
    end: Date
    /** The representative image for this event */
    thumbnail: MarvelImage
    /** A resource list containing the comics in this event */
    comics: ResourceList<ComicSummary>
    /** A resource list containing the stories in this event */
    stories: ResourceList<StorySummary>
    /** A resource list containing the series in this event */
    series: ResourceList<SeriesSummary>
    /** A resource list containing the characters which appear in this event */
    characters: ResourceList<CharacterSummary>
    /** A resource list containing creators whose work appears in this event */
    creators: ResourceList<CreatorSummary>
    /** A summary representation of the event which follows this event */
    next: EventSummary
    /** A summary representation of the event which preceded this event */
    previous: EventSummary
}