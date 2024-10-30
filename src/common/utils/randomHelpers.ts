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

export function getRandomString(length: number) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
