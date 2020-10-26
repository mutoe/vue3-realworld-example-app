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
        class="form-control"
        placeholder="Write a comment..."
        rows="3"
      />
    </div>
    <div class="card-footer">
      <img
        :src="profile.image"
        class="comment-author-img"
      >
      <button
        type="submit"
        :disabled="comment===''"
        class="btn btn-sm btn-primary"
      >
        Post Comment
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

import { useProfile } from '../services/profile/getProfile'
import { postComment } from '../services/comment/postComment'

export default defineComponent({
  name: 'ArticleCommentForm',
  props: {
    articleSlug: { type: String, required: true },
  },
  emits: {
    'add-comment': (comment: ArticleComment) => !!comment.id,
  },
  setup (props, { emit }) {
    const store = useStore()
    const user = computed<User | null>(() => store.state.user)

    let profile
    if (user.value !== null) {
      profile = useProfile(user.value.username).profile
    }

    const comment = ref('')

    async function submitComment () {
      const newComment: ArticleComment = await postComment(props.articleSlug, comment.value)
      emit('add-comment', newComment)
      comment.value = ''
    }

    return {
      profile,
      comment,
      submitComment,
    }
  },
})
</script>
