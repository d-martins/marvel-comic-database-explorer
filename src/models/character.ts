import { ComicSummary } from "./comic"
import { EventSummary } from "./events"
import { MarvelImage, MarvelUrl, ResourceList } from "./marvelApi"
import { SeriesSummary } from "./series"
import { StorySummary } from "./stories"

export type CharacterSummary = {
    /** The path to the individual character resource */
    resourceURI?: string
    /** The full name of the character */
    name?: string
}

export type Character = {
    /** The unique ID of the character resource */
    id?: number
    /** The name of the character */
    name?: string
    /** A short bio or description of the character */
    description?: string
    /** The date the resource was most recently modified */
    modified?: Date
    /** The canonical URL identifier for this resource */
    resourceURI?: string
    /** A set of public web site URLs for the resource */
    urls?: MarvelUrl[]
    /** The representative image for this character */
    thumbnail?: MarvelImage
    /** A resource list containing comics which feature this character */
    comics?: ResourceList<ComicSummary>
    /** A resource list of stories in which this character appears */
    stories?: ResourceList<StorySummary>
    /** A resource list of events in which this character appears */
    events?: ResourceList<EventSummary>
    /** A resource list of series in which this character appears */
    series?: ResourceList<SeriesSummary>
}