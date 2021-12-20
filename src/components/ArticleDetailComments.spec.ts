import { waitFor } from '@testing-library/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { getCommentsByArticle } from 'src/services/comment/getComments'
import { deleteComment } from 'src/services/comment/postComment'
import fixtures from 'src/utils/test/fixtures'
import { renderAsync } from '../utils/test/render-async'
import ArticleDetailComments from './ArticleDetailComments.vue'

jest.mock('src/services/comment/getComments')
jest.mock('src/services/comment/postComment')

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
    const { container } = await renderAsync(ArticleDetailComments, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(mockGetCommentsByArticle).toBeCalledWith('article-foo')
    expect(container).toBeInTheDocument()
  })

  it.skip('should display new comment when post new comment', async () => {
    // given
    const { container } = await renderAsync(ArticleDetailComments, {
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
    await renderAsync(ArticleDetailComments, {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await waitFor(() => expect(mockGetCommentsByArticle).toBeCalled())

    // when
    // wrapper.findComponent(ArticleDetailComment).vm.$emit('remove-comment')

    // then
    expect(mockDeleteComment).toBeCalledWith('article-foo', 1)
  })
})
