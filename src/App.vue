<template>
  <AppNavigation />
  <RouterView />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppFooter from './components/Footer.vue'
import AppNavigation from './components/Navigation.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation,
    AppFooter,
  },
})
</script>
