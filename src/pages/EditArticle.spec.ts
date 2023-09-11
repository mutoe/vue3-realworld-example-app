import userEvent from '@testing-library/user-event'
import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { router } from 'src/router.ts'
import fixtures from 'src/utils/test/fixtures.ts'
import { renderOptions, setupMockServer } from 'src/utils/test/test.utils.ts'
import EditArticle from './EditArticle.vue'

describe('# EditArticle page', () => {
  const server = setupMockServer()

  it('should call create api when fill form and click submit button', async () => {
    server.use(['POST', '/api/articles', { article: { ...fixtures.article, slug: 'article-title' } }])
    vi.spyOn(router, 'push')
    const { getByRole, getByPlaceholderText } = render(EditArticle, await renderOptions({
      router,
      initialRoute: '/articles',
    }))

    await fireEvent.update(getByPlaceholderText('Article Title'), 'Article Title')
    await fireEvent.update(getByPlaceholderText("What's this article about?"), 'Article descriptions')
    await fireEvent.update(getByPlaceholderText('Write your article (in markdown)'), 'this is **article body**.')
    await userEvent.type(getByPlaceholderText('Enter tags'), 'tag1{Enter}tag2{Enter}')

    await fireEvent.click(getByRole('button', { name: 'Publish Article' }))

    const mockedRequest = await server.waitForRequest('POST', '/api/articles')

    expect(router.push).toHaveBeenCalledWith({ name: 'article', params: { slug: 'article-title' } })
    expect(await mockedRequest.json()).toMatchInlineSnapshot(`
      {
        "article": {
          "body": "this is **article body**.",
          "description": "Article descriptions",
          "tagList": [
            "tag1",
            "tag2",
          ],
          "title": "Article Title",
        },
      }
    `)
  })

  it('should call update api when click submit button and in editing', async () => {
    server.use(
      ['GET', '/api/articles/*', { article: fixtures.article }],
      ['PUT', '/api/articles/*', { article: fixtures.article }],
    )
    vi.spyOn(router, 'push')
    const { getByRole, getByPlaceholderText } = render(EditArticle, await renderOptions({
      router,
      initialRoute: { name: 'article', params: { slug: 'article-foo' } },
    }))
    await server.waitForRequest('GET', '/api/articles/*')

    await userEvent.type(getByPlaceholderText('Enter tags'), 'tag1{Enter}tag2{Enter}')

    await fireEvent.click(getByRole('button', { name: 'Publish Article' }))

    const mockedRequest = await server.waitForRequest('PUT', '/api/articles/article-foo')

    expect(router.push).toHaveBeenCalledWith({ name: 'article', params: { slug: 'article-foo' } })
    expect(await mockedRequest.json()).toMatchInlineSnapshot(`
      {
        "article": {
          "body": "# Article body

      This is **Strong** content.",
          "description": "Article description",
          "tagList": [
            "foo",
            "tag1",
            "tag2",
          ],
          "title": "Article foo",
        },
      }
    `)
  })

  it('should can remove tag when lick remove tag button', async () => {
    server.use(
      ['GET', '/api/articles/*', { article: fixtures.article }],
      ['PUT', '/api/articles/*', { article: fixtures.article }],
    )
    const { getByRole, getByPlaceholderText } = render(EditArticle, await renderOptions({
      router,
      initialRoute: { name: 'article', params: { slug: 'article-foo' } },
    }))
    await server.waitForRequest('GET', '/api/articles/*')

    await userEvent.type(getByPlaceholderText('Enter tags'), 'tag1{Enter}tag2{Enter}')
    await userEvent.click(getByRole('button', { name: 'Delete tag: tag1' }))

    await fireEvent.click(getByRole('button', { name: 'Publish Article' }))

    const mockedRequest = await server.waitForRequest('PUT', '/api/articles/article-foo')

    expect(await mockedRequest.json()).toMatchInlineSnapshot(`
      {
        "article": {
          "body": "# Article body

      This is **Strong** content.",
          "description": "Article description",
          "tagList": [
            "foo",
            "tag2",
          ],
          "title": "Article foo",
        },
      }
    `)
  })
})
