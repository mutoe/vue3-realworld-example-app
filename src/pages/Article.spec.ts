import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import fixtures from 'src/utils/test/fixtures.ts'
import { renderOptions, setupMockServer } from 'src/utils/test/test.utils'
import Article from './Article.vue'

describe('# Article', () => {
  const server = setupMockServer(
    ['GET', '/api/articles/foo', { article: fixtures.article }],
    ['GET', '/api/articles/foo/comments', { comments: fixtures.articleComments }],
  )

  it('should render correctly', async () => {
    const { container } = render(Article, await renderOptions({
      initialRoute: { name: 'article', params: { slug: 'foo' } },
    }))

    expect(container).toHaveTextContent('Article is downloading')
    expect(container).toHaveTextContent('Comments are downloading')

    await server.waitForRequest('GET', '/api/articles/foo')

    expect(container).toHaveTextContent(fixtures.article.title)
    expect(container).toHaveTextContent('Article body')
    expect(container).toHaveTextContent(fixtures.article.author.username)
    expect(container).toHaveTextContent(fixtures.articleComments[0].body)
    expect(container).toHaveTextContent(fixtures.articleComments[0].author.username)
    expect(container).toHaveTextContent(fixtures.articleComments[1].body)
    expect(container).toHaveTextContent(fixtures.articleComments[1].author.username)
  })
})
