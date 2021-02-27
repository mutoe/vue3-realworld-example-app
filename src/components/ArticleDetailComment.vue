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

<script lang="ts" setup>
import { computed, defineEmit, defineProps } from 'vue'

const props = defineProps<{
  comment: ArticleComment
  username?: string
}>()

const emit = defineEmit<(e: 'remove-comment') => boolean>()

const showRemove = computed(() => (
  props.username !== undefined && props.username === props.comment.author.username
))
</script>
