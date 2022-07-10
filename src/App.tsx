import { Box, FormControl, FormLabel, Switch, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useState } from 'react'

import EndpointResult from './EndpointResult'
import { useMeasureState } from './use-measure-endpoint'

const endpoints = [
  [ 'GurbaniNow', 'https://api.gurbaninow.com/v2/shabad/DMP' ],
  [ 'Azure Function -> GurbaniNow', 'https://shabad-web-app12079e8a.azurewebsites.net/api/shabad/DMP' ],
  [ 'Azure Blob Storage', 'https://shabadosexpapinext.z13.web.core.windows.net/shabad/DMP' ],
  // [ 'Azure Premium Blob Storage', 'https://shabadosapinextpremium.z13.web.core.windows.net/shabad/DMP' ],
  [ 'Azure CDN -> Azure Blob Storage', 'https://cdn-endpoint-shabadosexpapinext.azureedge.net/shabad/DMP' ],
  // [ 'Azure CDN -> Azure Premium Blob Storage', 'https://cdn-endpoint-shabadosapinextpremium.azureedge.net/shabad/DMP' ],
  [ 'Cloudflare Edge -> Azure Blob Storage', 'https://shabad-edge.harjot-shabados.workers.dev/api/shabad/DMP?mode=blob' ],
  [ 'Cloudflare Edge -> GurbaniNow', 'https://shabad-edge.harjot-shabados.workers.dev/api/shabad/DMP?mode=gurbaninow' ],
  [ 'Cloudflare Edge -> Azure Function -> GurbaniNow', 'https://shabad-edge.harjot-shabados.workers.dev/api/shabad/DMP?mode=function' ],
  [ 'Cloudflare Edge -> Azure CDN -> Azure Blob Storage', 'https://shabad-edge.harjot-shabados.workers.dev/api/shabad/DMP?mode=cdn' ],
].reverse()

const App = () => {
  const isMeasuring = useMeasureState()
  const [ shouldCache, setShouldCache ] = useState( false )

  return (
    <Box p="8" pt="0">
      <Text fontSize="5xl" marginBottom="5">Shabad OS API Benchmarking</Text>

      <Text>
        Cloudflare Edge Cache TTL = 75s.
        Refresh within 75 seconds after results to see how the first response time changes.
      </Text>

      <Box p="4">
        <FormControl display="flex" alignItems="center" isDisabled={isMeasuring}>
          <FormLabel htmlFor="browser-caching" mb="0">
            Browser Caching
          </FormLabel>
          <Switch id="browser-caching" size="lg" isChecked={shouldCache} onChange={( { target: { checked } } ) => setShouldCache( checked )} />
        </FormControl>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Source</Th>
              <Th>First request duration</Th>
              <Th>Average request duration</Th>
            </Tr>
          </Thead>

          <Tbody>
            {endpoints.map( ( [ name, endpoint ] ) => (
              <EndpointResult
                key={endpoint}
                name={name}
                endpoint={endpoint}
                browserCache={shouldCache}
              />
            ) )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default App
