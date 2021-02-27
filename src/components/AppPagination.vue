<template>
  <ul class="pagination">
    <li
      v-for="pageNumber in pagesCount"
      :key="pageNumber"
      :class="['page-item', { active: isActive(pageNumber) }]"
    >
      <a
        :aria-label="`Go to page ${pageNumber}`"
        class="page-link"
        @click="onPageChange(pageNumber)"
      >{{ pageNumber }}</a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { limit } from 'src/services'
import { computed, defineEmit, defineProps, toRefs } from 'vue'

const props = defineProps<{
  page: number
  count: number
}>()

const emit = defineEmit<(e: 'page-change', index: number) => void>()

const { count, page } = toRefs(props)
const pagesCount = computed(() => Math.ceil(count.value / limit))
const isActive = (index: number) => page.value === index
const onPageChange = (index: number) => emit('page-change', index)
</script>
