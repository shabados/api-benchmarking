import { useEffect, useState } from 'react'

const useIpLocation = () => {
  const [location, setLocation] = useState<{
    query: string
    status: string
    country: string
    countryCode: string
    region: string
    regionName: string
    city: string
  }>()

  useEffect(() => {
    fetch('http://ip-api.com/json/')
      .then((res) => res.json())
      .then((data) => setLocation(data))
  }, [])

  return location
}

export default useIpLocation
