import PopularTags from 'src/components/PopularTags.vue'
import { asyncWrapper } from 'src/utils/test/test.utils'

describe('# PopularTags', () => {
  const AsyncPopularTags = asyncWrapper(PopularTags)

  beforeEach(() => {
    cy.intercept('GET', '/api/tags', { tags: ['foo', 'bar'] }).as('getTags')
  })

  it('should render correctly', () => {
    cy.mount(AsyncPopularTags)

    cy.get('.tag-pill')
      .should('have.length', 2)
      .contains('foo')
  })
})
