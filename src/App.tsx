import React from 'react'

import EndpointResult, { EndpointResultProps } from './EndpointResult'
import { msKey } from './Result'
import useIpLocation from './use-ip-location'

const endpoints: EndpointResultProps[] = [
  { name: 'GurbaniNow', getEndpoint: (id: string) => `https://api.gurbaninow.com/v2/shabad/${id}` },
  {
    name: 'Azure Function -> GurbaniNow',
    getEndpoint: (id: string) => `https://shabad-web-app12079e8a.azurewebsites.net/api/shabad/${id}`,
  },
  {
    name: 'Azure Blob Storage',
    getEndpoint: (id: string) => `https://shabadosexpapinext.z13.web.core.windows.net/shabad/${id}`,
  },
  // [ 'Azure Premium Blob Storage', 'https://shabadosapinextpremium.z13.web.core.windows.net/shabad/DMP' ],
  {
    name: 'Azure CDN -> Azure Blob Storage',
    getEndpoint: (id: string) => `https://cdn-endpoint-shabadosexpapinext.azureedge.net/shabad/${id}`,
  },
  // [ 'Azure CDN -> Azure Premium Blob Storage', 'https://cdn-endpoint-shabadosapinextpremium.azureedge.net/shabad/DMP' ],
  {
    name: 'Cloudflare Edge -> Azure Blob Storage',
    getEndpoint: (id: string) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=blob`,
  },
  {
    name: 'Cloudflare Edge -> GurbaniNow',
    getEndpoint: (id: string) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=gurbaninow`,
  },
  {
    name: 'Cloudflare Edge -> Azure Function -> GurbaniNow',
    getEndpoint: (id: string) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=function`,
  },
  {
    name: 'Cloudflare Edge -> Azure CDN -> Azure Blob Storage',
    getEndpoint: (id: string) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=cdn`,
  },
]

const App = () => {
  const location = useIpLocation()

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl">Shabad OS API: Bench</h1>

      <div className="flex flex-col gap-4 mb-8">
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

      {location ? (
        <p className="text-lg">
          {location.city}, {location.country} ({location.regionName})
        </p>
      ) : (
        <p>Locating</p>
      )}

      <table className="table-fixed w-full mt-6">
        <thead className="border-b border-gray-200">
          <tr className="text-left uppercase text-sm *:font-light p-4">
            <th className="w-1/4">Source</th>
            <th>First request duration</th>
            <th>Average request duration</th>
          </tr>
        </thead>

        <tbody>
          {endpoints.map(({ name, getEndpoint }) => (
            <EndpointResult key={name} name={name} getEndpoint={getEndpoint} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
