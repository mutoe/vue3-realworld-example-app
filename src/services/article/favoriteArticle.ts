import { request } from '../index'

async function postFavoriteArticle (slug: string) {
  return request.post<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

async function deleteFavoriteArticle (slug: string) {
  return request.delete<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

export const useFavoriteArticle = (article: Article, updateArticle: (newArticle: Article) => void) => {
  const onFavoriteArticle = async () => {
    let newArticle: Article
    if (article.favorited) {
      newArticle = await deleteFavoriteArticle(article.slug)
    } else {
      newArticle = await postFavoriteArticle(article.slug)
    }
    updateArticle(newArticle)
  }

  return { onFavoriteArticle }
}
