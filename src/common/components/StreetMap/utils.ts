import { getRandomLatLng } from 'common/utils/randomHelpers'

export function setStreetView(callback?: (coords: google.maps.LatLngLiteral) => void) {
  const randomLatLng = getRandomLatLng()
  const streetViewService = new google.maps.StreetViewService()
  streetViewService.getPanorama(
    { location: randomLatLng, radius: 500000, sources: [google.maps.StreetViewSource.OUTDOOR] },
    (data) => {
      if (data?.location?.latLng && data.links?.length) {
        const position = { lat: data.location.latLng.lat(), lng: data.location.latLng.lng() }
        const element = document.getElementById('street-map')
        const map = new google.maps.Map(element!, {
          center: position,
        })
        const panorama = new google.maps.StreetViewPanorama(element!, {
          position,
          addressControl: false,
          fullscreenControl: false,
        })
        map.setStreetView(panorama)
        callback?.(position)
        return
      }

      setStreetView(callback)
    },
  )
}
