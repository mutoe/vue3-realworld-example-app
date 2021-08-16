import { dateFilter } from 'src/utils/filters'

describe('# Date filters', function () {
  it('should format date correctly', function () {
    const dateString = '2019-01-01 00:00:00'
    const result = dateFilter(dateString)

    cy.wrap(result).should('equal', 'January 1')
  })
})
