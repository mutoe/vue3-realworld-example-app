import { mount } from '@cypress/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetail from './ArticleDetail.vue'

describe.skip('# ArticleDetail', () => {
  beforeEach(async () => {
    await router.push({
      name: 'article',
      params: { slug: fixtures.article.slug },
    })
  })

  it('should render markdown body correctly', async () => {
    cy.intercept('/articles/:slug', { ...fixtures.article, body: fixtures.markdown })
    mount(ArticleDetail, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    cy.get('.article-content').should('have.html', '')
  })

  it('should render markdown (zh-CN) body correctly', async () => {
    mount(ArticleDetail, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    cy.get('.article-content').should('have.html', '')
  })

  it('should filter the xss content in Markdown body', async () => {
    mount(ArticleDetail, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    cy.get('.article-content').should('have.html', '')
  })
})
