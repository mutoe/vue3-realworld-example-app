import type { AuthorizationError } from 'src/types/error'
import { Either, fail, success } from 'src/utils/either'
import { mapAuthorizationResponse } from 'src/utils/map-checkable-response'
import { request } from '../index'

export async function postFollowProfile (username: string): Promise<Either<AuthorizationError, Profile>> {
  const result1 = await request.checkablePost<ProfileResponse>(`/profiles/${username}/follow`)
  const result2 = mapAuthorizationResponse<ProfileResponse>(result1)

  if (result2.isOk()) return success(result2.value.profile)
  return fail(result2.value)
}

export async function deleteFollowProfile (username: string): Promise<Either<AuthorizationError, Profile>> {
  const result1 = await request.checkableDelete<ProfileResponse>(`/profiles/${username}/follow`)
  const result2 = mapAuthorizationResponse<ProfileResponse>(result1)

  if (result2.isOk()) return success(result2.value.profile)
  return fail(result2.value)
}
