import { request } from '../index'
import createAsyncProcess from '../../utils/create-async-process'
import { ComputedRef } from 'vue'

export async function postFollowProfile (username: string) {
  return request.post<ProfileResponse>(`/profiles/${username}/follow`).then(res => res.profile)
}

export async function deleteFollowProfile (username: string) {
  return request.delete<ProfileResponse>(`/profiles/${username}/follow`).then(res => res.profile)
}

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
