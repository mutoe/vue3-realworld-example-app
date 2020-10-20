import { request } from '../index'

export async function deleteArticle (slug: string): Promise<void> {
  return request.delete(`/articles/${slug}`)
}
