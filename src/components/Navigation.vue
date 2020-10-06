<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a
        class="navbar-brand"
        href="index.html"
      >
        conduit
      </a>

      <!-- FOR TEST, remove after user auth logic will be implemented -->
      <button @click="isUserAuthorized=!isUserAuthorized">
        Authorized: {{ isUserAuthorized }}
      </button>

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
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useNavigationLinks } from './NavigationHooks'

export default defineComponent({
  name: 'AppNavigation',
  setup () {
    const isUserAuthorized = ref(false)

    const { navLinks } = useNavigationLinks({ isUserAuthorized })

    return {
      isUserAuthorized,
      navLinks,
    }
  },
})
</script>
