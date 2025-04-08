import { useEffect, useState } from 'react'

const useIpLocation = () => {
  const [location, setLocation] = useState<{
    query: string
    status: string
    country_name: string
    country_code: string
    region: string
    city: string
  }>()

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => setLocation(data))
  }, [])

  return location
}

export default useIpLocation
