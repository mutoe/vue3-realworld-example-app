import { ref, watch } from 'vue'

import createAsyncProcess from '../utils/create-async-process'

import {
  getArticles,
  getFavoritedArticles,
  getProfileArticles,
  getFeeds,
  getArticlesByTag,
} from '../services/article/getArticles'

import { useArticlesMeta } from './useArticlesMeta'

export function useArticles () {
  const { articlesType, tag, username, metaChanged } = useArticlesMeta()

  const articles = ref<Article[]>([])
  const articlesCount = ref(0)
  const page = ref(1)

  async function fetchArticles () {
    articles.value = []
    let responsePromise: null | Promise<ArticlesResponse> = null

    if (articlesType.value === 'my-feed') {
      responsePromise = getFeeds(page.value)
    }
    if (articlesType.value === 'tag-feed' && tag.value !== undefined) {
      responsePromise = getArticlesByTag(tag.value, page.value)
    }
    if (articlesType.value === 'user-feed' && username.value !== undefined) {
      responsePromise = getProfileArticles(username.value, page.value)
    }
    if (articlesType.value === 'user-favorites-feed' && username.value !== undefined) {
      responsePromise = getFavoritedArticles(username.value, page.value)
    }
    if (articlesType.value === 'global-feed') {
      responsePromise = getArticles(page.value)
    }

    if (responsePromise !== null) {
      const response = await responsePromise
      articles.value = response.articles
      articlesCount.value = response.articlesCount
    } else {
      throw new Error(`Articles type "${articlesType.value}" not supported`)
    }
  }

  const changePage = (value: number) => {
    page.value = value
  }

  const updateArticle = (index: number, article: Article) => {
    articles.value[index] = article
  }

  const { active: articlesDownloading, run: runWrappedFetchArticles } = createAsyncProcess(fetchArticles)

  watch(metaChanged, () => {
    if (page.value !== 1) changePage(1)
    else runWrappedFetchArticles()
  })

  watch(page, runWrappedFetchArticles)

  return {
    fetchArticles: runWrappedFetchArticles,
    articlesDownloading,
    articles,
    articlesCount,
    page,
    changePage,
    updateArticle,
  }
}
