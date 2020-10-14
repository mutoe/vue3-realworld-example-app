import router from './routes'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import registerGlobalComponents from './plugins/global-components'

const app = createApp(App)
app.use(router)
app.use(store)

registerGlobalComponents(app)

app.mount('#app')
