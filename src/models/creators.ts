import { ComicSummary } from "./comic"
import { EventSummary } from "./events"
import { MarvelImage, MarvelUrl, BaseQueryOptions, ResourceList } from "./marvelApi"
import { SeriesSummary } from "./series"
import { StorySummary } from "./stories"

export enum EventsOrderByFields { Name = "name", Modified = "modified", StartDate = "startDate" }

export interface CreatorQueryOptions extends BaseQueryOptions {
    /** Full creator's first name */
    firstName?: string
    /** Full creator's middle name */
    middleName?: string
    /** Full creator's last name */
    lastName?: string
    /** Filter by suffix or honorific (Jr., Sr.) */
    suffix?: string
    /** Search for creators begning with the provided string */
    nameStartsWith?: string
    firstNameStartsWith?: string
    middleNameStartsWith?: string
    lastNameStartsWith?: string
    /** Format YYYY-MM-DD */
    modifiedSince?: Date
    /** Array of comic ids */
    comics?: number[]
    /** Array of series ids */
    series?: number[]
    /** Array of event ids */
    characters?: number[]
    /** Array of events ids */
    events?: number[]
    /** Array of story ids */
    stories?: number[]
    /** Field to order results by */
    orderBy?: EventsOrderByFields
}

export type CreatorSummary = {
    /** The path to the individual creator resource */
    resourceURI?: string
    /** The full name of the creator */
    name?: string
    /** The role of the creator in the parent entity */
    role?: string
}

export type Creator = {
    /** The unique ID of the creator resource */
    id?: number
    /** The first name of the creator */
    firstName?: string
    /** The middle name of the creator */
    middleName?: string
    /** The last name of the creator */
    lastName?: string
    /** The suffix or honorific for the creator */
    suffix?: string
    /** The full name of the creator(a space - separated concatenation of the above four fields) */
    fullName?: string
    /** The date the resource was most recently modified */
    modified?: Date
    /** The canonical URL identifier for this resource */
    resourceURI?: string
    /** A set of public web site URLs for the resource */
    urls?: MarvelUrl[]
    /** The representative image for this creator */
    thumbnail?: MarvelImage
    /** A resource list containing the series which feature work by this creator */
    series?: ResourceList<SeriesSummary>
    /** A resource list containing the stories which feature work by this creator */
    stories?: ResourceList<StorySummary>
    /** A resource list containing the comics which feature work by this creator */
    comics?: ResourceList<ComicSummary>
    /** A resource list containing the events which feature work by this creator */
    events?: ResourceList<EventSummary>
}