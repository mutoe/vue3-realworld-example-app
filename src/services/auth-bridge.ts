// src/services/auth-bridge.ts
import { api } from './index' 
import { useUserStore } from 'src/store/user'

export function initApiAuthBridge() {
  const store = useUserStore()


  api.setSecurityData(store.user?.token ?? null)


  store.$subscribe((_mutation, state) => {
    api.setSecurityData(state.user?.token ?? null)
  })
}
