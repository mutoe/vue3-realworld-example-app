import { reactive, watchEffect } from 'vue'

import { getProfile } from '../services/profile/getProfile'

export function useProfile (username: string) {
  const profile = reactive<Profile>({} as Profile)

  async function fetchProfile () {
    const profileData = await getProfile(username)
    updateProfile(profileData)
  }

  async function updateProfile (profileData: Profile) {
    Object.assign(profile, profileData)
  }

  watchEffect(() => {
    fetchProfile()
  })

  return {
    profile,
    updateProfile,
  }
}
