<template>
  <div class="article-history">
    <h2>Article History</h2>
    <div v-if="revisionStore.hasRevisions">
      <ul>
        <li v-for="rev in revisionStore.revisions" :key="rev.id">
          <strong>{{ rev.title }}</strong> - {{ formatDate(rev.created_at) }}
        </li>
      </ul>
    </div>
    <p v-else>No revisions found.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'src/services'
import { useRevisionStore } from '../store/revision'

const route = useRoute()
const revisionStore = useRevisionStore()

const articleId = Number(route.params.articleId)

function formatDate(date: string) {
  return new Date(date).toLocaleString()
}

const slug = route.params.slug as string

onMounted(async () => {
  if (!slug) {
    console.error('Invalid article slug in route params')
    return
  }
  try {
    const res = await api.articles.getArticle(slug)
    const articleId = res.data.article.id
    await revisionStore.fetchRevisions(articleId)
  }
  catch (error) {
    console.error('Failed to fetch revisions:', error)
  }
})
</script>
