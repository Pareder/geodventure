import { useState } from 'react'
import { AdvancedMarker, Map, MapMouseEvent, Pin, useMap } from '@vis.gl/react-google-maps'

import { COORDINATES } from 'common/consts/game'
import { Button } from 'common/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'common/ui/tooltip'
import { formatDistance } from 'common/utils/distance'
import { getLatLngRandomOffset } from 'common/utils/randomHelpers'

type SmallMapProps = {
  coordinates?: google.maps.LatLngLiteral
  onClick: (distance: number, hintUsed?: boolean) => void
}

export default function SmallMap({ coordinates, onClick }: SmallMapProps) {
  const [clickedCoordinates, setClickedCoordinates] = useState<google.maps.LatLngLiteral>()
  const [distance, setDistance] = useState(0)
  const [hintUsed, setHintUsed] = useState(false)
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
    onClick(distance, hintUsed)
  }

  const handleHint = () => {
    setHintUsed(true)
    const radius = 5000000
    const circle = new google.maps.Circle({
      strokeColor: '#2662D9',
      fillColor: '#2662D9',
      fillOpacity: 0.35,
      map,
      center: getLatLngRandomOffset(coordinates!, radius),
      radius,
      clickable: false,
    })
    map?.fitBounds(circle.getBounds()!)
  }

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
      {clickedCoordinates && coordinates && (
        <>
          <AdvancedMarker position={coordinates}>
            <Pin
              background="hsl(var(--chart-2))"
              borderColor="hsl(var(--chart-2))"
              glyphColor="hsl(var(--chart-2))"
            />
          </AdvancedMarker>
          <AdvancedMarker position={clickedCoordinates}>
            <Pin
              background="hsl(var(--chart-1))"
              borderColor="hsl(var(--chart-1))"
              glyphColor="hsl(var(--chart-1))"
            />
          </AdvancedMarker>
        </>
      )}
      {!!distance && (
        <div className="absolute z-10 bottom-2 left-1/2 -translate-x-1/2 py-2 px-4 rounded-md bg-background">
          Distance: {formatDistance(distance)}
        </div>
      )}
      {!distance && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="absolute z-10 bottom-2 left-1/2 -translate-x-1/2"
                disabled={hintUsed}
                onClick={handleHint}
              >
                Hint
              </Button>
            </TooltipTrigger>
            <TooltipContent>Using the hint will reduce your points by half.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </Map>
  )
}
