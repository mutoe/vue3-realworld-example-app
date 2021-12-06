import type { ComputedRef } from 'vue'
import { createStore } from '@harlem/core'

import { request } from '../services'
import Storage from '../utils/storage'

export const userStorage = new Storage<User>('user')

interface State {
  user: User | null
}

const STATE: State = {
  user: userStorage.get(),
}

const { getter, mutation } = createStore('user', STATE)

export const user = getter('user', state => state.user)

export const isAuthorized = getter('isAuthorized', () => checkAuthorization(user))

export const checkAuthorization = (user: ComputedRef<User | null>): user is ComputedRef<User> => {
  return user.value !== null
}

export const updateUser = mutation<User | null>('updateUser', (state, userData) => {
  if (userData === undefined || userData === null) {
    userStorage.remove()
    request.deleteAuthorizationHeader()
    state.user = null
  } else {
    userStorage.set(userData)
    request.setAuthorizationHeader(userData.token)
    state.user = userData
  }
})
