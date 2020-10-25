<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ArticlesNavigation
              use-global-feed
              :use-my-feed="userAuthorized"
              :use-tag="tag"
            />
          </div>

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

            <Pagination
              :count="articlesCount"
              :page="page"
              @page-change="changePage"
            />
          </template>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlePreview from '../components/ArticlePreview.vue'
import ArticlesNavigation from '../components/ArticlesNavigation.vue'
import Pagination from '../components/Pagination.vue'
import PopularTags from '../components/PopularTags.vue'
import { useArticles } from '../services/article/getArticles'
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { AppRouteNames } from 'src/routes'

export default defineComponent({
  name: 'Home',
  components: {
    ArticlePreview,
    Pagination,
    PopularTags,
    ArticlesNavigation,
  },
  setup () {
    const route = useRoute()
    const store = useStore()

    const routeName = computed<AppRouteNames>(() => route.name as AppRouteNames)
    const tag = computed<string | undefined>(() => (
      typeof route.params.tag === 'string' ? route.params.tag : undefined
    ))

    const userAuthorized = computed<boolean>(() => store.state.user !== null)

    const { articlesDownloading, articlesCount, articles, page, changePage, updateArticle } = useArticles({
      routeName,
      tag,
    })

    return {
      articlesDownloading,
      articles,
      articlesCount,
      page,
      changePage,
      updateArticle,
      tag,
      userAuthorized,
    }
  },
})

</script>
