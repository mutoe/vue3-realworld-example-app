import type { AuthorizationError } from '../../types/error'

import { request } from '../index'

import { mapAuthorizationResponse } from '../../utils/map-checkable-response'
import { Either, fail, success } from '../../utils/either'

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
