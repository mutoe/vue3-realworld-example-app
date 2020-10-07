import { createStore } from 'vuex'
import parseStorageGet from '../utils/parse-storage-get'
import actions from './actions'
import mutations from './mutations'

export interface Store {
  user: User | null;
}

const store = createStore<Store>({
  state () {
    return {
      user: parseStorageGet<User>('user') || null,
    }
  },
  mutations,
  actions,
})

export default store
