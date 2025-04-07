import Result from './Result'
import useMeasureEndpoint from './use-measure-endpoint'

import React from 'react'
export type EndpointResultProps = {
  name: string
  getEndpoint: (id: string) => string
  didHitEdgeCache?: (response: Response) => boolean
}

const EndpointResult = ({ name, getEndpoint, didHitEdgeCache }: EndpointResultProps) => {
  const { first, average, endpoint } = useMeasureEndpoint(getEndpoint, { didHitEdgeCache })

  return (
    <tr>
      <td>
        <a target="_blank" href={endpoint}>
          {name}
        </a>
      </td>
      <td>
        <Result value={first} />
      </td>
      <td>
        <Result value={average} />
      </td>
    </tr>
  )
}

export default EndpointResult
