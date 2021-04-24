<template>
  <ul class="pagination">
    <li
      v-for="pageNumber in pagesCount"
      :key="pageNumber"
      :class="['page-item', { active: isActive(pageNumber) }]"
    >
      <a
        role="link"
        :aria-label="`Go to page ${pageNumber}`"
        class="page-link"
        @click="onPageChange(pageNumber)"
      >{{ pageNumber }}</a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { limit } from 'src/services'
import { computed, defineEmit, defineProps } from 'vue'

const props = defineProps<{
  page: number
  count: number
}>()

const emit = defineEmit<{
  (e: 'page-change', index: number): void
}>()

ref: pagesCount = computed(() => Math.ceil(props.count / limit))

const isActive = (index: number) => props.page === index
const onPageChange = (index: number) => emit('page-change', index)
</script>
