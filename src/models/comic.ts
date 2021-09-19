import { CharacterSummary } from "./character"
import { CreatorSummary } from "./creators"
import { EventSummary } from "./events"
import { MarvelImage, MarvelUrl, ResourceList, TextObject } from "./marvelApi"
import { SeriesSummary } from "./series"
import { StorySummary } from "./stories"

export type ComicSummary = {
    resourceURI?: string // The path to the individual comic resource
    name?: string // The canonical name of the comic
}

export type ComicDate = {
    type?: string // A description of the date (e.g. onsale date, FOC date)
    date?: Date // The date
}

export type ComicPrice = {
    type?: string // A description of the price (e.g. print price, digital price)
    price?: number // The price (all prices in USD)
}

export type Comic = {
    /** The unique ID of the comic resource */
    id?: number
    /** The ID of the digital comic representation of this comic. Will be 0 if the comic is not available digitally */
    digitalId?: number
    /** The canonical title of the comic */
    title?: string
    /** The number of the issue in the series (will generally be 0 for collection formats) */
    issueNumber?: number
    /** If the issue is a variant (e.g. an alternate cover, second printing, or director's cut), a text description of the variant */
    variantDescription?: string
    /** The preferred description of the comic */
    description?: string
    /** The date the resource was most recently modified */
    modified?: Date
    /** The ISBN for the comic (generally only populated for collection formats) */
    isbn?: string
    /** The UPC barcode number for the comic (generally only populated for periodical formats) */
    upc?: string
    /** The Diamond code for the comic */
    diamondCode?: string
    /** The EAN barcode for the comic */
    ean?: string
    /** The ISSN barcode for the comic */
    issn?: string
    /** The publication format of the comic e.g. comic, hardcover, trade paperback */
    format?: string
    /** The number of story pages in the comic */
    pageCount?: number
    /** A set of descriptive text blurbs for the comic */
    textObjects?: TextObject[]
    /** The canonical URL identifier for this resource */
    resourceURI?: string
    /** A set of public web site URLs for the resource */
    urls?: MarvelUrl[]
    /** A summary representation of the series to which this comic belongs */
    series?: SeriesSummary
    /** A list of variant issues for this comic (includes the "original" issue if the current issue is a variant) */
    variants?: ComicSummary[]
    /** A list of collections which include this comic (will generally be empty if the comic's format is a collection) */
    collections?: ComicSummary[]
    /** A list of issues collected in this comic (will generally be empty for periodical formats such as "comic" or "magazine") */
    collectedIssues?: ComicSummary[]
    /** A list of key dates for this comic */
    dates?: ComicDate[]
    /** A list of prices for this comic */
    prices?: ComicPrice[]
    /** The representative image for this comic */
    thumbnail?: MarvelImage
    /** A list of promotional images associated with this comic */
    images?: MarvelImage[]
    /** A resource list containing the creators associated with this comic */
    creators?: ResourceList<CreatorSummary>
    /** A resource list containing the characters which appear in this comic */
    characters?: ResourceList<CharacterSummary>
    /** A resource list containing the stories which appear in this comic */
    stories?: ResourceList<StorySummary>
    /** A resource list containing the events in which this comic appears */
    events?: ResourceList<EventSummary>
}