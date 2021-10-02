import { MarvelApiResponse, OrderDirection, QueryOptions } from "../../models/marvelApi";
import apiConfig from "./config"

export async function makeRequest<T>(endpoint: string, query: QueryOptions = {}): Promise<MarvelApiResponse<T>> {
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
    const queryComponents = new Array<string>();

    queryKeys.forEach(key => {
        let value = stringifyQueryValue(query[key]);

        if (value === '' || value === undefined || value === null) { return; }
        if (key === 'orderDirection') { return; }
        if (key === 'orderBy' && query.orderDirection === OrderDirection.Descending) {
            value = `-${value}`
        }

        queryComponents.push(`${key}=${value}`);
    })

    return queryComponents.join('&');
}

function stringifyQueryValue(value: QueryOptions[string]): string {
    if (typeof value === "boolean") {
        return value.toString()
    }

    if (typeof value === "object") {
        if (Array.isArray(value)) {
            return value.map(stringifyQueryValue).join(",")
        }
        // return the date only component of the ISO string
        if ("toISOString" in value) {
            return value.toISOString().split('T')[0];
        }
    }

    if (typeof value === 'undefined') {
        return ''
    }

    return '' + value;
}