import { useEffect, useState } from 'react'
import { GoogleMap, StreetViewPanorama, useJsApiLoader } from '@react-google-maps/api'
import { getRandomLatLng } from 'common/utils/randomHelpers'
import styles from './Home.module.css'

const containerStyle = {
  width: '100%',
  height: '100%',
}

function checkStreetView(callback: (coords: google.maps.LatLng | google.maps.LatLngLiteral) => void) {
  const randomLatLng = getRandomLatLng()
  const streetViewService = new google.maps.StreetViewService()
  streetViewService.getPanorama({ location: randomLatLng, radius: 500000 }, (data) => {
    if (data?.location?.latLng) {
      callback(data.location.latLng)
      return
    }

    checkStreetView(callback)
  })
}

export default function Home() {
  const [coordinates, setCoordinates] = useState<google.maps.LatLng | google.maps.LatLngLiteral>()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    checkStreetView(setCoordinates)
  }, [isLoaded])

  if (!isLoaded) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={10}
        options={{
          fullscreenControl: false,
          rotateControl: false,
          scaleControl: false,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {coordinates && (
          <StreetViewPanorama
            key={`${coordinates.lat}-${coordinates.lng}`}
            /* @ts-expect-error: Wrong prop name in library */
            position={coordinates}
            visible
            options={{
              addressControl: false,
              // enableCloseButton: false,
            }}
          />
        )}
      </GoogleMap>
    </div>
  )
}
