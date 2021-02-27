import { DOMWrapper, flushPromises, shallowMount } from '@vue/test-utils'
import ArticleDetailCommentsForm from 'src/components/ArticleDetailCommentsForm.vue'
import { useProfile } from 'src/composable/useProfile'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { postComment } from 'src/services/comment/postComment'
import fixtures from 'src/utils/test/fixtures'
import { ref } from 'vue'

jest.mock('src/composable/useProfile')
jest.mock('src/services/comment/postComment')

describe('# ArticleDetailCommentsForm', () => {
  const mockUseProfile = useProfile as jest.MockedFunction<typeof useProfile>
  const mockPostComment = postComment as jest.MockedFunction<typeof postComment>

  beforeEach(() => {
    mockPostComment.mockResolvedValue(fixtures.comment2)
    mockUseProfile.mockReturnValue({
      profile: ref(fixtures.author),
      updateProfile: jest.fn(),
    })
  })

  it('should display sign in button when user not logged', () => {
    mockUseProfile.mockReturnValue({ profile: ref(null), updateProfile: jest.fn() })
    const wrapper = shallowMount(ArticleDetailCommentsForm, {
      global: { plugins: [registerGlobalComponents] },
      props: { articleSlug: fixtures.article.slug },
    })

    expect(wrapper.text()).toContain('add comments on this article')
  })

  it('should display form when user logged', async () => {
    // given
    const wrapper = shallowMount(ArticleDetailCommentsForm, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { articleSlug: fixtures.article.slug },
    })

    // when
    const inputElement = wrapper.find('textarea[aria-label="Write comment"]') as DOMWrapper<HTMLTextAreaElement>
    inputElement.element.value = 'some texts...'
    await inputElement.trigger('input')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    // then
    expect(mockPostComment).toBeCalledWith('article-foo', 'some texts...')

    const events = wrapper.emitted('add-comment')
    expect(events).toHaveLength(1)
    expect(events![0]).toEqual([fixtures.comment2])
  })
})
