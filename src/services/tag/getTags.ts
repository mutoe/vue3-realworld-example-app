import { request } from '../index'

export async function getAllTags (): Promise<string[]> {
  return request.get<TagsResponse>('/tags').then(res => res.tags)
}
