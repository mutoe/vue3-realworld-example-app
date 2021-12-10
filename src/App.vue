<template>
  <AppNavigation />
  <RouterView />
  <AppFooter />
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue'
</script>
