<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <ArticleMeta
          :article="article"
          @update="onUpdateArticle"
        />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <!-- eslint-disable vue/no-v-html  -->
        <div
          class="col-md-12"
          v-html="articleHandledBody"
        />
        <!-- eslint-enable vue/no-v-html  -->
        <ul class="tag-list">
          <li
            v-for="tag in article.tagList"
            :key="tag"
            class="tag-default tag-pill tag-outline"
          >
            {{ tag }}
          </li>
        </ul>
      </div>

      <hr>

      <div class="article-actions">
        <ArticleMeta
          :article="article"
          @update="onUpdateArticle"
        />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleCommentForm
            :article-slug="slug"
            @add-comment="addComment"
          />

          <ArticleComment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :username="username"
            @remove-comment="removeComment(comment.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DOMPurify from 'dompurify'
import md2html from 'marked'
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ArticleComment from '../components/ArticleComment.vue'
import ArticleCommentForm from '../components/ArticleCommentForm.vue'

import ArticleMeta from '../components/ArticleMeta.vue'
import { getCommentsByArticle } from '../services/comment/getComments'
import { deleteComment } from '../services/comment/postComment'

import { getArticle } from '../services/article/getArticle'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Article',
  components: {
    ArticleMeta,
    ArticleComment,
    ArticleCommentForm,
  },
  setup () {
    const route = useRoute()
    const slug = route.params.slug as string
    const store = useStore()
    const username = computed(() => store.state.user?.username)
    const article = reactive<Article>({} as Article)
    const comments = ref<ArticleComment[]>([])

    watchEffect(async () => {
      const articleData = await getArticle(slug)
      Object.assign(article, articleData)

      comments.value = await getCommentsByArticle(slug)
    })

    const articleHandledBody = computed(
      () => !article.body ? '' : md2html(article.body, { sanitizer: DOMPurify.sanitize }),
    )

    const onUpdateArticle = (newArticle: Article) => {
      Object.assign(article, newArticle)
    }

    const addComment = async (comment: ArticleComment) => {
      comments.value.unshift(comment)
    }

    const removeComment = async (commentId: number) => {
      await deleteComment(slug, commentId)
      comments.value = comments.value.filter(c => c.id !== commentId)
    }

    return {
      article,
      articleHandledBody,
      comments,
      slug,
      username,
      addComment,
      removeComment,
      onUpdateArticle,
    }
  },
})
</script>
