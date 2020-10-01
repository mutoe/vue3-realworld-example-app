import { request } from '../index'

interface PostArticleForm {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export async function postArticle(form: PostArticleForm) {
  return request.post<ArticleResponse>('/articles', { article: form })
    .then(res => res.article)
}

export async function putArticle(slug: string, form: PostArticleForm) {
  return request.put<ArticleResponse>(`/articles/${slug}`, { article: form })
    .then(res => res.article)
}
