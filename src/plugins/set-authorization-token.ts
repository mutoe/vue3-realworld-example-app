import { storeToRefs } from 'pinia'
import { request } from 'src/services'
import useUserStore from 'src/store/useUserStore'

export default function (): void {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const token = user?.value?.token
  if (token !== undefined) request.setAuthorizationHeader(token)
}
