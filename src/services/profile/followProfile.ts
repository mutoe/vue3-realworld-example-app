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
}

export function useFollow ({ username, following }: UseFollowProps) {
  async function toggleFollow (): Promise<Profile> {
    let profile = null

    if (following.value === true) {
      profile = await deleteFollowProfile(username.value)
    } else {
      profile = await postFollowProfile(username.value)
    }

    return profile
  }

  const { active, run } = createAsyncProcess(toggleFollow)

  return {
    followProcessGoing: active,
    toggleFollow: run,
  }
}
