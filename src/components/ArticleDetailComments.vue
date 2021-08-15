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

<script lang="ts" setup>
import { getCommentsByArticle } from 'src/services/comment/getComments'
import { deleteComment } from 'src/services/comment/postComment'
import { user } from 'src/store/user'
import { useRoute } from 'vue-router'
import ArticleDetailComment from './ArticleDetailComment.vue'
import ArticleDetailCommentsForm from './ArticleDetailCommentsForm.vue'

const route = useRoute()
const slug = route.params.slug as string

const username = $computed(() => user.value?.username)

let comments = $ref<ArticleComment[]>([])

const addComment = async (comment: ArticleComment) => {
  comments.unshift(comment)
}

const removeComment = async (commentId: number) => {
  await deleteComment(slug, commentId)
  comments = comments.filter(c => c.id !== commentId)
}

comments = await getCommentsByArticle(slug)
</script>
