import { request } from '../index'

export function getAllTags (): Promise<string[]> {
  return request.get<TagsResponse>('/tags').then(res => res.tags)
}
