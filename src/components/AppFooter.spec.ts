import AppFooter from 'src/components/AppFooter.vue'

describe('# AppFooter', () => {
  it('should render correctly', () => {
    cy.mount(AppFooter)

    cy.contains('Real world app')
  })
})
