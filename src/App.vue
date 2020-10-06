<template>
  <RouterView></RouterView>
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppFooter from './components/layout/Footer/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppFooter,
  },
})
</script>
