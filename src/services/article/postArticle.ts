import { request } from '../index'

interface PostArticleForm {
  title: string
  description: string
  body: string
  tagList: string[]
}

export function postArticle (form: PostArticleForm): Promise<Article> {
  return request.post<ArticleResponse>('/articles', { article: form })
    .then(res => res.article)
}

export function putArticle (slug: string, form: PostArticleForm): Promise<Article> {
  return request.put<ArticleResponse>(`/articles/${slug}`, { article: form })
    .then(res => res.article)
}
