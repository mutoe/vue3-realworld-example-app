import { api } from 'src/services'
import type { Profile } from 'src/services/api'
import useAsync from 'src/utils/use-async'
import type { ComputedRef } from 'vue'

interface UseFollowProps {
  username: ComputedRef<string>
  following: ComputedRef<boolean>
  onUpdate: (profile: Profile) => void
}

export function useFollow ({ username, following, onUpdate }: UseFollowProps) {
  async function toggleFollow () {
    const requester = following.value ? api.profiles.unfollowUserByUsername : api.profiles.followUserByUsername
    const profile = await requester(username.value).then(res => res.data.profile)
    onUpdate(profile)
  }

  const { active, run } = useAsync(toggleFollow)

  return {
    followProcessGoing: active,
    toggleFollow: run,
  }
}
