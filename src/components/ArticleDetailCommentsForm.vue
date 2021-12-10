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

<script lang="ts" setup>
import { useProfile } from 'src/composable/useProfile'
import { postComment } from 'src/services/comment/postComment'
import { checkAuthorization, user } from 'src/store/user'

const props = defineProps<{
  articleSlug: string
}>()

const emit = defineEmits<{
  (e: 'add-comment', comment: ArticleComment): void
}>()

let username = $computed(() => checkAuthorization(user) ? user.value.username : '')
const { profile } = useProfile({ username: $$(username) })

let comment = $ref('')

const submitComment = async () => {
  const newComment = await postComment(props.articleSlug, comment)
  emit('add-comment', newComment)
  comment = ''
}
</script>
