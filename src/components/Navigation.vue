<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <RouterLink
        class="navbar-brand"
        to="/"
      >
        conduit
      </RouterLink>

      <ul class="nav navbar-nav pull-xs-right">
        <li
          v-for="link in navLinks"
          :key="link.to"
          class="nav-item"
        >
          <RouterLink
            class="nav-link"
            active-class="active"
            :to="link.to"
          >
            <i
              v-if="link.icon"
              :class="link.icon"
            /> {{ link.title }}
          </RouterLink>
        </li>
        <!-- TODO: remove logout link -->
        <li
          v-if="store.state.user?.username"
          class="nav-item"
        >
          <a
            href="javascript:"
            class="nav-link"
            @click="onLogout"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useNavigationLinks } from './NavigationHooks'

export default defineComponent({
  name: 'AppNavigation',
  setup () {
    const store = useStore()
    const user = computed<User | null>(() => store.state.user)
    const { navLinks } = useNavigationLinks({ user })

    const onLogout = () => {
      store.dispatch('logout')
    }

    return {
      navLinks,
      onLogout,
      store,
    }
  },
})
</script>
