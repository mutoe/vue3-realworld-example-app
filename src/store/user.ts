import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { request } from '../services'
import Storage from '../utils/storage'

export const userStorage = new Storage<User>('user')

export const isAuthorized = (): boolean => !!userStorage.get()

export const useUserStore = defineStore('user', () => {
  const user = ref(userStorage.get())
  const isAuthorized = computed(() => user.value !== null)

  function updateUser (userData?: User | null) {
    if (userData === undefined || userData === null) {
      userStorage.remove()
      request.deleteAuthorizationHeader()
      user.value = null
    } else {
      userStorage.set(userData)
      request.setAuthorizationHeader(userData.token)
      user.value = userData
    }
  }

  return {
    user,
    isAuthorized,
    updateUser,
  }
})
