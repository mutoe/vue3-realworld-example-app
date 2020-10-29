import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router'
import store from './store'

import registerGlobalComponents from './plugins/global-components'
import setAuthorizationToken from './plugins/set-authorization-token'

const app = createApp(App)
app.use(router)
app.use(store)

setAuthorizationToken()
registerGlobalComponents(app)

app.mount('#app')
