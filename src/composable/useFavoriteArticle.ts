import { ComputedRef } from 'vue'

import { deleteFavoriteArticle, postFavoriteArticle } from '../services/article/favoriteArticle'

import createAsyncProcess from '../utils/create-async-process'

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
