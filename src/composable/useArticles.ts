import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AppRouteNames } from '../router'

import createAsyncProcess from '../utils/create-async-process'

import {
  getArticles,
  getFavoritedArticles,
  getProfileArticles,
  getFeeds,
  getArticlesByTag,
} from '../services/article/getArticles'

import store from '../store'

export function useArticles () {
  const route = useRoute()
  const { user, isAuthorized } = store.user

  const articles = ref<Article[]>([])
  const articlesCount = ref(0)
  const page = ref(1)

  const tag = computed(() => (
    typeof route.params.tag === 'string' ? route.params.tag : undefined
  ))

  const username = computed(() => (
    typeof route.params.username === 'string' ? route.params.username : undefined
  ))

  const articlesType = computed(() => route.name as AppRouteNames)

  const articlesTypeInfo = computed(() => ({
    globalFeed: true,
    myFeed: isAuthorized(user),
    tag: tag.value ?? '',
    author: username.value ?? '',
    favorited: username.value ?? '',
  }))

  async function fetchArticles () {
    articles.value = []
    let responsePromise: null | Promise<ArticlesResponse> = null

    if (articlesType.value === 'my-feed') {
      responsePromise = getFeeds(page.value)
    }
    if (articlesType.value === 'tag' && tag.value !== undefined) {
      responsePromise = getArticlesByTag(tag.value, page.value)
    }
    if (articlesType.value === 'profile' && username.value !== undefined) {
      responsePromise = getProfileArticles(username.value, page.value)
    }
    if (articlesType.value === 'profile-favorites' && username.value !== undefined) {
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

  watch(articlesType, () => {
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
    articlesTypeInfo,
  }
}
