import type { ComputedRef } from 'vue'
import { redirect } from '../../router'

import type { AuthorizationError } from '../../types/error'

import { request } from '../index'

import createAsyncProcess from '../../utils/create-async-process'
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

interface UseFollowProps {
  username: ComputedRef<string>
  following: ComputedRef<boolean>
  onUpdate: (profile: Profile) => void
}

export function useFollow ({ username, following, onUpdate }: UseFollowProps) {
  async function toggleFollow () {
    let response: Either<AuthorizationError, Profile>

    if (following.value === true) {
      response = await deleteFollowProfile(username.value)
    } else {
      response = await postFollowProfile(username.value)
    }

    if (response.isOk()) onUpdate(response.value)
    else redirect('login')
  }

  const { active, run } = createAsyncProcess(toggleFollow)

  return {
    followProcessGoing: active,
    toggleFollow: run,
  }
}
