import { CharacterSummary } from "./character";
import { ComicSummary } from "./comic";
import { CreatorSummary } from "./creators";
import { EventSummary } from "./events";
import { MarvelImage, MarvelUrl, ResourceList } from "./marvelApi";
import { StorySummary } from "./stories";

export type SeriesSummary = {
    /** The path to the individual series resource */
    resourceURI?: string
    /** The canonical name of the series */
    name?: string
}

export type Series = {
    /** The unique ID of the series resource */
    id?: number
    /** The canonical title of the series */
    title?: string
    /** A description of the series */
    description?: string
    /** The canonical URL identifier for this resource */
    resourceURI?: string
    /** A set of public web site URLs for the resource */
    urls?: MarvelUrl[]
    /** The first year of publication for the series */
    startYear?: number
    /** The last year of publication for the series (conventionally, 2099 for ongoing series) */
    endYear?: number
    /** The age-appropriateness rating for the series */
    rating?: string
    /** The date the resource was most recently modified */
    modified?: Date
    /** The representative image for this series */
    thumbnail?: MarvelImage
    /** A resource list containing comics in this series */
    comics?: ResourceList<ComicSummary>
    /** A resource list containing stories which occur in comics in this series */
    stories?: ResourceList<StorySummary>
    /** A resource list containing events which take place in comics in this series */
    events?: ResourceList<EventSummary>
    /** A resource list containing characters which appear in comics in this series */
    characters?: ResourceList<CharacterSummary>
    /** A resource list of creators whose work appears in comics in this series */
    creators?: ResourceList<CreatorSummary>
    /** A summary representation of the series which follows this series */
    next?: SeriesSummary
    /** A summary representation of the series which preceded this series */
    previous?: SeriesSummary
}