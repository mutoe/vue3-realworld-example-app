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

<script setup lang="ts">
import { useProfile } from 'src/composable/useProfile'
import { postComment } from 'src/services/comment/postComment'
import { checkAuthorization, user } from 'src/store/user'
import { computed, ref } from 'vue'

interface Props {
  articleSlug: string
}
interface Emits {
  (e: 'add-comment', comment: ArticleComment): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const username = computed(() => checkAuthorization(user) ? user.value.username : '')
const { profile } = useProfile({ username })

const comment = ref('')

const submitComment = async () => {
  const newComment = await postComment(props.articleSlug, comment.value)
  emit('add-comment', newComment)
  comment.value = ''
}

</script>
