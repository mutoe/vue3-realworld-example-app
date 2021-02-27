import { flushPromises, mount } from '@vue/test-utils'
import ArticleDetailComment from 'src/components/ArticleDetailComment.vue'
import ArticleDetailCommentsForm from 'src/components/ArticleDetailCommentsForm.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { getCommentsByArticle } from 'src/services/comment/getComments'
import { deleteComment } from 'src/services/comment/postComment'
import asyncComponentWrapper from 'src/utils/test/async-component-wrapper'
import fixtures from 'src/utils/test/fixtures'
import { nextTick } from 'vue'
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
    const wrapper = mount(asyncComponentWrapper(ArticleDetailComments), {
      global: { plugins: [registerGlobalComponents, router] },
    })

    expect(mockGetCommentsByArticle).toBeCalledWith('article-foo')
    expect(wrapper).toBeTruthy()
  })

  it('should display new comment when post new comment', async () => {
    // given
    const wrapper = mount(asyncComponentWrapper(ArticleDetailComments), {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await flushPromises()
    expect(wrapper.findAll('.card')).toHaveLength(1)

    // when
    wrapper.findComponent(ArticleDetailCommentsForm).vm.$emit('add-comment', fixtures.comment2)
    await nextTick()

    // then
    expect(wrapper.findAll('.card')).toHaveLength(2)
  })

  it('should call remove comment service when click delete button', async () => {
    // given
    const wrapper = mount(asyncComponentWrapper(ArticleDetailComments), {
      global: { plugins: [registerGlobalComponents, router] },
    })
    await flushPromises()

    // when
    wrapper.findComponent(ArticleDetailComment).vm.$emit('remove-comment')

    // then
    expect(mockDeleteComment).toBeCalledWith('article-foo', 1)
  })
})
