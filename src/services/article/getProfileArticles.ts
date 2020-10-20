import { ref, watchEffect } from 'vue'
import { limit, request } from '../index'

export async function getProfileArticles (username: string, page = 1) {
  const params = { limit, offset: (page - 1) * limit, author: username }
  return request.get<ArticlesResponse>('/articles', { params })
}

export const useProfileArticles = (username: string) => {
  const articles = ref<Article[]>([])
  const articlesCount = ref(0)
  const page = ref(1)

  watchEffect(async () => {
    const response = await getProfileArticles(username, page.value)
    articles.value = response.articles
    articlesCount.value = response.articlesCount
  })

  return { articles, articlesCount, page }
}
