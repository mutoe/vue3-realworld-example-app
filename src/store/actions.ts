import { ActionTree } from 'vuex'
import router from '../routes'
import { postLogin, PostLoginForm } from '../services'
import { Store } from './index'
import { MUTATION } from './mutations'

const actions: ActionTree<Store, Store> = {
  async login ({ commit }, form: PostLoginForm) {
    try {
      const user = await postLogin(form)
      commit(MUTATION.UPDATE_USER, user)
      await router.replace('/')
    } catch (e) {
      // TODO: error handling
    }
  },

  async logout ({ commit }) {
    commit(MUTATION.UPDATE_USER, null)
    await router.push('/')
  },
}

export default actions
