import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/my-feeds', component: Home },
    { path: '/tag/:tag', component: Home },
  ],
})

export default router
