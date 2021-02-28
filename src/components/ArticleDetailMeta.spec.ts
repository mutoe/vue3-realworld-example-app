import { fireEvent, render } from '@testing-library/vue'
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
  const editButton = 'Edit article'
  const deleteButton = 'Delete article'
  const followButton = 'Follow'
  const unfollowButton = 'Unfollow'
  const favoriteButton = 'Favorite article'
  const unfavoriteButton = 'Unfavorite article'

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
    const { queryByRole } = render(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    expect(queryByRole('link', { name: editButton })).toBeInTheDocument()
    expect(queryByRole('button', { name: followButton })).not.toBeInTheDocument()
  })

  it('should display follow button when user not author', () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const { queryByRole } = render(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    expect(queryByRole('link', { name: editButton })).not.toBeInTheDocument()
    expect(queryByRole('button', { name: followButton })).toBeInTheDocument()
  })

  it('should not display follow button and edit button when user not logged', () => {
    updateUser(null)
    const { queryByRole } = render(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    expect(queryByRole('button', { name: editButton })).not.toBeInTheDocument()
    expect(queryByRole('button', { name: followButton })).not.toBeInTheDocument()
  })

  it('should call delete article service when click delete button', async () => {
    const { getByRole } = render(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    await fireEvent.click(getByRole('button', { name: deleteButton }))

    expect(mockDeleteArticle).toBeCalledWith('article-foo')
  })

  it('should call follow service when click follow button', async () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const { getByRole } = render(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: fixtures.article },
    })

    await fireEvent.click(getByRole('button', { name: followButton }))

    expect(mockFollowUser).toBeCalledWith('Author name')
  })

  it('should call unfollow service when click follow button and not followed author', async () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const { getByRole } = render(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: { ...fixtures.article, author: { ...fixtures.article.author, following: true } } },
    })

    await fireEvent.click(getByRole('button', { name: unfollowButton }))

    expect(mockUnfollowUser).toBeCalledWith('Author name')
  })

  it('should call favorite article service when click favorite button', async () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const { getByRole } = render(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: { ...fixtures.article, favorited: false } },
    })

    await fireEvent.click(getByRole('button', { name: favoriteButton }))

    expect(mockFavoriteArticle).toBeCalledWith('article-foo')
  })

  it('should call favorite article service when click unfavorite button', async () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    const { getByRole } = render(ArticleDetailMeta, {
      global: globalMountOptions,
      props: { article: { ...fixtures.article, favorited: true } },
    })

    await fireEvent.click(getByRole('button', { name: unfavoriteButton }))

    expect(mockUnfavoriteArticle).toBeCalledWith('article-foo')
  })
})
