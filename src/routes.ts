import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'

export type AppRouteNames = 'global-feed'
  |'my-feed'
  |'tag'
  |'article'
  |'login'
  |'register'
  |'profile'
  |'profile-favorites'
  |'editor'
  |'settings'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/my-feeds', component: Home },
    { path: '/tag/:tag', component: Home },
    { path: '/article/:slug', component: () => import('./pages/Article.vue') },
    { path: '/login', component: () => import('./pages/Login.vue') },
    { path: '/register', component: () => import('./pages/Register.vue') },
    { path: '/profile/:username', component: () => import('./pages/Profile.vue') },
    { path: '/profile/:username/favorites', component: () => import('./pages/Profile.vue') },
  ],
})

export default router
