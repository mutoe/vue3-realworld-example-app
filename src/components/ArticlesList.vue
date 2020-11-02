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

import ArticlesListNavigation from './ArticlesListNavigation.vue'
import ArticlesListArticlePreview from './ArticlesListArticlePreview.vue'
import AppPagination from './AppPagination.vue'

import { useArticles } from '../composable/useArticles'

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
    const {
      fetchArticles, articlesDownloading,
      articlesCount, articles, updateArticle,
      page, changePage,
      articlesTypeInfo,
    } = useArticles()

    const navigationUseProps = computed(() => ({
      useGlobalFeed: props.useGlobalFeed && articlesTypeInfo.value.globalFeed,
      useMyFeed: props.useMyFeed && articlesTypeInfo.value.myFeed,
      useTag: props.useTag ? articlesTypeInfo.value.tag ?? '' : '',
      useAuthor: props.useAuthor ? articlesTypeInfo.value.author ?? '' : '',
      useFavorited: props.useFavorited ? articlesTypeInfo.value.favorited ?? '' : '',
    }))

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
