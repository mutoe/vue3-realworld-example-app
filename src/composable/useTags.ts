import { api } from 'src/services'
import { ref } from 'vue'

export function useTags () {
  const tags = ref<string[]>([])

  async function fetchTags (): Promise<void> {
    tags.value = []
    tags.value = await api.tags.tagsList().then(({ data }) => data.tags)
  }

  return {
    fetchTags,
    tags,
  }
}
