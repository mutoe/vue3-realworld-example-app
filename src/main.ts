import { createApp } from 'vue'
import App from './App.vue'

import Harlem from '@harlem/core'

import { router } from './router'

import registerGlobalComponents from './plugins/global-components'
import setAuthorizationToken from './plugins/set-authorization-token'

const app = createApp(App)
app.use(router)
app.use(Harlem)

setAuthorizationToken()
registerGlobalComponents(app)

app.mount('#app')
