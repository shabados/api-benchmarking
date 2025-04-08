import React from 'react'
import Result from './Result'
import useMeasureEndpoint from './use-measure-endpoint'

export type EndpointResultProps = {
  name: string
  getEndpoint: (id: string) => string
  didHitEdgeCache?: (response: Response) => boolean
}

const EndpointResult = ({ name, getEndpoint, didHitEdgeCache }: EndpointResultProps) => {
  const { first, average, endpoint, error } = useMeasureEndpoint(getEndpoint, { didHitEdgeCache })

  return (
    <tr className="*:pr-12 *:py-1">
      <td>
        <a target="_blank" href={endpoint}>
          ⇗ {name}
        </a>
      </td>
      <td>{error ? <span className="text-red-500">Error</span> : <Result value={first} />}</td>
      <td>{error ? <span className="text-red-500">Error</span> : <Result value={average} />}</td>
    </tr>
  )
}

export default EndpointResult
