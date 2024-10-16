export function getInitials(name: string) {
  const words = name.split(' ').filter(Boolean)
  let response = ''

  if (words.length >= 2) {
    const firstLetter = words[0][0]
    const lastLetter = words[words.length - 1][0]
    response = firstLetter + lastLetter
  }

  if (words.length === 1) {
    response = words[0].substring(0, 2).toUpperCase()
  }

  return response.toUpperCase()
}
