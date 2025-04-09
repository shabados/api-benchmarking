import React from 'react'

import EndpointResult, { EndpointResultProps } from './EndpointResult'
import { msKey } from './Result'
import useIpLocation from './use-ip-location'
import { shareHtml } from './share'

const didHitCfCache = (response: Response) => response.headers.get('cf-cache-status') === 'HIT'
const didHitBunnyCache = (response: Response) => response.headers.get('cdn-cache') === 'HIT'

const endpoints: EndpointResultProps[] = [
  {
    name: 'GurbaniNow',
    getEndpoint: (id: string) => `https://api.gurbaninow.com/v2/shabad/${id}`,
  },
  {
    name: 'shabados.com/api',
    getEndpoint: (id: string) => `https://www.shabados.com/api/g/${id}/`,
    didHitEdgeCache: (r: Response) => r.headers.get('x-cache') === 'HIT',
  },
  {
    name: 'Cloudflare Edge -> GurbaniNow',
    getEndpoint: (id: string) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=gurbaninow`,
    didHitEdgeCache: didHitCfCache,
  },
  {
    name: 'Cloudflare R2',
    getEndpoint: (id: string) => `https://content.shabados.com/package.json`,
  },
  {
    name: 'Cloudflare R2 -> Cloudflare Edge Cache',
    getEndpoint: (id: string) => `https://api.shabados.com/package.json`,
    didHitEdgeCache: didHitCfCache,
  },
  {
    name: 'Bunny Standard Storage + Bunny CDN',
    getEndpoint: (id: string) => `https://standard-test-cdn.b-cdn.net/package.json`,
    didHitEdgeCache: didHitBunnyCache,
  },
  {
    name: 'Bunny Edge Storage + Bunny CDN',
    getEndpoint: (id: string) => `https://s-edge-test-cdn.b-cdn.net/package.json`,
    didHitEdgeCache: didHitBunnyCache,
  },
]

const App = () => {
  const location = useIpLocation()

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Shabad OS API: Bench</h1>

        <button onClick={shareHtml} className="px-4 py-2 bg-white rounded-xl font-medium cursor-pointer">
          Share
        </button>
      </div>

      <div className="mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-5 text-sm">
            {Object.entries(msKey).map(([key, value]) => (
              <div key={key} className={`flex items-center gap-2`}>
                <div className={`w-2 h-2 rounded-full ${value.class}`} />
                <div>
                  <span className="capitalize">{key} </span>
                  <span>
                    ({'<'}
                    {value.ms}ms)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-row gap-4 text-sm">
            <span>x Cache miss</span>
            <span>✓ Cache hit</span>
          </div>
        </div>
      </div>

      {location ? (
        <p className="text-lg">
          {location.city}, {location.country_name} ({location.region})
        </p>
      ) : (
        <p>Locating</p>
      )}

      <table className="table-fixed w-full mt-6 overflow-x-auto">
        <thead className="border-b border-gray-200">
          <tr className="text-left uppercase text-sm *:font-light p-4">
            <th>Source</th>
            <th>First</th>
            <th>p50</th>
            <th>p75</th>
            <th>p90</th>
            <th>Fastest</th>
            <th>Slowest</th>
          </tr>
        </thead>

        <tbody>
          {endpoints.map(({ name, ...rest }) => (
            <EndpointResult key={name} name={name} {...rest} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
