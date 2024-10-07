export function getRandomNumber(from: number, to: number, fixed?: number) {
  const number = Math.random() * (to - from) + from
  return fixed !== undefined ? +number.toFixed(fixed) : number
}

export function getRandomLatLng(): google.maps.LatLngLiteral {
  return {
    lat: getRandomNumber(-90, 90, 6),
    lng: getRandomNumber(-180, 180, 6),
  }
}
