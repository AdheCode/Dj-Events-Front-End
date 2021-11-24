import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export const API_URL_HOST = publicRuntimeConfig.api_url_host || "http://localhost:1337"
export const MAPBOX_API_TOKEN = publicRuntimeConfig.mapbox_api_token
export const GOOGLE_MAP_API_KEY = publicRuntimeConfig.google_map_api_key

export const PER_PAGE = 5;