import { getProfile } from 'src/services/profile/getProfile'
import { watch, ref } from 'vue'
import type { Ref } from 'vue'

interface UseProfileProps {
  username: Ref<string>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useProfile ({ username }: UseProfileProps) {
  const profile = ref<Profile | null>(null)

  async function fetchProfile (): Promise<void> {
    updateProfile(null)
    if (!username) return
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
