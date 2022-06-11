import { dateFilter } from 'src/utils/filters'

describe('# Date filters', () => {
  it('should format date correctly', () => {
    const dateString = '2019-01-01 00:00:00'
    const result = dateFilter(dateString)

    expect(result).to.equal('January 1')
  })
})
