import { MutationTree } from 'vuex'
import { Store } from './index'

export const MUTATION = {
  UPDATE_USER: 'UPDATE_USER',
}

const mutations: MutationTree<Store> = {
  [MUTATION.UPDATE_USER] (state, user: User|null) {
    if (!user) {
      localStorage.removeItem('user')
      state.user = null
    } else {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    }
  },
}

export default mutations
