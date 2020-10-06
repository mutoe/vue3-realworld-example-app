<template>
  <AppNavigation />
  <RouterView></RouterView>
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppFooter from './components/layout/Footer/index.vue'

import AppNavigation from './components/layout/Navigation/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation,
    AppFooter,
  },
})
</script>
