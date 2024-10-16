export function stringToHslColor(str?: string | null, s = 30, l = 30) {
  const [...strArray] = str || ''
  const hash = strArray.reduce((a, c) => {
    const h = c.charCodeAt(0) + ((a << 2) - a)
    return h % 360
  }, 0)

  return `hsl(${hash}, ${s}%, ${l}%)`
}
