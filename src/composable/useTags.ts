import { getAllTags } from 'src/services/tag/getTags'
import { ref } from 'vue'

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
