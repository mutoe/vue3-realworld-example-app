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

<script setup lang="ts">
import { getCommentsByArticle } from 'src/services/comment/getComments'
import { deleteComment } from 'src/services/comment/postComment'
import { user } from 'src/store/user'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetailComment from './ArticleDetailComment.vue'
import ArticleDetailCommentsForm from './ArticleDetailCommentsForm.vue'

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

</script>
