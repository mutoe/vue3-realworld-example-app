import { request } from '../index'

export async function getCommentsByArticle (slug: string) {
  return request.get<CommentsResponse>(`/articles/${slug}/comments`).then(res => res.comments)
}
