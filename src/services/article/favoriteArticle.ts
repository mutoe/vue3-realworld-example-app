import type { AuthorizationError } from 'src/types/error'
import { Either, fail, success } from 'src/utils/either'
import { mapAuthorizationResponse } from 'src/utils/map-checkable-response'
import { request } from '../index'

export async function postFavoriteArticle (slug: string): Promise<Either<AuthorizationError, Article>> {
  const result1 = await request.checkablePost<ArticleResponse>(`/articles/${slug}/favorite`)
  const result2 = mapAuthorizationResponse<ArticleResponse>(result1)

  if (result2.isOk()) return success(result2.value.article)
  return fail(result2.value)
}

export async function deleteFavoriteArticle (slug: string): Promise<Either<AuthorizationError, Article>> {
  const result1 = await request.checkableDelete<ArticleResponse>(`/articles/${slug}/favorite`)
  const result2 = mapAuthorizationResponse<ArticleResponse>(result1)

  if (result2.isOk()) return success(result2.value.article)
  return fail(result2.value)
}
