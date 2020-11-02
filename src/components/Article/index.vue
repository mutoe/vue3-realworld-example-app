<template>
  <div class="banner">
    <div class="container">
      <h1>{{ article.title }}</h1>

      <ArticleMeta
        :article="article"
        @update="updateArticle"
      />
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <!-- eslint-disable vue/no-v-html  -->
      <div
        class="col-md-12"
        v-html="articleHandledBody"
      />
      <!-- eslint-enable vue/no-v-html  -->
      <ul class="tag-list">
        <li
          v-for="tag in article.tagList"
          :key="tag"
          class="tag-default tag-pill tag-outline"
        >
          {{ tag }}
        </li>
      </ul>
    </div>

    <hr>

    <div class="article-actions">
      <ArticleMeta
        :article="article"
        @update="updateArticle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import DOMPurify from 'dompurify'
import md2html from 'marked'
import { computed, defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'

import ArticleMeta from './Meta.vue'

import { getArticle } from '../../services/article/getArticle'

export default defineComponent({
  name: 'ArticleDetail',
  components: {
    ArticleMeta,
  },
  async setup () {
    const route = useRoute()
    const slug = route.params.slug as string
    const article = reactive<Article>(await getArticle(slug))

    const articleHandledBody = computed(() => md2html(article.body, { sanitizer: DOMPurify.sanitize }))

    const updateArticle = (newArticle: Article) => {
      Object.assign(article, newArticle)
    }

    return {
      article,
      articleHandledBody,
      slug,
      updateArticle,
    }
  },
})
</script>
