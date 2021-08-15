import { fireEvent, render } from '@testing-library/vue'
import ArticleDetailCommentsForm from 'src/components/ArticleDetailCommentsForm.vue'
import { useProfile } from 'src/composable/useProfile'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { postComment } from 'src/services/comment/postComment'
import fixtures from 'src/utils/test/fixtures'

jest.mock('src/composable/useProfile')
jest.mock('src/services/comment/postComment')

describe('# ArticleDetailCommentsForm', () => {
  const mockUseProfile = useProfile as jest.MockedFunction<typeof useProfile>
  const mockPostComment = postComment as jest.MockedFunction<typeof postComment>

  beforeEach(async () => {
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
    mockPostComment.mockResolvedValue(fixtures.comment2)
    mockUseProfile.mockReturnValue({
      profile: fixtures.author,
      updateProfile: jest.fn(),
    })
  })

  it('should display sign in button when user not logged', () => {
    mockUseProfile.mockReturnValue({ profile: null, updateProfile: jest.fn() })
    const { container } = render(ArticleDetailCommentsForm, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { articleSlug: fixtures.article.slug },
    })

    expect(container.textContent).toContain('add comments on this article')
  })

  it.skip('should display form when user logged', async () => {
    // given
    const { getByRole } = render(ArticleDetailCommentsForm, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { articleSlug: fixtures.article.slug },
    })

    // when
    const inputElement = getByRole('textbox', { name: 'Write comment' })
    await fireEvent.update(inputElement, 'some texts...')
    await fireEvent.click(getByRole('button', { name: 'Submit' }))

    // then
    expect(mockPostComment).toBeCalledWith('article-foo', 'some texts...')

    // TODO: test emit event
    // const events = emitted()
    // expect(events).toHaveLength(1)
    // expect(events![0]).toEqual([fixtures.comment2])
  })
})
