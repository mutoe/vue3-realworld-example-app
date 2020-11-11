import { ref } from 'vue'

import { getAllTags } from '../services/tag/getTags'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useTags () {
  const tags = ref<string[]>([])

  async function fetchTags (): Promise<void> {
    tags.value = []
    tags.value = await getAllTags()
  }

  return {
    fetchTags,
    tags,
  }
}
