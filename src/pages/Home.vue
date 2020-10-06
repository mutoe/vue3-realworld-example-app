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

          <div
            v-for="article in articles"
            :key="article.slug"
            class="article-preview"
          >
            <div class="article-meta">
              <a href=""><img :src="article.author.image"></a>
              <div class="info">
                <a
                  href=""
                  class="author"
                >{{ article.author.username }}</a>
                <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart" /> {{ article.favoritesCount }}
              </button>
            </div>
            <a
              href=""
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </a>
          </div>

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
import { useArticles } from '../services/article/getArticle'
import Pagination from '../components/Pagination.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
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
