<template>
  <div class="article-page">
    <Suspense>
      <ArticleDetail />
      <template #fallback>
        <div class="container page">
          Article is downloading...
        </div>
      </template>
    </Suspense>

    <Suspense>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleDetailComments />
        </div>
      </div>
      <template #fallback>
        <div class="container page">
          Comments are downloading...
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import ArticleDetail from 'src/components/ArticleDetail.vue'
import ArticleDetailComments from 'src/components/ArticleDetailComments.vue'
</script>

<style scoped>
.row{
  margin-right: 0;
}
</style>
