import { mount } from '@cypress/vue'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import ArticlesList from 'src/components/ArticlesList.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'

describe('# ArticlesList', () => {
  const globalMountOptions: GlobalMountOptions = {
    plugins: [registerGlobalComponents, router],
  }

  beforeEach(async () => {
    await router.push('/')
  })

  it('should render correctly', async () => {
    cy.intercept('GET', '/api/articles?*', { body: { articles: [fixtures.article], articlesCount: 1 } })
      .as('mockRequest')

    mount(ArticlesList, {
      global: globalMountOptions,
    })

    cy.wait('@mockRequest')
    cy.contains('Article foo')
  })
})
