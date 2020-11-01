import { ComputedRef, reactive, watch } from 'vue'

import { getProfile } from '../services/profile/getProfile'

interface UseProfileProps {
  username: ComputedRef<string>
}

export function useProfile ({ username }: UseProfileProps) {
  const profile = reactive<Profile>({} as Profile)

  async function fetchProfile () {
    const profileData = await getProfile(username.value)
    updateProfile(profileData)
  }

  async function updateProfile (profileData: Profile) {
    Object.assign(profile, profileData)
  }

  watch(username, fetchProfile, { immediate: true })

  return {
    profile,
    updateProfile,
  }
}
