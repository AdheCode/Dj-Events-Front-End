module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    // api_url_host: process.env.API_URL_HOST,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    api_url_host: process.env.API_URL_HOST,
    mapbox_api_token: process.env.MAPBOX_API_TOKEN,
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY,
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}
