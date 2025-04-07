import { Box, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'

import EndpointResult, { EndpointResultProps } from './EndpointResult'


const endpoints: EndpointResultProps[] = [
  { name: 'GurbaniNow', getEndpoint: ( id: string ) => `https://api.gurbaninow.com/v2/shabad/${id}` },
  { name: 'Azure Function -> GurbaniNow', getEndpoint: ( id: string ) => `https://shabad-web-app12079e8a.azurewebsites.net/api/shabad/${id}` },
  { name: 'Azure Blob Storage', getEndpoint: ( id: string ) => `https://shabadosexpapinext.z13.web.core.windows.net/shabad/${id}` },
  // [ 'Azure Premium Blob Storage', 'https://shabadosapinextpremium.z13.web.core.windows.net/shabad/DMP' ],
  { name: 'Azure CDN -> Azure Blob Storage', getEndpoint: ( id: string ) => `https://cdn-endpoint-shabadosexpapinext.azureedge.net/shabad/${id}` },
  // [ 'Azure CDN -> Azure Premium Blob Storage', 'https://cdn-endpoint-shabadosapinextpremium.azureedge.net/shabad/DMP' ],
  { name: 'Cloudflare Edge -> Azure Blob Storage', getEndpoint: ( id: string ) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=blob` },
  { name: 'Cloudflare Edge -> GurbaniNow', getEndpoint: ( id: string ) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=gurbaninow` },
  { name: 'Cloudflare Edge -> Azure Function -> GurbaniNow', getEndpoint: ( id: string ) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=function` },
  { name: 'Cloudflare Edge -> Azure CDN -> Azure Blob Storage', getEndpoint: ( id: string ) => `https://shabad-edge.harjot-shabados.workers.dev/api/shabad/${id}?mode=cdn` },
].toReversed()

const App = () => (
  <Box p="8" pt="0">
    <Text fontSize="5xl" marginBottom="5">Shabad OS API Benchmarking</Text>

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
            {endpoints.map( ( {name, getEndpoint } ) => (
              <EndpointResult
                key={name}
                name={name}
                getEndpoint={getEndpoint}
              />
            ) )}
          </Tbody>
        </Table>
      </TableContainer>
  </Box>
)

export default App
