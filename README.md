# API Benchmarking Tool

Simple tool to benchmark the various Shabad OS API PoCs. We can evolve this into a testing tool in the future.

## Adding a new endpoint

Add the new endpoint to the `endpoints` array in `src/App.tsx`.

You can specify an optional `didHitEdgeCache` function to check if the endpoint hit the edge cache, if applicable (not all endpoints are edge-cached).

When setting up your endpoint, you must set the following response headers:

- `Access-Control-Allow-Origin: *`: to allow cross-origin api calls
- `Access-Control-Expose-Headers: *`: so that the frontend can read the response headers to determine cache hits etc
- `Access-Control-Allow-Headers: Cache-Control`: so that the frontend can set the `Cache-Control` heade to bypass the cache.

Also ensure that your endpoint respects the `Cache-Control` request header - `no-cache` will be used to bypass the edge cache (if applicable).

## Development

`npm install` to install dependencies. `npm start` to run the local dev server.

## Deployment

Deployed with vercel using `npx vercel deploy --prod`. Currently lives on https://api-benchmark-tool.vercel.app.
