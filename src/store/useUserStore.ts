import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { request } from '../services'
import Storage from '../utils/storage'

export const checkAuthorization = (user: Ref<User | null> | null): user is Ref<User> => {
  // FIXME user.value a null plutpot que user a null pour déconnexion ?
  return user === null || user?.value !== null
}

export const userStorage = new Storage<User | null>('user')

const useUserStore = defineStore({
  id: 'user',
  state: (): { user: User | null } => ({
    user: userStorage.get(),
  }),
  getters: {
    isAuthorized: (state) => state.user !== null,
  },
  actions: {
    updateUser (user: User | null) {
      if (user === null || user === undefined) {
        request.deleteAuthorizationHeader()
        this.user = null
        userStorage.set(null)
      } else {
        request.setAuthorizationHeader(user.token)
        this.user = user
        userStorage.set(user)
      }
    },
  },
})

export default useUserStore
