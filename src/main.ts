import { router } from './router'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import registerGlobalComponents from './plugins/global-components'
import { request } from './services'
import parseStorageGet from './utils/parse-storage-get'

const token = parseStorageGet('user')?.token
request.setAuthorizationHeader(token)

const app = createApp(App)
app.use(router)
app.use(store)

registerGlobalComponents(app)

app.mount('#app')
