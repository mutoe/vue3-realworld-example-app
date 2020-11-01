import { ComputedRef, ref, watch } from 'vue'
import type { AppRouteNames } from '../router'

import createAsyncProcess from '../utils/create-async-process'

import {
  getArticles,
  getFavoritedArticles,
  getProfileArticles,
  getFeeds,
  getArticlesByTag,
} from '../services/article/getArticles'

interface UseArticlesProps {
  routeName: ComputedRef<AppRouteNames>
  username?: ComputedRef<string | undefined>
  tag?: ComputedRef<string | undefined>
}

export function useArticles ({ routeName, username, tag }: UseArticlesProps) {
  const articles = ref<Article[]>([])
  const articlesCount = ref(0)
  const page = ref(1)

  async function fetchArticles () {
    articles.value = []
    let responsePromise: null | Promise<any> = null

    if (routeName.value === 'my-feed') {
      responsePromise = getFeeds(page.value)
    }
    if (routeName.value === 'tag' && tag?.value !== undefined) {
      responsePromise = getArticlesByTag(tag.value, page.value)
    }
    if (routeName.value === 'profile' && username?.value !== undefined) {
      responsePromise = getProfileArticles(username.value, page.value)
    }
    if (routeName.value === 'profile-favorites' && username?.value !== undefined) {
      responsePromise = getFavoritedArticles(username.value, page.value)
    }
    if (routeName.value === 'global-feed') {
      responsePromise = getArticles(page.value)
    }

    if (responsePromise !== null) {
      const response = await responsePromise
      articles.value = response.articles
      articlesCount.value = response.articlesCount
    }
  }

  const changePage = (value: number) => {
    page.value = value
  }

  const updateArticle = (index: number, article: Article) => {
    articles.value[index] = article
  }

  const { active, run } = createAsyncProcess(fetchArticles)

  watch(routeName, () => {
    if (page.value !== 1) changePage(1)
    else run()
  })

  watch(page, run)

  return {
    fetchArticles: run,
    articlesDownloading: active,
    articles,
    articlesCount,
    page,
    changePage,
    updateArticle,
  }
}
