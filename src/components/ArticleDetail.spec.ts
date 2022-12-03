import { createTestingPinia } from '@pinia/testing'
import { render, waitFor } from '@testing-library/vue'
import { flushPromises } from '@vue/test-utils'
import fixtures from 'src/utils/test/fixtures'
import { asyncWrapper, createTestRouter, mockFetch } from 'src/utils/test/test.utils'
import { nextTick } from 'vue'
import articleFixture from '../../cypress/fixtures/article.json'
import ArticleDetail from './ArticleDetail.vue'

describe('# ArticleDetail', () => {
  const { router, routerPlugin } = createTestRouter()
  const AsyncArticleDetail = asyncWrapper(ArticleDetail)

  beforeEach(async () => {
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
  })

  it('should render markdown body correctly', async () => {
    mockFetch.mockResponse(JSON.stringify(articleFixture), { status: 200 })
    const { html, container } = render(AsyncArticleDetail, {
      global: {
        plugins: [routerPlugin, createTestingPinia()],
        stubs: { AppLink: true },
      },
    })
    await waitFor(() => expect(mockFetch).toBeCalled())
    expect(mockFetch.mock.calls[0][0]).toContain('article-foo')

    await flushPromises()
    await nextTick()

    expect(html()).toContain('Article body')
    expect(container.querySelector('h1')).toContain('Strong')
  })

  // TODO: the markdown content should do the unit test for the markdown renderer
  it.skip('should render markdown (zh-CN) body correctly', () => {
    cy.fixture('article.json').then((body) => {
      body.article.body = fixtures.markdownCN
      cy.intercept('/api/articles/*', body).as('getArticle')
    })

    cy.mount(AsyncArticleDetail, { router })
    cy.wait('@getArticle')

    cy.get('.article-content').should('have.text', fixtures.markdownCN)
  })

  it.skip('should filter the xss content in Markdown body', () => {
    cy.fixture('article.json').then((body) => {
      body.article.body = fixtures.markdownXss
      cy.intercept('/api/articles/*', body).as('getArticle')
    })

    cy.mount(AsyncArticleDetail, { router })
    cy.wait('@getArticle')

    cy.get('.article-content').should('have.text', fixtures.markdownXss)
  })
})
