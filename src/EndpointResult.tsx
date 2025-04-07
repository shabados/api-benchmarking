import { Link, Td, Tr } from '@chakra-ui/react'

import Result from './Result'
import useMeasureEndpoint from './use-measure-endpoint'

export type EndpointResultProps = {
  name: string,
  getEndpoint: ( id: string ) => string,
  didHitEdgeCache?: ( response: Response ) => boolean,
}

const EndpointResult = ( { name, getEndpoint, didHitEdgeCache }: EndpointResultProps ) => {
  const { first, average, endpoint } = useMeasureEndpoint( getEndpoint, { didHitEdgeCache } )

  return (
    <Tr>
      <Td><Link target="_blank" href={endpoint}>{name}</Link></Td>
      <Td><Result value={first} /></Td>
      <Td><Result value={average} /></Td>
    </Tr>

  )
}

export default EndpointResult
