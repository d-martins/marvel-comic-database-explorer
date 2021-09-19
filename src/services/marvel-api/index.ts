import { MarvelApiResponse, QueryOptions } from "../../models/marvelApi";
import apiConfig from "./config"


export async function makeRequest<T>(endpoint: string, query: QueryOptions): Promise<MarvelApiResponse<T>> {
    try {
        const requestUrl = buildRequestUrl(endpoint, query);
        const resp = await fetch(requestUrl).catch((err) => { throw new Error("Failed to connect with the Marvel service.") });
        const body = await resp.json().catch((err) => { console.error(err); throw new Error("Received unexpected response.") });

        if ("status" in body || "code" in body || "data" in body) {
            return body;
        }

        throw new Error("Received unexpected response.");
    } catch (err) {
        return {
            code: 0,
            status: err instanceof Error ? err.message : "Something went wrong!"
        }
    }
}

function buildRequestUrl(endpoint: string, query: QueryOptions) {
    const { key, url } = apiConfig;
    const queryString = buildQueryString({ ...query, apikey: key })

    return `${url}${endpoint}?${queryString}`
}

function buildQueryString(query: QueryOptions) {
    const queryKeys = Object.keys(query);
    const queryComponents = queryKeys.map((key) => {
        return `${key}=${query[key]}`
    });

    return queryComponents.join('&');
}