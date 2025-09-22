import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from 'src/services'

export interface Revision {
  id: number
  title: string
  slug: string
  description: string
  body: string
  created_at: string
}

export const useRevisionStore = defineStore('revision', () => {
  const revisions = ref<Revision[]>([])
  const currentRevision = ref<Revision | null>(null)

  const hasRevisions = computed(() => revisions.value.length > 0)

  async function fetchRevisions(articleId: number) {
    try {
      const res = await api.articles.getArticleRevisions(articleId)
      revisions.value = res.data.revisions
      if (revisions.value.length)
        currentRevision.value = revisions.value[0]
    }
    catch (error) {
      console.error('Failed to fetch revisions:', error)
      revisions.value = []
      currentRevision.value = null
    }
  }

  async function revertRevision(slug: string, revisionId: number): Promise<boolean> {
    try {
      // dummy revert endpoint, adjust with real API call
      await api.articles.updateArticle(slug, { article: { body: revisions.value.find(r => r.id === revisionId)?.body } })
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  return {
    revisions,
    currentRevision,
    hasRevisions,
    fetchRevisions,
    revertRevision,
  }
})
