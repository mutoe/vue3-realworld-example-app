import { mount } from '@vue/test-utils'
import { GlobalMountOptions } from '@vue/test-utils/dist/types'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { deleteArticle } from 'src/services/article/deleteArticle'
import { deleteFavoriteArticle, postFavoriteArticle } from 'src/services/article/favoriteArticle'
import { deleteFollowProfile, postFollowProfile } from 'src/services/profile/followProfile'
import { updateUser, user } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetailMeta from './ArticleDetailMeta.vue'

jest.mock('src/services/article/deleteArticle')
jest.mock('src/services/profile/followProfile')
jest.mock('src/services/article/favoriteArticle')

const globalMountOptions: GlobalMountOptions = {
  plugins: [registerGlobalComponents, router],
  mocks: { $store: user },
}

describe('# ArticleDetailMeta', () => {
  const editButton = '[aria-label="Edit article"]'
  const deleteButton = '[aria-label="Delete article"]'
  const followButton = '[aria-label="Follow"]'
  const unfollowButton = '[aria-label="Unfollow"]'
  const favoriteButton = '[aria-label="Favorite article"]'
  const unfavoriteButton = '[aria-label="Unfavorite article"]'

  const mockDeleteArticle = deleteArticle as jest.MockedFunction<typeof deleteArticle>
  const mockFollowUser = postFollowProfile as jest.MockedFunction<typeof postFollowProfile>
  const mockUnfollowUser = deleteFollowProfile as jest.MockedFunction<typeof deleteFollowProfile>
  const mockFavoriteArticle = postFavoriteArticle as jest.MockedFunction<typeof postFavoriteArticle>
  const mockUnfavoriteArticle = deleteFavoriteArticle as jest.MockedFunction<typeof deleteFavoriteArticle>

  beforeEach(async () => {
    mockFollowUser.mockResolvedValue({ isOk: () => true } as any)
    mockUnfollowUser.mockResolvedValue({ isOk: () => true } as any)
    mockFavoriteArticle.mockResolvedValue({ isOk: () => true, value: fixtures.article } as any)
    mockUnfavoriteArticle.mockResolvedValue({ isOk: () => true, value: fixtures.article } as any)
    updateUser(fixtures.user)
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
  })

  it('should display edit button when user is author', () => {
    const wrapper = mount(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    expect(wrapper.find(editButton).exists()).toBe(true)
    expect(wrapper.find(followButton).exists()).toBe(false)
  })

  it('should display follow button when user not author', () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const wrapper = mount(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    expect(wrapper.find(editButton).exists()).toBe(false)
    expect(wrapper.find(followButton).exists()).toBe(true)
  })

  it('should not display follow button and edit button when user not logged', () => {
    updateUser(null)
    const wrapper = mount(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    expect(wrapper.find(editButton).exists()).toBe(false)
    expect(wrapper.find(followButton).exists()).toBe(false)
  })

  it('should call delete article service when click delete button', async () => {
    const wrapper = mount(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    await wrapper.find(deleteButton).trigger('click')

    expect(mockDeleteArticle).toBeCalledWith('article-foo')
  })

  it('should call follow service when click follow button', async () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const wrapper = mount(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    await wrapper.find(followButton).trigger('click')

    expect(mockFollowUser).toBeCalledWith('Author name')
  })

  it('should call unfollow service when click follow button and not followed author', async () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const wrapper = mount(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: { ...fixtures.article, author: { ...fixtures.article.author, following: true } } },
    })

    await wrapper.find(unfollowButton).trigger('click')

    expect(mockUnfollowUser).toBeCalledWith('Author name')
  })

  it('should call favorite article service when click favorite button', async () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const wrapper = mount(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: { ...fixtures.article, favorited: false } },
    })

    await wrapper.find(favoriteButton).trigger('click')

    expect(mockFavoriteArticle).toBeCalledWith('article-foo')
  })

  it('should call favorite article service when click unfavorite button', async () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const wrapper = mount(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: { ...fixtures.article, favorited: true } },
    })

    await wrapper.find(unfavoriteButton).trigger('click')

    expect(mockUnfavoriteArticle).toBeCalledWith('article-foo')
  })
})
