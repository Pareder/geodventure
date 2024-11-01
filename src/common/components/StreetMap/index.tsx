import { useEffect } from 'react'
import { useApiIsLoaded } from '@vis.gl/react-google-maps'

import { getSetStreetView } from './utils'

type StreetMapProps = {
  skipOnInit?: boolean
  setCoordinates?: (coords: google.maps.LatLngLiteral) => void
}

export default function StreetMap({ skipOnInit, setCoordinates }: StreetMapProps) {
  const isLoaded = useApiIsLoaded()

  useEffect(() => {
    if (!isLoaded || skipOnInit) return
    getSetStreetView(setCoordinates)
  }, [isLoaded, skipOnInit])

  return (
    <div
      id="street-map"
      className="w-full h-full"
    />
  )
}
