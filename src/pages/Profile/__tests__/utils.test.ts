import { getStreak } from '../utils'

function getDate(dayOffset = 0, hours?: number) {
  const date = new Date()
  date.setDate(date.getDate() - dayOffset)
  if (hours !== undefined) {
    date.setHours(hours)
  }

  return date.getTime()
}

describe('getStreak util', () => {
  it('should return 0 if no games', () => {
    expect(getStreak([])).toBe(0)
  })

  it('should return 0 if first game is a day before yesterday', () => {
    expect(getStreak([{ date: getDate(2) }])).toBe(0)
  })

  it('should return 0 if first game is today', () => {
    expect(getStreak([{ date: getDate() }])).toBe(1)
  })

  it('should return 0 if first game is yesterday', () => {
    expect(getStreak([{ date: getDate(1) }])).toBe(1)
  })

  it('should return 2 for games between yesterday and today', () => {
    expect(getStreak([{ date: getDate(0) }, { date: getDate(1) }])).toBe(2)
  })

  it('should return 2 for games between yesterday and today and one more', () => {
    expect(getStreak([{ date: getDate(0) }, { date: getDate(1) }, { date: getDate(3) }])).toBe(2)
  })

  it('should return 2 for several games between yesterday and today', () => {
    expect(getStreak([{ date: getDate(0) }, { date: getDate(0) }, { date: getDate(1) }, { date: getDate(1) }])).toBe(2)
  })

  it('should return 2 for games between a day before yesterday and yesterday', () => {
    expect(getStreak([{ date: getDate(1) }, { date: getDate(2) }])).toBe(2)
  })

  it('should return 2 for games between a day before yesterday and yesterday and one more', () => {
    expect(getStreak([{ date: getDate(1) }, { date: getDate(2) }, { date: getDate(4) }])).toBe(2)
  })

  it('should return 2 for several games between a day before yesterday and yesterday', () => {
    expect(getStreak([{ date: getDate(1) }, { date: getDate(1) }, { date: getDate(2) }, { date: getDate(2) }])).toBe(2)
  })

  it('should return 0 for games before yesterday', () => {
    expect(getStreak([{ date: getDate(2) }, { date: getDate(3) }])).toBe(0)
  })

  it('should return 2 for games between yesterday morning and today', () => {
    expect(getStreak([{ date: getDate(0) }, { date: getDate(1, 0) }])).toBe(2)
  })

  it('should return 2 for games between yesterday noon and today', () => {
    expect(getStreak([{ date: getDate(0) }, { date: getDate(1, 23) }])).toBe(2)
  })

  it('should return 2 for several games between yesterday morning and today', () => {
    expect(
      getStreak([
        { date: getDate(0, 23) },
        { date: getDate(0) },
        { date: getDate(0, 0) },
        { date: getDate(1, 23) },
        { date: getDate(1) },
        { date: getDate(1, 0) },
      ]),
    ).toBe(2)
  })

  it('should return 3 for wrong sorting', () => {
    expect(getStreak([{ date: getDate(1) }, { date: getDate(0) }, { date: getDate(2) }])).toBe(3)
  })
})
