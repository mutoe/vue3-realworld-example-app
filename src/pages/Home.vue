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

          <ArticlePreview
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          />

          <Pagination
            :count="articlesCount"
            :page="page"
            @page-change="onPageChange"
          />
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
import { useArticles } from '../services/article/getArticle'
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    ArticlePreview,
    Pagination,
    PopularTags,
    ArticlesNavigation,
  },
  setup () {
    const { articlesCount, articles, page } = useArticles()
    const route = useRoute()
    const store = useStore()

    const tag = computed<string>(() => route.params.tag as string)

    const userAuthorized = computed<boolean>(() => store.state.user !== null)

    const username = computed<string>(() => (store.state.user?.username as string) ?? '')

    const onPageChange = (index: number) => {
      page.value = index
    }

    return {
      articles,
      articlesCount,
      page,
      onPageChange,
      tag,
      userAuthorized,
      username,
    }
  },
})

</script>
