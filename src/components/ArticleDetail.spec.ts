import { createPinia, setActivePinia } from 'pinia'
import fixtures from 'src/utils/test/fixtures'
import { asyncWrapper, createTestRouter } from 'src/utils/test/test.utils'
import ArticleDetail from './ArticleDetail.vue'

describe('# ArticleDetail', () => {
  const router = createTestRouter()
  const AsyncArticleDetail = asyncWrapper(ArticleDetail)

  beforeEach(() => {
    setActivePinia(createPinia())
    cy.wrap(router.push({ name: 'article', params: { slug: fixtures.article.slug } }))
  })

  it('should render markdown body correctly', () => {
    cy.fixture('article.json').then((res) => {
      res.article.body = fixtures.markdown
      cy.intercept('/api/articles/*', res).as('getArticle')
    })

    cy.mount(AsyncArticleDetail, { router })
    cy.wait('@getArticle')

    cy.get('.article-content').should('contain.text', 'h1 Heading 8-)')
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
