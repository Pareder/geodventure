import { useEffect, useState } from 'react'
import { AdvancedMarker, Map, MapMouseEvent, Pin, useMap } from '@vis.gl/react-google-maps'

import { COORDINATES } from 'common/consts/game'
import { useAuth } from 'common/services/auth'
import { Avatar, AvatarFallback } from 'common/ui/avatar'
import { Button } from 'common/ui/button'

import { GameMessage } from '../../../global'

type SmallMapProps = {
  coordinates?: google.maps.LatLngLiteral
  answers?: GameMessage['answers']
  loading: boolean
  onClick: ({ coordinates, distance }: { coordinates: google.maps.LatLngLiteral; distance: number }) => void
  onNext: () => void
}

export default function SmallMap({ coordinates, answers, loading, onClick, onNext }: SmallMapProps) {
  const [clickedCoordinates, setClickedCoordinates] = useState<google.maps.LatLngLiteral>()
  const map = useMap('small-map')
  const { user } = useAuth()
  const areMarkersVisible = answers?.length !== 0

  const handleClick = (e: MapMouseEvent) => {
    if (clickedCoordinates || !coordinates || !e.detail.latLng) return

    const coords = { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }
    setClickedCoordinates(coords)
    const distance = google.maps.geometry.spherical.computeDistanceBetween(coordinates, coords)
    onClick({ coordinates: coords, distance })
  }

  useEffect(() => {
    if (!areMarkersVisible) {
      setClickedCoordinates(undefined)
      return
    }

    const minDistanceIndex = answers?.reduce(
      (res, answer, index) => (answer.distance < answers[res].distance ? index : res),
      0,
    )
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(coordinates!)

    const polylines = answers?.map((answer, index) => {
      if (!answer.coordinates) return

      bounds.extend(answer.coordinates)
      return new google.maps.Polyline({
        path: [coordinates!, answer.coordinates],
        map,
        strokeColor: index === minDistanceIndex ? 'green' : 'red',
      })
    })

    map?.fitBounds(bounds)

    return () => polylines?.forEach((polyline) => polyline?.setMap(null))
  }, [areMarkersVisible])

  return (
    <Map
      id="small-map"
      mapId="small-map"
      className="absolute bottom-4 left-4 z-10 w-[500px] h-[300px] hover:w-[700px] hover:h-[500px] rounded-md overflow-hidden transition-all"
      defaultCenter={COORDINATES}
      defaultZoom={2}
      disableDefaultUI
      onClick={handleClick}
    >
      {clickedCoordinates && (
        <AdvancedMarker position={clickedCoordinates}>
          <Avatar className="h-6 w-6">
            <AvatarFallback text={user?.displayName} />
          </Avatar>
        </AdvancedMarker>
      )}
      {areMarkersVisible && (
        <>
          <AdvancedMarker position={coordinates}>
            <Pin
              background="hsl(var(--chart-2))"
              borderColor="hsl(var(--chart-2))"
              glyphColor="hsl(var(--chart-2))"
            />
          </AdvancedMarker>
          {answers?.map(
            (answer) =>
              answer.coordinates && (
                <AdvancedMarker
                  key={answer.uid}
                  position={answer.coordinates}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback text={answer.username} />
                  </Avatar>
                </AdvancedMarker>
              ),
          )}
        </>
      )}
      {areMarkersVisible && (
        <Button
          variant="outline"
          className="absolute z-10 bottom-2 left-1/2 -translate-x-1/2"
          loading={loading}
          onClick={onNext}
        >
          Next round
        </Button>
      )}
    </Map>
  )
}
