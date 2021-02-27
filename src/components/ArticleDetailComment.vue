<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>

    <div class="card-footer">
      <AppLink
        name="profile"
        :params="{username: comment.author.username}"
        class="comment-author"
      >
        <img
          :src="comment.author.image"
          class="comment-author-img"
        >
      </AppLink>

      &nbsp;

      <AppLink
        name="profile"
        :params="{username: comment.author.username}"
        class="comment-author"
      >
        {{ comment.author.username }}
      </AppLink>

      <span class="date-posted">{{ (new Date(comment.createdAt)).toLocaleDateString() }}</span>

      <span class="mod-options">
        <i
          v-if="showRemove"
          role="button"
          aria-label="Delete comment"
          class="ion-trash-a"
          @click="$emit('remove-comment')"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ArticleDetailComment',
  props: {
    comment: { type: Object as PropType<ArticleComment>, required: true },
    username: { type: String as PropType<string | undefined>, default: undefined },
  },
  emits: {
    'remove-comment': () => true,
  },
  setup (props) {
    return {
      showRemove: computed(() => (
        props.username !== undefined && props.username === props.comment.author.username
      )),
    }
  },
})
</script>
