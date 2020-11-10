import { ref } from 'vue'

import { getAllTags } from '../services/tag/getTags'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useTags () {
  const tags = ref<string[]>([])

  async function fetchTags () {
    tags.value = []
    tags.value = await getAllTags()
  }

  return {
    fetchTags,
    tags,
  }
}
