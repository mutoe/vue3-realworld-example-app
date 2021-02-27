<template>
  <ArticlesListNavigation
    v-bind="$attrs"
    :tag="tag"
    :username="username"
  />

  <div
    v-if="articlesDownloading"
    class="article-preview"
  >
    Articles are downloading...
  </div>
  <div
    v-else-if="articles.length === 0"
    class="article-preview"
  >
    No articles are here... yet.
  </div>
  <template v-else>
    <ArticlesListArticlePreview
      v-for="(article, index) in articles"
      :key="article.slug"
      :article="article"
      @update="newArticle => updateArticle(index, newArticle)"
    />

    <AppPagination
      :count="articlesCount"
      :page="page"
      @page-change="changePage"
    />
  </template>
</template>

<script lang="ts">
import { useArticles } from 'src/composable/useArticles'
import { defineComponent } from 'vue'
import AppPagination from './AppPagination.vue'
import ArticlesListArticlePreview from './ArticlesListArticlePreview.vue'
import ArticlesListNavigation from './ArticlesListNavigation.vue'

export default defineComponent({
  name: 'ArticlesList',
  components: {
    ArticlesListArticlePreview,
    AppPagination,
    ArticlesListNavigation,
  },

  async setup () {
    const {
      fetchArticles,
      articlesDownloading,
      articlesCount,
      articles,
      updateArticle,
      page,
      changePage,
      tag,
      username,
    } = useArticles()

    await fetchArticles()

    return {
      articlesDownloading,
      articles,
      articlesCount,
      page,
      changePage,
      updateArticle,
      tag,
      username,
    }
  },
})
</script>
