import { getProfile } from 'src/services/profile/getProfile'
import { ComputedRef, ref, watch } from 'vue'

interface UseProfileProps {
  username: ComputedRef<string>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useProfile ({ username }: UseProfileProps) {
  const profile = ref<Profile | null>(null)

  async function fetchProfile (): Promise<void> {
    updateProfile(null)
    if (!username.value) return
    const profileData = await getProfile(username.value)
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
