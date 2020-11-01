import type { ComputedRef } from 'vue'
import { redirect } from '../router'

import type { AuthorizationError } from '../types/error'

import type { Either } from '../utils/either'
import createAsyncProcess from '../utils/create-async-process'

import { postFollowProfile, deleteFollowProfile } from '../services/profile/followProfile'

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
