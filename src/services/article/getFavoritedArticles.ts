import { ref, watchEffect } from 'vue'
import { limit, request } from '../index'

export async function getFavoritedArticles (username: string, page = 1) {
  const params = { limit, offset: (page - 1) * limit, favorited: username }
  return request.get<ArticlesResponse>('/articles', { params })
}

export const useFavoritedArticles = (username: string) => {
  const articles = ref<Article[]>([])
  const articlesCount = ref(0)
  const page = ref(1)

  watchEffect(async () => {
    const response = await getFavoritedArticles(username, page.value)
    articles.value = response.articles
    articlesCount.value = response.articlesCount
  })

  return { articles, articlesCount, page }
}
