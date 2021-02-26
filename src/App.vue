<template>
  <AppNavigation />
  <RouterView />
  <AppFooter />
</template>

<script lang="ts" setup>
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue'
</script>
