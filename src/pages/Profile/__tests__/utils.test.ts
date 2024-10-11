import { getStreak } from '../utils'

describe('getStreak util', () => {
  it('should return 0 if no games', () => {
    expect(getStreak([])).toBe(0)
  })
})
