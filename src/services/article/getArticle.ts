import { ref, watchEffect } from 'vue'
import { limit, request } from '../index'

export async function getArticle(slug: string) {
  return request.get<ArticleResponse>(`/articles/${slug}`).then(res => res.article)
}

export async function getArticles(page = 1) {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}

export function useArticles() {
  const articles = ref<Article[]>([])
  const articlesCount = ref(0)
  const page = ref(1)

  async function fetchArticles() {
    articles.value = []
    articlesCount.value = 0

    const response = await getArticles(page.value)
    articles.value = response.articles
    articlesCount.value = response.articlesCount
  }

  watchEffect(() => {
    fetchArticles()
  })

  return {
    articles,
    articlesCount,
    page
  }
}
