import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'

const lockEndpointAtom = atom<null | string>(null)

export const useMeasureState = () => {
  const [lock] = useAtom(lockEndpointAtom)

  return lock !== null
}

const fetchWithTime = async (input: string, init?: RequestInit) => {
  const startTime = performance.now()

  const response = await fetch(input, init)

  return { duration: performance.now() - startTime, response }
}

type UseMeasureEndpointOptions = {
  totalCount?: number
  browserCache?: boolean
  didHitEdgeCache?: (response: Response) => boolean
}

const useMeasureEndpoint = (
  getEndpoint: (id: string) => string,
  { totalCount = 10, browserCache = false, didHitEdgeCache }: UseMeasureEndpointOptions
) => {
  const [lock, setLock] = useAtom(lockEndpointAtom)

  const endpoint = getEndpoint('DMP')

  const [readings, setReadings] = useState<
    {
      duration: number
      cacheHit: boolean | undefined
    }[]
  >([])
  const [error, setError] = useState<boolean>()

  const isComplete = readings.length === totalCount || !!error

  useEffect(() => {
    setReadings([])
  }, [browserCache, totalCount, getEndpoint])

  useEffect(() => {
    if (isComplete) {
      if (lock === endpoint) setLock(null)
      return
    }

    if (!lock) {
      setLock(endpoint)
      return
    }

    if (lock !== endpoint) return

    void fetchWithTime(endpoint, { cache: browserCache ? 'default' : 'no-store' })
      .then(({ duration, response }) => setReadings([...readings, { duration, cacheHit: didHitEdgeCache?.(response) }]))
      .catch(() => setError(true))
  }, [isComplete, endpoint, readings, lock, setLock, browserCache, didHitEdgeCache])

  const durations = readings.map(({ duration }) => duration)
  const max = Math.max(...durations)
  const min = Math.min(...durations)
  const [first, ...rest] = durations
  const average = rest.reduce((acc, duration) => acc + duration, 0) / durations.length

  return { readings, average, max, min, first, isComplete, error, endpoint }
}

export default useMeasureEndpoint
