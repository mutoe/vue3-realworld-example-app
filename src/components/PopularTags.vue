<template>
  <p>Popular Tags</p>

  <div class="tag-list">
    <div v-if="tagsDownloading">
      Tags are downloading...
    </div>
    <template v-else>
      <AppLink
        v-for="tag in tags"
        :key="tag"
        name="tag"
        :params="{tag}"
        class="tag-pill tag-default"
      >
        {{ tag }}
      </AppLink>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTags } from '../services/tag/getTags'

export default defineComponent({
  name: 'PopularTags',
  setup () {
    const { tags, tagsDownloading } = useTags()

    return {
      tagsDownloading,
      tags,
    }
  },
})
</script>
