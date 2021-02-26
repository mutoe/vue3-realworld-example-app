<template>
  <ArticleDetailCommentsForm
    :article-slug="slug"
    @add-comment="addComment"
  />

  <ArticleDetailComment
    v-for="comment in comments"
    :key="comment.id"
    :comment="comment"
    :username="username"
    @remove-comment="() => removeComment(comment.id)"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import ArticleDetailCommentsForm from './ArticleDetailCommentsForm.vue'
import ArticleDetailComment from './ArticleDetailComment.vue'

import { getCommentsByArticle } from '../services/comment/getComments'
import { deleteComment } from '../services/comment/postComment'

import { user } from '../store/user'

export default defineComponent({
  name: 'ArticleDetailComments',
  components: {
    ArticleDetailCommentsForm,
    ArticleDetailComment,
  },
  async setup () {
    const route = useRoute()
    const slug = route.params.slug as string

    const username = computed(() => user.value?.username)

    const comments = ref<ArticleComment[]>([])

    const addComment = async (comment: ArticleComment) => {
      comments.value.unshift(comment)
    }

    const removeComment = async (commentId: number) => {
      await deleteComment(slug, commentId)
      comments.value = comments.value.filter(c => c.id !== commentId)
    }

    comments.value = await getCommentsByArticle(slug)

    return {
      comments,
      slug,
      username,
      addComment,
      removeComment,
    }
  },
})
</script>
