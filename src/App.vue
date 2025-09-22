<template>
  <AppNavigation />
  <RouterView />
  <AppFooter />
  <RouterView />
  <UiToaster />
  <UiConfirm />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue'
import UiConfirm from './ui/UiConfirm.vue'
import UiToaster from './ui/UiToaster.vue'
</script>
