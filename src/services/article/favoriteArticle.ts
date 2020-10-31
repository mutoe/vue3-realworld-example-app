import { ComputedRef } from 'vue'
import { redirect } from '../../router'

import { request } from '../index'

import type { AuthorizationError } from '../../types/error'

import createAsyncProcess from '../../utils/create-async-process'
import { Either, fail, success } from '../../utils/either'
import { mapAuthorizationResponse } from '../../utils/map-checkable-response'

async function postFavoriteArticle (slug: string): Promise<Either<AuthorizationError, Article>> {
  const result1 = await request.checkablePost<ArticleResponse>(`/articles/${slug}/favorite`)
  const result2 = mapAuthorizationResponse<ArticleResponse>(result1)

  if (result2.isOk()) return success(result2.value.article)
  return fail(result2.value)
}

async function deleteFavoriteArticle (slug: string): Promise<Either<AuthorizationError, Article>> {
  const result1 = await request.checkableDelete(`/articles/${slug}/favorite`)
  const result2 = mapAuthorizationResponse<ArticleResponse>(result1)

  if (result2.isOk()) return success(result2.value.article)
  return fail(result2.value)
}

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
