<template>
  <div class="banner">
    <div class="container">
      <h1>{{ article.title }}</h1>

      <ArticleDetailMeta
        v-if="article"
        :article="article"
        @update="updateArticle"
      />
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <!--       eslint-disable vue/no-v-html  -->
      <div
        class="col-md-12"
        v-html="articleHandledBody"
      />
      <!--       eslint-enable vue/no-v-html  -->

      <!--      TODO: abstract tag list component-->
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
      <ArticleDetailMeta
        v-if="article"
        :article="article"
        @update="updateArticle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import marked from 'src/plugins/marked'
import { api } from 'src/services'
import type { Article } from 'src/services/api'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetailMeta from './ArticleDetailMeta.vue'

const route = useRoute()
const slug = route.params.slug as string
const article: Article = reactive(await api.articles.getArticle(slug).then(res => res.data.article))

const articleHandledBody = computed(() => marked(article.body))

const updateArticle = (newArticle: Article) => {
  Object.assign(article, newArticle)
}
</script>
