import { request } from '../index'

export async function getAllTags () {
  return request.get<TagsResponse>('/tags').then(res => res.tags)
}
