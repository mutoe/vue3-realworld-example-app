<template>
  <ul class="pagination">
    <li
      v-for="pageNumber in pagesCount"
      :key="pageNumber"
      :class="['page-item', { active: isActive(pageNumber) }]"
    >
      <a
        class="page-link"
        @click="onPageChange(pageNumber)"
      >{{ pageNumber }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import { limit } from '../services'

interface PaginationProps {
  count: number;
  page: number
}

export default defineComponent({
  name: 'Pagination',
  props: ['count', 'page'],
  setup (props: PaginationProps, { emit }) {
    const { count, page } = toRefs(props)
    const pagesCount = computed(() => Math.ceil(count.value / limit))
    const isActive = (index: number) => page.value === index
    const onPageChange = (index: number) => emit('page-change', index)

    return {
      pagesCount,
      isActive,
      onPageChange,
    }
  },
})

</script>
