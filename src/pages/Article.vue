<template>
  <div class="article-page">
    <Suspense>
      <template #default>
        <Article />
      </template>
      <template #fallback>
        <div class="container page">
          Article is downloading...
        </div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <ArticleComments />
          </div>
        </div>
      </template>
      <template #fallback>
        <div class="container page">
          Comments are downloading...
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Article from '../components/Article/index.vue'
import ArticleComments from '../components/Article/Comments/index.vue'

export default defineComponent({
  name: 'ArticlePage',
  components: {
    Article,
    ArticleComments,
  },
})
</script>
