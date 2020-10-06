<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <ArticleMeta :article="article" />
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
      </div>

      <hr>

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              />
            </div>
            <div class="card-footer">
              <img
                :src="article.author?.image"
                class="comment-author-img"
              >
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <ArticleComment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import md2html from 'marked'
import DOMPurify from 'dompurify'

import { getArticle } from '../services/article/getArticle'
import { getCommentsByArticle } from '../services'

import ArticleMeta from '../components/ArticleMeta.vue'
import ArticleComment from '../components/ArticleComment.vue'

export default defineComponent({
  name: 'Article',
  components: {
    ArticleMeta,
    ArticleComment,
  },
  setup () {
    const route = useRoute()
    const slug = route.params.slug as string
    const article = reactive<Article>({} as Article)
    const comments = ref<ArticleComment[]>([])

    watchEffect(async () => {
      const articleData = await getArticle(slug)
      Object.assign(article, articleData)

      const commentsData = await getCommentsByArticle(slug)
      comments.value = commentsData
    })

    const articleHandledBody = computed(
      () => !article.body ? '' : md2html(article.body, { sanitizer: DOMPurify.sanitize }),
    )

    return {
      article,
      articleHandledBody,
      comments,
    }
  },
})
</script>
