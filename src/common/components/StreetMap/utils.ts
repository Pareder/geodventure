import { getRandomLatLng } from 'common/utils/randomHelpers'

type Callback = (coords: google.maps.LatLngLiteral) => void

export function getStreetView(callback?: Callback) {
  const randomLatLng = getRandomLatLng()
  const streetViewService = new google.maps.StreetViewService()
  streetViewService.getPanorama(
    { location: randomLatLng, radius: 500000, sources: [google.maps.StreetViewSource.OUTDOOR] },
    (data) => {
      if (data?.location?.latLng && data.links?.length) {
        const position = { lat: data.location.latLng.lat(), lng: data.location.latLng.lng() }
        callback?.(position)
        return
      }

      getStreetView(callback)
    },
  )
}

export function setStreetView(position: google.maps.LatLngLiteral) {
  const element = document.getElementById('street-map')
  const map = new google.maps.Map(element!, {
    center: position,
  })
  const panorama = new google.maps.StreetViewPanorama(element!, {
    position,
    addressControl: false,
    fullscreenControl: false,
    showRoadLabels: false,
  })
  map.setStreetView(panorama)
}
