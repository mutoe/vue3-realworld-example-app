<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>

    <div class="card-footer">
      <RouterLink
        :to="`/profile/${comment.author.username}`"
        class="comment-author"
      >
        <img
          :src="comment.author.image"
          class="comment-author-img"
        >
      </RouterLink>

      &nbsp;

      <RouterLink
        :to="`/profile/${comment.author.username}`"
        class="comment-author"
      >
        {{ comment.author.username }}
      </RouterLink>

      <span class="date-posted">{{ (new Date(comment.createdAt)).toLocaleDateString() }}</span>

      <span class="mod-options">
        <i class="ion-edit" />
        <i class="ion-trash-a" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ArticleMeta',
  props: {
    comment: { type: Object as PropType<ArticleComment>, required: true },
  },
})
</script>
