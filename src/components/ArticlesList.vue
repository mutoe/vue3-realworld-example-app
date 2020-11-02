<template>
  <ArticlesListNavigation v-bind="navigationUseProps" />

  <div
    v-if="articlesDownloading"
    class="article-preview"
  >
    Articles are downloading...
  </div>
  <template v-else>
    <ArticlePreview
      v-for="(article, index) in articles"
      :key="article.slug"
      :article="article"
      @update="updateArticle(index, $event)"
    />

    <AppPagination
      :count="articlesCount"
      :page="page"
      @page-change="changePage"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AppRouteNames } from '../router'

import ArticlesListNavigation from './ArticlesListNavigation.vue'
import ArticlesListArticlePreview from './ArticlesListArticlePreview.vue'
import AppPagination from './AppPagination.vue'

import { useArticles } from '../composable/useArticles'

import store from '../store'

export default defineComponent({
  name: 'ArticlesList',
  components: {
    ArticlePreview: ArticlesListArticlePreview,
    AppPagination,
    ArticlesListNavigation,
  },
  props: {
    useGlobalFeed: { type: Boolean, default: false },
    useMyFeed: { type: Boolean, default: false },
    useTag: { type: Boolean, default: false },
    useAuthor: { type: Boolean, default: false },
    useFavorited: { type: Boolean, default: false },
  },
  async setup (props) {
    const route = useRoute()
    const routeName = computed<AppRouteNames>(() => route.name as AppRouteNames)
    const { user, isAuthorized } = store.user

    const tag = computed<string | undefined>(() => (
      typeof route.params.tag === 'string' ? route.params.tag : undefined
    ))

    const username = computed<string | undefined>(() => (
      typeof route.params.username === 'string' ? route.params.username : undefined
    ))

    const userAuthorized = computed<boolean>(() => isAuthorized(user))

    const navigationUseProps = computed(() => ({
      useGlobalFeed: props.useGlobalFeed,
      useMyFeed: props.useMyFeed ? userAuthorized.value : false,
      useTag: props.useTag ? tag.value : '',
      useAuthor: props.useAuthor ? username.value : '',
      useFavorited: props.useFavorited ? username.value : '',
    }))

    const { fetchArticles, articlesDownloading, articlesCount, articles, page, changePage, updateArticle } = useArticles({
      routeName,
      tag,
      username,
    })

    await fetchArticles()

    return {
      articlesDownloading,
      navigationUseProps,
      articles,
      articlesCount,
      page,
      changePage,
      updateArticle,
    }
  },
})

</script>
