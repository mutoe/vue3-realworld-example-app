import { reactive, watchEffect } from 'vue'
import { request } from '../index'

export async function getProfile (username: string) {
  return request.get<ProfileResponse>(`/profiles/${username}`).then(res => res.profile)
}

export function useProfile (username: string) {
  const profile = reactive<Profile>({} as Profile)

  async function fetchProfile () {
    const profileData = await getProfile(username)
    Object.assign(profile, profileData)
  }

  watchEffect(() => {
    fetchProfile()
  })

  return {
    profile,
  }
}
