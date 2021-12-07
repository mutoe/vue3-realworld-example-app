import { jest } from '@jest/globals'
import { render, waitFor } from '@testing-library/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import asyncComponentWrapper from 'src/utils/test/async-component-wrapper'
import fixtures from 'src/utils/test/fixtures'

jest.unstable_mockModule('src/services/comment/getComments', () => ({
  getCommentsByArticle: jest.fn(),
}))
jest.unstable_mockModule('src/services/comment/postComment', () => ({
  deleteComment: jest.fn(),
  postComment: jest.fn(),
}))

const { getCommentsByArticle } = await import('src/services/comment/getComments')
const { deleteComment } = await import('src/services/comment/postComment')

const ArticleDetailComments = (await import('./ArticleDetailComments.vue')).default

describe('# ArticleDetailComments', () => {
  const mockGetCommentsByArticle = getCommentsByArticle as jest.MockedFunction<typeof getCommentsByArticle>
  const mockDeleteComment = deleteComment as jest.MockedFunction<typeof deleteComment>

  beforeEach(async () => {
    mockGetCommentsByArticle.mockResolvedValue([fixtures.comment])
    await router.push({
      name: 'article',
      params: { slug: fixtures.article.slug },
    })
  })

  it('should render correctly', async () => {
    const { container } = render(asyncComponentWrapper(ArticleDetailComments), {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(mockGetCommentsByArticle).toBeCalledWith('article-foo')
    expect(container).toBeInTheDocument()
  })

  it.skip('should display new comment when post new comment', async () => {
    // given
    const { container } = render(asyncComponentWrapper(ArticleDetailComments), {
      global: { plugins: [registerGlobalComponents, router] },
    })

    await waitFor(() => expect(mockGetCommentsByArticle).toBeCalled())
    expect(container.querySelectorAll('.card')).toHaveLength(1)

    // when
    // wrapper.findComponent(ArticleDetailCommentsForm).vm.$emit('add-comment', fixtures.comment2)
    // await nextTick()

    // then
    expect(container.querySelectorAll('.card')).toHaveLength(2)
  })

  it.skip('should call remove comment service when click delete button', async () => {
    // given
    render(asyncComponentWrapper(ArticleDetailComments), {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await waitFor(() => expect(mockGetCommentsByArticle).toBeCalled())

    // when
    // wrapper.findComponent(ArticleDetailComment).vm.$emit('remove-comment')

    // then
    expect(mockDeleteComment).toBeCalledWith('article-foo', 1)
  })
})
