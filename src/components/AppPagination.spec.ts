import { mount } from 'cypress/vue'
import AppPagination from './AppPagination.vue'

describe('# AppPagination', () => {
  it('should highlight current active page', () => {
    cy.mount(AppPagination, {
      props: { page: 1, count: 15 },
    })

    cy.get('.page-item').should('have.length', 2)
      .eq(0).should('have.class', 'active')
  })

  it('should call onPageChange when click a page item', () => {
    const onPageChange = cy.spy().as('onPageChange')
    mount(AppPagination, {
      props: { page: 1, count: 15, onPageChange },
    })

    cy.findByRole('link', { name: 'Go to page 2' })
      .click()

    cy.get('@onPageChange').should('have.been.calledWith', 2)
  })
})
