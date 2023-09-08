import { dateFilter } from 'src/utils/filters'
import { expect, describe, it } from 'vitest'

describe('# Date filters', () => {
  it('should format date correctly', () => {
    const dateString = '2019-01-01 00:00:00'
    const result = dateFilter(dateString)

    expect(result).toBe('January 1')
  })
})
