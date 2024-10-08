import { useState } from 'react'
import { AdvancedMarker, Map, MapMouseEvent, Pin, useMap } from '@vis.gl/react-google-maps'
import { formatDistance } from 'common/utils/distance'
import { COORDINATES } from './consts'
import styles from './Home.module.css'

type SmallMapProps = {
  coordinates?: google.maps.LatLngLiteral
  onClick: (distance: number) => void
}

export default function SmallMap({ coordinates, onClick }: SmallMapProps) {
  const [clickedCoordinates, setClickedCoordinates] = useState<google.maps.LatLngLiteral>()
  const [distance, setDistance] = useState(0)
  const map = useMap('small-map')

  const handleClick = (e: MapMouseEvent) => {
    if (clickedCoordinates || !coordinates || !e.detail.latLng) return

    const coords = { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }
    setClickedCoordinates(coords)
    new google.maps.Polyline({ path: [coordinates, coords], map })
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(coordinates)
    bounds.extend(coords)
    map?.fitBounds(bounds)
    const distance = google.maps.geometry.spherical.computeDistanceBetween(coordinates, coords)
    setDistance(distance)
    onClick(distance)
  }

  return (
    <Map
      id="small-map"
      mapId="small-map"
      className={styles.smallMap}
      defaultCenter={COORDINATES}
      defaultZoom={2}
      disableDefaultUI
      onClick={handleClick}
    >
      {clickedCoordinates && coordinates && (
        <>
          <AdvancedMarker position={coordinates}>
            <Pin
              background="#22ccff"
              borderColor="#1e89a1"
              glyphColor="#0f677a"
            />
          </AdvancedMarker>
          <AdvancedMarker position={clickedCoordinates}>
            <Pin
              background="#22ccff"
              borderColor="#1e89a1"
              glyphColor="#0f677a"
            />
          </AdvancedMarker>
        </>
      )}
      {!!distance && <div className={styles.distance}>Distance: {formatDistance(distance)}</div>}
    </Map>
  )
}
