export function getRandomNumber(from: number, to: number, fixed?: number) {
  const number = Math.random() * (to - from) + from
  return fixed !== undefined ? +number.toFixed(fixed) : number
}

const continentBounds = [
  { name: 'North America', latRange: [5, 84], lngRange: [-168, -52] },
  { name: 'South America', latRange: [-56, 13], lngRange: [-81, -34] },
  { name: 'Europe', latRange: [36, 71], lngRange: [-25, 40] },
  { name: 'Africa', latRange: [-35, 37], lngRange: [-17, 51] },
  { name: 'Asia', latRange: [0, 77], lngRange: [26, 180] },
  { name: 'Australia', latRange: [-47, 0], lngRange: [100, 179] },
]

export function getRandomLatLng(): google.maps.LatLngLiteral {
  const continent = continentBounds[getRandomNumber(0, continentBounds.length - 1, 0)]
  return {
    lat: getRandomNumber(continent.latRange[0], continent.latRange[1], 6),
    lng: getRandomNumber(continent.lngRange[0], continent.lngRange[1], 6),
  }
}

export function getLatLngRandomOffset(coordinates: google.maps.LatLngLiteral, radius: number) {
  const DEGREE_IN_METERS = 111320
  const maxOffset = radius * 0.5
  const offsetDistance = Math.random() * maxOffset
  const offsetAngle = Math.random() * 2 * Math.PI

  const offsetLat = (offsetDistance / DEGREE_IN_METERS) * Math.cos(offsetAngle)
  const offsetLng = (offsetDistance / (DEGREE_IN_METERS * Math.cos(coordinates.lat))) * Math.sin(offsetAngle)

  return {
    lat: coordinates.lat + offsetLat,
    lng: coordinates.lng + offsetLng,
  }
}

export function getRandomString(length: number) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
