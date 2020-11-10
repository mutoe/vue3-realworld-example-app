import { request } from '../index'

export async function getArticle (slug: string): Promise<Article> {
  return request.get<ArticleResponse>(`/articles/${slug}`).then(res => res.article)
}
