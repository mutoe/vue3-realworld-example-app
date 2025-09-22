<template>
  <AppNavigation />
  <RouterView />
  <AppFooter />
  <RouterView />
  <UiToaster />
  <UiConfirm />
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppNavigation from './components/AppNavigation.vue'

import { RouterView } from 'vue-router'
import UiToaster from './ui/UiToaster.vue'
import UiConfirm from './ui/UiConfirm.vue'
</script>
