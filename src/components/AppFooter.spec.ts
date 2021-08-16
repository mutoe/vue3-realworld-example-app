import { mount } from '@cypress/vue'
import AppFooter from './AppFooter.vue'

describe('# AppFooter', () => {
  it('should render correctly', () => {
    mount(AppFooter)

    cy.contains('Real world app')
  })
})
