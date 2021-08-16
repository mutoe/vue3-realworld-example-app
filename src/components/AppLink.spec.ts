import { mount } from '@cypress/vue'
import { router } from 'src/router'
import AppLink from './AppLink.vue'

describe('# AppLink', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  it('should redirect to another page when click the link', async () => {
    mount(AppLink, {
      global: { plugins: [router] },
      props: { name: 'tag', params: { tag: 'foo' } },
      slots: { default: 'Go to Foo tag' },
    })

    cy.contains('Go to Foo tag')

    cy.findByRole('link', { name: 'tag' })
      .click()
      .should('have.class', 'router-link-active')
  })
})
