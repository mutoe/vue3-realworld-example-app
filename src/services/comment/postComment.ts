import { request } from '../index'

export function deleteComment (slug: string, commentId: number): Promise<Record<string, unknown>> {
  return request.delete(`/articles/${slug}/comments/${commentId}`)
}

export function postComment (slug: string, body: string): Promise<ArticleComment> {
  return request.post<CommentResponse>(`/articles/${slug}/comments`, { comment: { body } })
    .then(res => res.comment)
}
