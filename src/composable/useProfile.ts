import { ComputedRef, ref, watch } from 'vue'

import { getProfile } from '../services/profile/getProfile'

interface UseProfileProps {
  username: ComputedRef<string>
}

export function useProfile ({ username }: UseProfileProps) {
  const profile = ref<Profile | null>(null)

  async function fetchProfile () {
    updateProfile(null)
    const profileData = await getProfile(username.value)
    updateProfile(profileData)
  }

  async function updateProfile (profileData: Profile | null) {
    profile.value = profileData
  }

  watch(username, fetchProfile, { immediate: true })

  return {
    profile,
    updateProfile,
  }
}
