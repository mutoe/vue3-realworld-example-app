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
        v-model="comment"
        aria-label="Write comment"
        class="form-control"
        placeholder="Write a comment..."
        :rows="3"
      />
    </div>
    <div class="card-footer">
      <img
        :src="profile.image"
        class="comment-author-img"
        :alt="profile.username"
      >
      <button
        aria-label="Submit"
        type="submit"
        :disabled="comment === ''"
        class="btn btn-sm btn-primary"
      >
        Post Comment
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfile } from 'src/composable/useProfile'
import { api } from 'src/services'
import type { Comment } from 'src/services/api'
import { useUserStore } from 'src/store/user'

interface Props {
  articleSlug: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'addComment', comment: Comment): void
}>()

const { user } = storeToRefs(useUserStore())

const username = computed(() => user.value?.username ?? '')
const { profile } = useProfile({ username })

const comment = ref('')

async function submitComment() {
  const newComment = await api.articles
    .createArticleComment(props.articleSlug, { comment: { body: comment.value } })
    .then(res => res.data.comment)
  emit('addComment', newComment)
  comment.value = ''
}
</script>
