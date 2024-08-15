<template>
  <ul data-testid="pagination" class="pagination">
    <li
      v-for="pageNumber in pagesCount"
      :key="pageNumber"
      class="page-item"
      :class="[{ active: isActive(pageNumber) }]"
    >
      <a
        class="page-link"
        :aria-label="`Go to page ${pageNumber}`"
        href="javascript:"
        @click="onPageChange(pageNumber)"
      >{{ pageNumber }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { limit } from 'src/services'

interface Props {
  page: number
  count: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'page-change', index: number): void
}>()

const { count, page } = toRefs(props)
const pagesCount = computed(() => Math.ceil(count.value / limit))
const isActive = (index: number) => page.value === index
const onPageChange = (index: number) => emit('page-change', index)
</script>
