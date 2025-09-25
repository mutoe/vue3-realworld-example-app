<template>
  <p v-if="!profile">
    <AppLink name="login">
      Sign in
    </AppLink> or <AppLink name="register">
      sign up
    </AppLink> to add comments on this article.
  </p>
  <form
    v-else
    class="card comment-form"
    @submit.prevent="submitComment"
  >
    <div class="card-block">
      <textarea
        class="form-control"
        aria-label="Write comment"
        v-model="comment"
        placeholder="Write a comment..."
        :rows="3"
      />
    </div>
    <div class="card-footer">
      <img
        class="comment-author-img"
        :alt="profile.username"
        :src="profile.image"
      >
      <button
        type="submit"
        class="btn btn-sm btn-primary"
        aria-label="Submit"
        :disabled="comment === ''"
      >
        Post Comment
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfile } from 'src/composable/use-profile'
import { api } from 'src/services'
import type { Comment } from 'src/services/api'
import { useUserStore } from 'src/store/user'

interface Props {
  articleSlug: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'add-comment', comment: Comment): void
}>()

const { user } = storeToRefs(useUserStore())

const username = computed(() => user.value?.username ?? '')
const { profile } = useProfile({ username })

const comment = ref('')

async function submitComment() {
  const newComment = await api.articles
    .createArticleComment(props.articleSlug, { comment: { body: comment.value } })
    .then(res => res.data.comment)
  emit('add-comment', newComment)
  comment.value = ''
}
</script>
