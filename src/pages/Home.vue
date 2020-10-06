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
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link disabled"
                  href=""
                >Your Feed</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href=""
                >Global Feed</a>
              </li>
            </ul>
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
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                href=""
                class="tag-pill tag-default"
              >programming</a>
              <a
                href=""
                class="tag-pill tag-default"
              >javascript</a>
              <a
                href=""
                class="tag-pill tag-default"
              >emberjs</a>
              <a
                href=""
                class="tag-pill tag-default"
              >angularjs</a>
              <a
                href=""
                class="tag-pill tag-default"
              >react</a>
              <a
                href=""
                class="tag-pill tag-default"
              >mean</a>
              <a
                href=""
                class="tag-pill tag-default"
              >node</a>
              <a
                href=""
                class="tag-pill tag-default"
              >rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlePreview from '../components/ArticlePreview.vue'
import Pagination from '../components/Pagination.vue'
import { useArticles } from '../services/article/getArticle'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    ArticlePreview,
    Pagination,
  },
  setup () {
    const { articlesCount, articles, page } = useArticles()

    const onPageChange = (index: number) => {
      page.value = index
    }

    return {
      articles,
      articlesCount,
      page,
      onPageChange,
    }
  },
})

</script>
