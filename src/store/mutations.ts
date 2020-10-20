import { MutationTree } from 'vuex'
import { Store } from './index'

import { request } from '../services'

export const MUTATION = {
  UPDATE_USER: 'UPDATE_USER',
}

const mutations: MutationTree<Store> = {
  [MUTATION.UPDATE_USER] (state, user: User | null) {
    if (!user) {
      localStorage.removeItem('user')
      request.deleteAuthorizationHeader()
      state.user = null
    } else {
      localStorage.setItem('user', JSON.stringify(user))
      request.setAuthorizationHeader(user.token)
      state.user = user
    }
  },
}

export default mutations
