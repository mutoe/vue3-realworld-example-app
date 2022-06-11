import { createPinia, setActivePinia } from 'pinia'
import { createTestRouter } from 'src/utils/test/test.utils'
import Article from './Article.vue'

describe('# Article', () => {
  const router = createTestRouter()

  beforeEach(() => {
    setActivePinia(createPinia())
    cy.wrap(router.push({ name: 'article', params: { slug: 'foo' } }))
    cy.intercept('GET', '/api/articles/foo', { fixture: 'article.json' }).as('getArticle')
    cy.intercept('GET', '/api/articles/foo/comments', { fixture: 'article-comments.json' }).as('getComments')
  })

  it('should render correctly', () => {
    cy.mount(Article, { router })

    cy.contains('Article is downloading')
    cy.contains('Comments are downloading')

    cy.wait('@getArticle')

    cy.contains('Article title')
    cy.contains('Before starting a new implementation')
  })
})
