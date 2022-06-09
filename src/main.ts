import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import { router } from './router'

import registerGlobalComponents from './plugins/global-components'
import setAuthorizationToken from './plugins/set-authorization-token'

const app = createApp(App)

app.use(createPinia())
app.use(router)

setAuthorizationToken()
registerGlobalComponents(app)

app.mount('#app')
