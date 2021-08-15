import { getProfile } from 'src/services/profile/getProfile'
import { watch } from 'vue'

interface UseProfileProps {
  username: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export function useProfile ({ username }: UseProfileProps) {
  let profile = $ref<Profile | null>(null)

  async function fetchProfile (): Promise<void> {
    updateProfile(null)
    if (!username) return
    const profileData = await getProfile(username)
    updateProfile(profileData)
  }

  function updateProfile (profileData: Profile | null): void {
    profile = profileData
  }

  watch($raw(username), fetchProfile, { immediate: true })

  return {
    profile,
    updateProfile,
  }
}
