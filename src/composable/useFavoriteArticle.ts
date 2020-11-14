import { ComputedRef } from 'vue'
import { routerPush } from '../router'

import type { AuthorizationError } from '../types/error'

import { deleteFavoriteArticle, postFavoriteArticle } from '../services/article/favoriteArticle'

import type { Either } from '../utils/either'
import createAsyncProcess from '../utils/create-async-process'

interface useFavoriteArticleProps {
  isFavorited: ComputedRef<boolean>
  articleSlug: ComputedRef<string>
  onUpdate: (newArticle: Article) => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const useFavoriteArticle = ({ isFavorited, articleSlug, onUpdate }: useFavoriteArticleProps) => {
  const favoriteArticle = async (): Promise<void> => {
    let response: Either<AuthorizationError, Article>
    if (isFavorited.value) {
      response = await deleteFavoriteArticle(articleSlug.value)
    } else {
      response = await postFavoriteArticle(articleSlug.value)
    }

    if (response.isOk()) onUpdate(response.value)
    else await routerPush('login')
  }

  const { active, run } = createAsyncProcess(favoriteArticle)

  return {
    favoriteProcessGoing: active,
    favoriteArticle: run,
  }
}
