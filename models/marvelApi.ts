export enum OrderDirection { Ascending, Descending }

export type QueryOptions = {
    [key: string]: string | string[] | number | number[] | Date | Date[] | boolean | undefined 
}

export interface BaseQueryOptions {
    /** How many results should be returned. Max 100 */
    limit?: number
    /** How many results should be skipped (for pagination) */
    offset?: number
    /** Ascending or Descending */
    orderDirection?: OrderDirection
    /** The field to order results by */
    orderBy?: string
}

export type MarvelApiResponse<T> = {
    /** The HTTP status code of the returned result */
    code: number
    /** A string description of the call status */
    status: string
    /** The results returned by the call, */
    data?: MarvelDataContainer<T>
    /** A digest value of the content */
    etag?: string
    /** The copyright notice for the returned result */
    copyright?: string
    /** The attribution notice for this result */
    attributionText?: string
    /** An HTML representation of the attribution notice for this result */
    attributionHTML?: string
}

export type MarvelDataContainer<T> = {
    /** The requested offset (skipped results) of the call */
    offset: number
    /** The requested result limit */
    limit: number
    /** The total number of results available */
    total: number
    /** The total number of results returned by this call */
    count: number
    /** The list of entities returned by the call */
    results: T[]
}

export type TextObject = {
    /** The string description of the text object (e.g. solicit text, preview text, etc.) */
    type: string
    /** A language code denoting which language the text object is written in */
    language: string
    /** The text of the text object */
    text: string
}

export type MarvelUrl = {
    /** A text identifier for the URL */
    type: string
    /** A full URL (including scheme, domain, and path) */
    url: string
}

export type MarvelImage = {
    /** The file extension for the image */
    extension: string
    /** The directory path of to the image */
    path: string
}

export type ResourceList<T> = {
    /** The number of total available resources in this list */
    available: number
    /** The number of resources returned in this resource list (up to 20) */
    returned: number
    /** The path to the list of full view representations of the items in this resource list */
    collectionURI: number
    /** A list of summary views of the items in this resource list */
    items: T[]
}