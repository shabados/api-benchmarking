import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'

const lockEndpointAtom = atom<null | string>( null )

export const useMeasureState = () => {
  const [ lock ] = useAtom( lockEndpointAtom )

  return lock !== null
}

const fetchWithTime = async ( input: string, init?: RequestInit ) => {
  const startTime = performance.now()

  await fetch( input, init )

  return performance.now() - startTime
}

type UseMeasureEndpointOptions = {
  totalCount?: number,
  browserCache?: boolean,
}

const useMeasureEndpoint = (
  endpoint: string,
  { totalCount = 10, browserCache = false }: UseMeasureEndpointOptions
) => {
  const [ lock, setLock ] = useAtom( lockEndpointAtom )

  const [ readings, setReadings ] = useState<number[]>( [] )
  const [ error, setError ] = useState<boolean>()

  const isComplete = readings.length === totalCount || !!error

  useEffect( () => {
    setReadings( [] )
  }, [ browserCache, totalCount, endpoint ] )

  useEffect( () => {
    if ( isComplete ) {
      if ( lock === endpoint ) setLock( null )
      return
    }

    if ( !lock ) {
      setLock( endpoint )
      return
    }

    if ( lock !== endpoint ) return

    void fetchWithTime( endpoint, { cache: browserCache ? 'default' : 'no-store' } )
      .then( ( reading ) => setReadings( [ ...readings, reading ] ) )
      .catch( () => setError( true ) )
  }, [ isComplete, endpoint, readings, lock, setLock, browserCache ] )

  const max = Math.max( ...readings )
  const min = Math.min( ...readings )
  const [ first, ...rest ] = readings
  const average = rest.reduce( ( acc, reading ) => acc + reading, 0 ) / readings.length

  return { readings, average, max, min, first, isComplete, error }
}

export default useMeasureEndpoint
