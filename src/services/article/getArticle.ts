import { request } from '../index'

export async function getArticle (slug: string) {
  return request.get<ArticleResponse>(`/articles/${slug}`).then(res => res.article)
}
