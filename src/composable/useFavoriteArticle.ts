import { ComputedRef } from 'vue'
import { redirect } from '../router'

import type { AuthorizationError } from '../types/error'

import { deleteFavoriteArticle, postFavoriteArticle } from '../services/article/favoriteArticle'

import type { Either } from '../utils/either'
import createAsyncProcess from '../utils/create-async-process'

interface useFavoriteArticleProps {
  isFavorited: ComputedRef<boolean>
  articleSlug: ComputedRef<string>
  onUpdate: (newArticle: Article) => void
}

export const useFavoriteArticle = ({ isFavorited, articleSlug, onUpdate }: useFavoriteArticleProps) => {
  const favoriteArticle = async () => {
    let response: Either<AuthorizationError, Article>
    if (isFavorited.value) {
      response = await deleteFavoriteArticle(articleSlug.value)
    } else {
      response = await postFavoriteArticle(articleSlug.value)
    }

    if (response.isOk()) onUpdate(response.value)
    else redirect('login')
  }

  const { active, run } = createAsyncProcess(favoriteArticle)

  return {
    favoriteProcessGoing: active,
    favoriteArticle: run,
  }
}
