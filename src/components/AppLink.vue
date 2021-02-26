<template>
  <router-link :to="props" v-bind="attrs">
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
import type { AppRouteNames } from '../router'
import type { RouteParams } from 'vue-router'

import { defineProps, useContext } from 'vue'

const props = defineProps<{
  name: AppRouteNames
  params?: RouteParams
}>()

const { attrs } = useContext()
</script>
