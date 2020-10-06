import { dateFilter } from 'src/utils/filters'

describe('# Date filters', function () {
  it('should format date correctly', function () {
    const dateString = '2019-01-01 00:00:00'
    const result = dateFilter(dateString)

    expect(result).toMatchInlineSnapshot('"January 1"')
  })
})
