import React from 'react'
import Result from './Result'
import useMeasureEndpoint from './use-measure-endpoint'

export type EndpointResultProps = {
  name: string
  getEndpoint: (id: string) => string
  didHitEdgeCache?: (response: Response) => boolean
}

const EndpointResult = ({ name, getEndpoint, didHitEdgeCache }: EndpointResultProps) => {
  const { first, getPercentile, endpoint, error } = useMeasureEndpoint(getEndpoint, { didHitEdgeCache })

  const results = [first, getPercentile(50), getPercentile(75), getPercentile(90), getPercentile(0), getPercentile(100)]

  return (
    <tr className="*:pr-12 *:py-1">
      <td>
        <a target="_blank" href={endpoint}>
          {name}
        </a>
      </td>
      {results.map((result, index) => (
        <td key={index}>{error ? <span className="text-red-500">Error</span> : <Result value={result} />}</td>
      ))}
    </tr>
  )
}

export default EndpointResult
