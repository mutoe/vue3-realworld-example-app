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
        href="javascript:"
        @click="onPageChange(pageNumber)"
      >{{ pageNumber }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { limit } from 'src/services'
import { computed, toRefs } from 'vue'

interface Props {
  page: number
  count: number
}

interface Emits {
  (e: 'page-change', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { count, page } = toRefs(props)
const pagesCount = computed(() => Math.ceil(count.value / limit))
const isActive = (index: number) => page.value === index
const onPageChange = (index: number) => emit('page-change', index)
</script>
