import { ComputedRef } from 'vue'
import { request } from '../index'
import createAsyncProcess from '../../utils/create-async-process'

async function postFavoriteArticle (slug: string) {
  return request.post<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

async function deleteFavoriteArticle (slug: string) {
  return request.delete<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

interface useFavoriteArticleProps {
  isFavorited: ComputedRef<boolean>
  articleSlug: ComputedRef<string>
  onUpdate: (newArticle: Article) => void
}

export const useFavoriteArticle = ({ isFavorited, articleSlug, onUpdate }: useFavoriteArticleProps) => {
  const favoriteArticle = async () => {
    let newArticle: Article
    if (isFavorited.value) {
      newArticle = await deleteFavoriteArticle(articleSlug.value)
    } else {
      newArticle = await postFavoriteArticle(articleSlug.value)
    }
    onUpdate(newArticle)
  }

  const { active, run } = createAsyncProcess(favoriteArticle)

  return {
    favoriteProcessGoing: active,
    favoriteArticle: run,
  }
}
