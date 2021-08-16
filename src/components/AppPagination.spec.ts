import { mount } from '@cypress/vue'
import AppPagination from './AppPagination.vue'

describe('# AppPagination', () => {
  it('should highlight current active page', () => {
    mount(AppPagination, {
      props: { page: 1, count: 15 },
    })

    cy.get('.page-item')
      .should('have.length', 2)
      .its(0)
      .should('have.class', 'active')
  })

  it('should call onPageChange when click a page item', async () => {
    mount(AppPagination, {
      props: { page: 1, count: 15 },
    })

    cy.findByRole('link', { name: 'Go to page 2' }).click()

    const events = Cypress.vueWrapper.emitted()
    cy.wrap(events).should('have.property', 'page-change', [2])
  })
})
