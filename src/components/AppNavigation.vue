<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <AppLink
        class="navbar-brand"
        name="global-feed"
      >
        conduit
      </AppLink>

      <ul class="nav navbar-nav pull-xs-right">
        <li
          v-for="link in navLinks"
          :key="link.name"
          class="nav-item"
        >
          <AppLink
            class="nav-link"
            active-class="active"
            :name="link.name"
            :params="link.params"
          >
            <i
              v-if="link.icon"
              :class="link.icon"
            />
            {{ link.title }}
          </AppLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { AppRouteNames } from 'src/router'
import { useUserStore } from 'src/store/user'
import { computed } from 'vue'
import type { RouteParams } from 'vue-router'

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
}

const { user } = storeToRefs(useUserStore())

const username = computed(() => user.value?.username)
const displayStatus = computed(() => username.value ? 'authorized' : 'anonym')

const allNavLinks = computed<NavLink[]>(() => [
  {
    name: 'global-feed',
    title: 'Home',
    display: 'all',
  },
  {
    name: 'login',
    title: 'Sign in',
    display: 'anonym',
  },
  {
    name: 'register',
    title: 'Sign up',
    display: 'anonym',
  },
  {
    name: 'create-article',
    title: 'New Post',
    display: 'authorized',
    icon: 'ion-compose',
  },
  {
    name: 'settings',
    title: 'Settings',
    display: 'authorized',
    icon: 'ion-gear-a',
  },
  {
    name: 'profile',
    params: { username: username.value },
    title: username.value || '',
    display: 'authorized',
  },
])

const navLinks = computed(() => allNavLinks.value.filter(
  l => l.display === displayStatus.value || l.display === 'all',
))

</script>
