import { api } from 'src/services'
import type { Profile } from 'src/services/api'
import type { ComputedRef } from 'vue'
import { ref, watch } from 'vue'

interface UseProfileProps {
  username: ComputedRef<string>
}

export function useProfile ({ username }: UseProfileProps) {
  const profile = ref<Profile | null>(null)

  async function fetchProfile (): Promise<void> {
    updateProfile(null)
    if (!username.value) return
    const profileData = await api.profiles.getProfileByUsername(username.value).then(res => res.data.profile)
    updateProfile(profileData)
  }

  function updateProfile (profileData: Profile | null): void {
    profile.value = profileData
  }

  watch(username, fetchProfile, { immediate: true })

  return {
    profile,
    updateProfile,
  }
}
