import { render } from '@testing-library/vue'
import fixtures from 'src/utils/test/fixtures'
import { asyncWrapper, renderOptions, setupMockServer } from 'src/utils/test/test.utils'
import { describe, it, expect } from 'vitest'
import ArticlesList from './ArticlesList.vue'

describe('# ArticlesList', () => {
  const server = setupMockServer(
    ['GET', '/api/articles*', { articles: [fixtures.article], articlesCount: 1 }],
  )

  it('should render correctly', async () => {
    const { container } = render(asyncWrapper(ArticlesList), renderOptions())

    await server.waitForRequest('GET', '/api/articles*')

    expect(container).toHaveTextContent(fixtures.article.title)
    expect(container).toHaveTextContent('Article description')
    expect(container).toHaveTextContent(fixtures.article.author.username)
  })
})
