import { CharacterSummary } from "./character";
import { ComicSummary } from "./comic";
import { CreatorSummary } from "./creators";
import { EventSummary } from "./events";
import { MarvelImage, BaseQueryOptions, ResourceList } from "./marvelApi";
import { SeriesSummary } from "./series";

export enum StoriesOrderByFields { Id = "id", Modified = "modified" }

export interface StoryQueryOptions extends BaseQueryOptions {
    /** Format YYYY-MM-DD */
    modifiedSince?: Date
    /** Array of creator ids */
    creators?: number[]
    /** Array of character ids */
    characters?: number[]
    /** Array of comics ids */
    comics?: number[]
    /** Array of event ids */
    events?: number[]
    /** Array of story ids */
    series?: number[]
    /** Field to order results by */
    orderBy?: StoriesOrderByFields
}


export type StorySummary = {
    /** The canonical name of the story */
    name: string
    /** The type of the story (interior or cover) */
    type: string
    /** The path to the individual story resource */
    resourceURI: string
}

export type Story = {
    /** The unique ID of the story resource */
    id: number
    /** The story title */
    title: string
    /** A short description of the story */
    description: string
    /** The canonical URL identifier for this resource */
    resourceURI: string
    /** The story type e.g.interior story, cover, text story */
    type: string
    /** The date the resource was most recently modified */
    modified: Date
    /** The representative image for this story */
    thumbnail: MarvelImage
    /** A resource list containing comics in which this story takes place */
    comics: ResourceList<ComicSummary>
    /** A resource list containing series in which this story appears */
    series: ResourceList<SeriesSummary>
    /** A resource list of the events in which this story appears */
    events: ResourceList<EventSummary>
    /** A resource list of characters which appear in this story */
    characters: ResourceList<CharacterSummary>
    /** A resource list of creators who worked on this story */
    creators: ResourceList<CreatorSummary>
    /** A summary representation of the issue in which this story was originally published */
    originalissue: ComicSummary
}