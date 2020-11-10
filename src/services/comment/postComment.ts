import { request } from '../index'

export async function deleteComment (slug: string, commentId: number): Promise<any> {
  return request.delete(`/articles/${slug}/comments/${commentId}`)
}

export async function postComment (slug: string, body: string): Promise<ArticleComment> {
  return request.post<CommentResponse>(`/articles/${slug}/comments`, { comment: { body } })
    .then(res => res.comment)
}
