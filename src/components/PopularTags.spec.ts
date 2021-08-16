import { mount } from '@cypress/vue'
import PopularTags from 'src/components/PopularTags.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'

describe('# PopularTags', () => {
  it('should render correctly', async () => {
    cy.intercept('GET', '/api/tags', { body: { tags: ['foo', 'bar'] } })

    mount(PopularTags, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    cy.get('.tag-pill')
      .should('have.length', 2)
  })
})
