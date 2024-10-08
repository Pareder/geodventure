import { getRandomLatLng } from 'common/utils/randomHelpers'

export function setStreetView(callback: (coords: google.maps.LatLngLiteral) => void) {
  const randomLatLng = getRandomLatLng()
  const streetViewService = new google.maps.StreetViewService()
  streetViewService.getPanorama({ location: randomLatLng, radius: 500000 }, (data) => {
    if (data?.location?.latLng) {
      const position = { lat: data.location.latLng.lat(), lng: data.location.latLng.lng() }
      const element = document.getElementById('street-map')
      const map = new google.maps.Map(element!, {
        center: position,
      })
      const panorama = new google.maps.StreetViewPanorama(element!, {
        position,
        addressControl: false,
      })
      map.setStreetView(panorama)
      callback(position)
      return
    }

    setStreetView(callback)
  })
}

export function calculateScore(distance: number) {
  const scalingFactor = 5000000
  const maxScore = 10000
  const score = maxScore * Math.exp(-distance / scalingFactor)
  return Math.round(score)
}
