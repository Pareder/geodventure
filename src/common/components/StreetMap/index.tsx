import { useEffect } from 'react'
import { useApiIsLoaded } from '@vis.gl/react-google-maps'

import { getStreetView, setStreetView } from './utils'

type StreetMapProps = {
  skipOnInit?: boolean
  coordinates?: google.maps.LatLngLiteral
  setCoordinates?: (coords: google.maps.LatLngLiteral) => void
}

export default function StreetMap({ skipOnInit, coordinates, setCoordinates }: StreetMapProps) {
  const isLoaded = useApiIsLoaded()

  useEffect(() => {
    if (!isLoaded || skipOnInit) return
    getStreetView(setCoordinates)
  }, [isLoaded, skipOnInit])

  useEffect(() => {
    if (coordinates) {
      setStreetView(coordinates)
    }
  }, [coordinates])

  return (
    <div
      id="street-map"
      className="w-full h-full"
    />
  )
}
