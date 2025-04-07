import EndpointResult, { EndpointResultProps } from './EndpointResult'

import React from 'react'
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

const App = () => (
  <div className="p-8 pt-0">
    <h1 className="text-5xl mb-5">Shabad OS API Benchmarking</h1>

    <table className="table-auto">
      <thead>
        <tr>
          <th>Source</th>
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

export default App
