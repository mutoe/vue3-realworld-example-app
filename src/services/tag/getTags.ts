import { ref } from 'vue'
import { request } from '../index'

export async function getAllTags () {
  return request.get<TagsResponse>('/tags').then(res => res.tags)
}

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
