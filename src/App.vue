<template>
  <AppNavigation />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AppNavigation from './components/layout/Navigation/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation
  },
})
</script>
