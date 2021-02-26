<template>
  <AppNavigation />
  <RouterView />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation,
    AppFooter,
  },
})
</script>
