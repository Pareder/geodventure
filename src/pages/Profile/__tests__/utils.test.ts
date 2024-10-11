import { getStreak } from '../utils'

function getDate(dayOffset = 0, hours?: number) {
  const date = new Date()
  date.setDate(date.getDate() - dayOffset)
  if (hours !== undefined) {
    date.setHours(hours)
  }

  return date
}

describe('getStreak util', () => {
  it('should return 0 if no games', () => {
    expect(getStreak([])).toBe(0)
  })

  it('should return 0 if first game is a day before yesterday', () => {
    expect(getStreak([{ date: getDate(2).getTime() }])).toBe(0)
  })

  it('should return 0 if first game is today', () => {
    expect(getStreak([{ date: getDate().getTime() }])).toBe(1)
  })

  it('should return 0 if first game is yesterday', () => {
    expect(getStreak([{ date: getDate(1).getTime() }])).toBe(1)
  })

  it('should return 2 for games between yesterday and today', () => {
    expect(getStreak([{ date: getDate(0).getTime() }, { date: getDate(1).getTime() }])).toBe(2)
  })

  it('should return 2 for games between yesterday and today and one more', () => {
    expect(
      getStreak([{ date: getDate(0).getTime() }, { date: getDate(1).getTime() }, { date: getDate(3).getTime() }]),
    ).toBe(2)
  })

  it('should return 2 for several games between yesterday and today', () => {
    expect(
      getStreak([
        { date: getDate(0).getTime() },
        { date: getDate(0).getTime() },
        { date: getDate(1).getTime() },
        { date: getDate(1).getTime() },
      ]),
    ).toBe(2)
  })

  it('should return 2 for games between a day before yesterday and yesterday', () => {
    expect(getStreak([{ date: getDate(1).getTime() }, { date: getDate(2).getTime() }])).toBe(2)
  })

  it('should return 2 for games between a day before yesterday and yesterday and one more', () => {
    expect(
      getStreak([{ date: getDate(1).getTime() }, { date: getDate(2).getTime() }, { date: getDate(4).getTime() }]),
    ).toBe(2)
  })

  it('should return 2 for several games between a day before yesterday and yesterday', () => {
    expect(
      getStreak([
        { date: getDate(1).getTime() },
        { date: getDate(1).getTime() },
        { date: getDate(2).getTime() },
        { date: getDate(2).getTime() },
      ]),
    ).toBe(2)
  })

  it('should return 0 for games before yesterday', () => {
    expect(getStreak([{ date: getDate(2).getTime() }, { date: getDate(3).getTime() }])).toBe(0)
  })

  it('should return 2 for games between yesterday morning and today', () => {
    expect(getStreak([{ date: getDate(0).getTime() }, { date: getDate(1, 0).getTime() }])).toBe(2)
  })

  it('should return 2 for games between yesterday noon and today', () => {
    expect(getStreak([{ date: getDate(0).getTime() }, { date: getDate(1, 23).getTime() }])).toBe(2)
  })

  it('should return 2 for several games between yesterday morning and today', () => {
    expect(
      getStreak([
        { date: getDate(0, 23).getTime() },
        { date: getDate(0).getTime() },
        { date: getDate(0, 0).getTime() },
        { date: getDate(1, 23).getTime() },
        { date: getDate(1).getTime() },
        { date: getDate(1, 0).getTime() },
      ]),
    ).toBe(2)
  })
})
