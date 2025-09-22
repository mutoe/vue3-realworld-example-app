<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import marked from 'src/plugins/marked'
import { api } from 'src/services'
import type { Article } from 'src/services/api'
import ArticleDetailMeta from './ArticleDetailMeta.vue'
import ArticleRevisions from './ArticleRevisions.vue'
import { useUserStore } from 'src/store/user'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const article: Article = reactive(
  await api.articles.getArticle(slug).then(res => res.data.article)
)

const { user, isAuthorized } = storeToRefs(useUserStore())
const canRevert = computed(() =>
  Boolean(isAuthorized.value && user.value?.username === article.author.username)
)

const showHistory = ref(false)
function toggleHistory() { showHistory.value = !showHistory.value }

const articleHandledBody = computed(() => marked(article.body))
function updateArticle(newArticle: Article) {
  Object.assign(article, newArticle)
}

async function onReverted(newArticle: Article) {
  const slugChanged = newArticle.slug !== article.slug
  Object.assign(article, newArticle)   
  showHistory.value = false

  if (slugChanged) {
 
    await router.replace({ name: 'article', params: { slug: newArticle.slug } })
    const fresh = await api.articles.getArticle(newArticle.slug).then(r => r.data.article)
    Object.assign(article, fresh)
  }
}
</script>

<template>
  <div class="banner">
    <div class="container">
      <h1>{{ article.title }}</h1>

      <ArticleDetailMeta
        v-if="article"
        :article="article"
        @update="updateArticle"
        @show-history="toggleHistory"
      />
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div id="article-content" class="col-md-12" v-html="articleHandledBody" />
      <ul class="tag-list">
        <li v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill tag-outline">{{ tag }}</li>
      </ul>
    </div>

    <ArticleRevisions
      v-if="showHistory"
      :article-id="article.id"
      :can-revert="canRevert"
      @reverted="onReverted"
    />

    <hr>

    <div class="article-actions">
      <ArticleDetailMeta
        v-if="article"
        :article="article"
        @update="updateArticle"
        @show-history="toggleHistory"
      />
    </div>
  </div>
</template>
