import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/my-feeds', component: Home },
    { path: '/tag/:tag', component: Home },
    { path: '/article/:slug', component: () => import('./pages/Article.vue') },
  ],
})

export default router
