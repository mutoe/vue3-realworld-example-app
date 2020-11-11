import { request } from '../index'

export function deleteArticle (slug: string): Promise<void> {
  return request.delete(`/articles/${slug}`)
}
