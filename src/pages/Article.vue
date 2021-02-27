<template>
  <div class="article-page">
    <Suspense>
      <template #default>
        <ArticleDetail />
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
            <ArticleDetailComments />
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
import ArticleDetail from 'src/components/ArticleDetail.vue'
import ArticleDetailComments from 'src/components/ArticleDetailComments.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticlePage',
  components: {
    ArticleDetail,
    ArticleDetailComments,
  },
})
</script>
