// src/services/auth-bridge.ts
import { useUserStore } from 'src/store/user'
import { api } from './index'

export function initApiAuthBridge() {
  const store = useUserStore()

  api.setSecurityData(store.user?.token ?? null)

  store.$subscribe((_mutation, state) => {
    api.setSecurityData(state.user?.token ?? null)
  })
}
