import { request } from '../index'

export async function deleteComment (slug: string, commentId: number) {
  return request.delete(`/articles/${slug}/comments/${commentId}`)
}

export async function postComment (slug: string, body: string) {
  return request.post<CommentResponse>(`/articles/${slug}/comments`, { comment: { body } })
    .then(res => res.comment)
}
