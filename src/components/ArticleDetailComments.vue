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
import { storeToRefs } from 'pinia'
import { api } from 'src/services'
import type { Comment } from 'src/services/api'
import { useUserStore } from 'src/store/user'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetailComment from './ArticleDetailComment.vue'
import ArticleDetailCommentsForm from './ArticleDetailCommentsForm.vue'

const route = useRoute()
const slug = route.params.slug as string

const { user } = storeToRefs(useUserStore())

const username = computed(() => user.value?.username)

const comments = ref<Comment[]>([])

const addComment = async (comment: Comment) => {
  comments.value.unshift(comment)
}

const removeComment = async (commentId: number) => {
  await api.articles.deleteArticleComment(slug, commentId)
  comments.value = comments.value.filter(c => c.id !== commentId)
}

comments.value = await api.articles.getArticleComments(slug).then(res => res.data.comments)

</script>
