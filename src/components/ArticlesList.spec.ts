import { createPinia, setActivePinia } from 'pinia'
import ArticlesList from 'src/components/ArticlesList.vue'
import fixtures from 'src/utils/test/fixtures'
import { asyncWrapper } from 'src/utils/test/test.utils'

describe('# ArticlesList', () => {
  const AsyncArticlesList = asyncWrapper(ArticlesList)
  setActivePinia(createPinia())

  beforeEach(() => {
    cy.intercept('GET', '/api/articles*', { articles: [fixtures.article], articlesCount: 1 }).as('getArticles')
  })

  it('should render correctly', () => {
    cy.mount(AsyncArticlesList)

    cy.wait('@getArticles')

    cy.contains(fixtures.article.title)
    cy.contains('Article description')
    cy.contains(fixtures.article.author.username)
  })
})
