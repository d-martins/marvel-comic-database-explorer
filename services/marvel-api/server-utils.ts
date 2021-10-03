import md5 from 'md5';
import { QueryOptions } from '../../models/marvelApi';
import apiConfig from './config';

export function buildServerQueryString(query: QueryOptions) {
    const { key, _key } = apiConfig;
    const ts = Date.now();

    const hash = md5(ts + _key + key);

    return { ...query, hash, ts };
}