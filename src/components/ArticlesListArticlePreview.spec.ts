import { jest } from '@jest/globals'
import { fireEvent, render } from '@testing-library/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import fixtures from 'src/utils/test/fixtures'

const mockFavoriteArticle = jest.fn()
jest.unstable_mockModule('src/composable/useFavoriteArticle', () => ({
  useFavoriteArticle: () => ({
    favoriteProcessGoing: false,
    favoriteArticle: mockFavoriteArticle,
  }),
}))

const { default: ArticlesListArticlePreview } = await import('src/components/ArticlesListArticlePreview.vue')
const { router } = await import('src/router')

describe('# ArticlesListArticlePreview', () => {
  const favoriteButton = 'Favorite article'

  beforeEach(async () => {
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
  })

  it('should call favorite method when click favorite button', async () => {
    const { getByRole } = render(ArticlesListArticlePreview, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { article: fixtures.article },
    })

    await fireEvent.click(getByRole('button', { name: favoriteButton }))

    expect(mockFavoriteArticle).toBeCalledTimes(1)
  })
})
