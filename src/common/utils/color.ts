export function stringToColor(str?: string | null, baseColor = '#000000') {
  str = str || ''
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  }

  // Normalize brightness and then check color contrast and adjust if necessary
  color = normalizeBrightness(color)
  color = adjustColorContrast(color, baseColor)

  return color
}

function normalizeBrightness(color: string) {
  // Decompose the color into RGB components
  let r = parseInt(color.slice(1, 3), 16)
  let g = parseInt(color.slice(3, 5), 16)
  let b = parseInt(color.slice(5, 7), 16)

  // Calculate lightness
  const lightness = 0.299 * r + 0.587 * g + 0.114 * b

  // Adjust if too bright
  if (lightness > 200) {
    r = Math.max(0, r - 10)
    g = Math.max(0, g - 10)
    b = Math.max(0, b - 10)
  }
  // Adjust if too dark
  else if (lightness < 100) {
    r = Math.min(255, r + 10)
    g = Math.min(255, g + 10)
    b = Math.min(255, b + 10)
  }

  // Combine back into a single color code
  return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0')
}

function adjustColorContrast(color: string, baseColor: string) {
  let contrast = getContrastRatio(color, baseColor)

  while (contrast < 2) {
    // Decompose the color into RGB components.
    let r = parseInt(color.slice(1, 3), 16)
    let g = parseInt(color.slice(3, 5), 16)
    let b = parseInt(color.slice(5, 7), 16)

    // Increase each RGB component by a step to lighten the color if it's dark.
    r = Math.min(255, r + 10)
    g = Math.min(255, g + 10)
    b = Math.min(255, b + 10)

    // Combine back into a single color code
    color = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0')

    // Check contrast again
    contrast = getContrastRatio(color, baseColor)
  }

  return color
}

function getContrastRatio(color1: string, color2: string) {
  const L1 = getRelativeLuminance(color1)
  const L2 = getRelativeLuminance(color2)

  if (L1 > L2) {
    return (L1 + 0.05) / (L2 + 0.05)
  } else {
    return (L2 + 0.05) / (L1 + 0.05)
  }
}

function getRelativeLuminance(color: string) {
  let r = parseInt(color.slice(1, 3), 16) / 255
  let g = parseInt(color.slice(3, 5), 16) / 255
  let b = parseInt(color.slice(5, 7), 16) / 255

  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
