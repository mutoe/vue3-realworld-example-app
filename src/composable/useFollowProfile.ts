import type { ComputedRef } from 'vue'

import createAsyncProcess from '../utils/create-async-process'

import { postFollowProfile, deleteFollowProfile } from '../services/profile/followProfile'

interface UseFollowProps {
  username: ComputedRef<string>
  following: ComputedRef<boolean>
  onUpdate: (profile: Profile) => void
}

export function useFollow ({ username, following, onUpdate }: UseFollowProps) {
  async function toggleFollow () {
    let profile = null

    if (following.value === true) {
      profile = await deleteFollowProfile(username.value)
    } else {
      profile = await postFollowProfile(username.value)
    }

    onUpdate(profile)
  }

  const { active, run } = createAsyncProcess(toggleFollow)

  return {
    followProcessGoing: active,
    toggleFollow: run,
  }
}
