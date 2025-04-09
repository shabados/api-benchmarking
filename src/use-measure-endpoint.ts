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

const IDs = ['DMP', '2A1', 'S0R', 'X0C', 'Z1W']
const getRandomId = () => IDs[Math.floor(Math.random() * IDs.length)]

export type Reading = {
  duration: number
  cacheHit: boolean | undefined
}

export const getPercentileFor = (readings: Reading[]) => {
  const sorted = [...readings].sort((a, b) => a.duration - b.duration)

  return (percentile: number) => {
    if (percentile === 0) return sorted[0]

    const index = Math.ceil((percentile / 100) * sorted.length) - 1
    return sorted[index]
  }
}

type UseMeasureEndpointOptions = {
  totalCount?: number
  browserCache?: boolean
  didHitEdgeCache?: (response: Response) => boolean
}

const useMeasureEndpoint = (
  getEndpoint: (id: string) => string,
  { totalCount = 30, browserCache = false, didHitEdgeCache }: UseMeasureEndpointOptions
) => {
  const [lock, setLock] = useAtom(lockEndpointAtom)

  const endpoint = getEndpoint(IDs[0])

  const [readings, setReadings] = useState<Reading[]>([])
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

    void fetchWithTime(endpoint, {
      cache: browserCache ? 'default' : 'no-store',
    })
      .then(({ duration, response }) => setReadings([...readings, { duration, cacheHit: didHitEdgeCache?.(response) }]))
      .catch(() => setError(true))
  }, [isComplete, endpoint, readings, lock, setLock, browserCache, didHitEdgeCache])

  const [first] = readings

  const getPercentile = getPercentileFor(readings)

  return { readings, getPercentile, first, isComplete, error, endpoint }
}

export default useMeasureEndpoint
