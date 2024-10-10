import { useEffect } from 'react'
import { useApiIsLoaded } from '@vis.gl/react-google-maps'
import { setStreetView } from './utils'
import styles from './StreetMap.module.css'

type StreetMapProps = {
  setCoordinates?: (coords: google.maps.LatLngLiteral) => void
}

export default function StreetMap({ setCoordinates }: StreetMapProps) {
  const isLoaded = useApiIsLoaded()

  useEffect(() => {
    if (!isLoaded) return
    setStreetView(setCoordinates)
  }, [isLoaded])

  return (
    <div
      id="street-map"
      className={styles.map}
    />
  )
}