import { ref, watchEffect } from 'vue'
import { request } from '../index'
import createAsyncProcess from '../../utils/create-async-process'

export async function getAllTags () {
  return request.get<TagsResponse>('/tags').then(res => res.tags)
}

export function useTags () {
  const tags = ref<string[]>([])

  async function fetchTags () {
    tags.value = []

    tags.value = await getAllTags()
  }

  const { active, run } = createAsyncProcess(fetchTags)

  watchEffect(() => {
    run()
  })

  return {
    tagsDownloading: active,
    tags,
  }
}
