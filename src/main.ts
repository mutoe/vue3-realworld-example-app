import router from './routes'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import { request } from './services'
import parseStorageGet from './utils/parse-storage-get'

const token = parseStorageGet('user')?.token
request.setAuthorizationHeader(token)

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
