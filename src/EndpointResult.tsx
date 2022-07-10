import { Link, Td, Tr } from '@chakra-ui/react'

import Result from './Result'
import useMeasureEndpoint from './use-measure-endpoint'

export type EndpointResultProps = {
  name: string,
  endpoint: string,
  browserCache?: boolean,
}

const EndpointResult = ( { name, endpoint, browserCache }: EndpointResultProps ) => {
  const { first, average } = useMeasureEndpoint( endpoint, { browserCache } )

  return (
    <Tr>
      <Td><Link target="_blank" href={endpoint}>{name}</Link></Td>
      <Td><Result value={first} /></Td>
      <Td><Result value={average} /></Td>
    </Tr>

  )
}

export default EndpointResult
