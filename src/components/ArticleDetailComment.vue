<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>

    <div class="card-footer">
      <AppLink
        class="comment-author"
        name="profile"
        :params="{ username: comment.author.username }"
      >
        <img
          class="comment-author-img"
          :alt="comment.author.username"
          :src="comment.author.image"
        >
      </AppLink>

      &nbsp;

      <AppLink
        class="comment-author"
        name="profile"
        :params="{ username: comment.author.username }"
      >
        {{ comment.author.username }}
      </AppLink>

      <span class="date-posted">{{ (new Date(comment.createdAt)).toLocaleDateString('en-US') }}</span>

      <span class="mod-options">
        <i
          v-if="showRemove"
          class="ion-trash-a"
          role="button"
          aria-label="Delete comment"
          tabindex="0"
          @click="emit('remove-comment')"
          @keypress.enter="emit('remove-comment')"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Comment } from 'src/services/api'

interface Props {
  comment: Comment
  username?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'remove-comment'): boolean
}>()

const showRemove = computed(() => props.username !== undefined && props.username === props.comment.author.username)
</script>
