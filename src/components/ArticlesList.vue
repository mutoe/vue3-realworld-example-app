<template>
  <section class="feed">
    <ArticlesListNavigation
      v-bind="$attrs"
      :tag="tag"
      :username="username"
      class="feed__nav"
    />

    <div v-if="articlesDownloading" class="cards">
      <div v-for="n in 3" :key="n" class="card skeleton">
        <div class="skeleton__header">
          <div class="skeleton__avatar" />
          <div class="skeleton__lines">
            <div class="skeleton__line w-60" />
            <div class="skeleton__line w-40 mt-6" />
          </div>
        </div>
        <div class="skeleton__line w-90 mt-14" />
        <div class="skeleton__line w-80 mt-8" />
        <div class="skeleton__tags mt-14">
          <span v-for="i in 3" :key="i" class="skeleton__tag" />
        </div>
      </div>
    </div>

    <div v-else-if="articles.length === 0" class="empty">
      <div class="empty__icon">🗞️</div>
      <h3 class="empty__title">No articles yet</h3>
      <p class="empty__sub">Try switching tabs or create your first post.</p>
    </div>

    <div v-else class="cards">
      <article
        v-for="(article, index) in articles"
        :key="article.slug"
        class="card"
      >
        <ArticlesListArticlePreview
          :article="article"
          @update="newArticle => updateArticle(index, newArticle)"
        />
      </article>

      <div class="cards__pagination">
        <AppPagination
          :count="articlesCount"
          :page="page"
          @page-change="changePage"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useArticles } from 'src/composable/useArticles'
import AppPagination from './AppPagination.vue'
import ArticlesListArticlePreview from './ArticlesListArticlePreview.vue'
import ArticlesListNavigation from './ArticlesListNavigation.vue'

const {
  fetchArticles,
  articlesDownloading,
  articlesCount,
  articles,
  updateArticle,
  page,
  changePage,
  tag,
  username,
} = useArticles()

await fetchArticles()
</script>

<style scoped>
.feed{
  display: grid;
  gap: 16px;
}
.feed__nav{
  position: sticky;
  top: 0;
  z-index: 5;
  background: var(--bg, #fff);
}

.cards{
  display: grid;
  gap: 14px;
}
.card{
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 4px 14px rgba(0,0,0,.04);
  padding: 14px 16px;
  transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
}
.card:hover{
  transform: translateY(-1px);
  border-color: rgba(0,0,0,.10);
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
}

.cards__pagination{
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.empty{
  border: 1px dashed #e2e8f0;
  border-radius: 14px;
  text-align: center;
  padding: 32px 16px;
  background: #fff;
  color: #475569;
}
.empty__icon{
  font-size: 28px;
  line-height: 1;
  margin-bottom: 8px;
}
.empty__title{
  margin: 0 0 4px;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1f2937;
}
.empty__sub{
  margin: 0;
  color: #6b7280;
}

.skeleton{
  overflow: hidden;
  position: relative;
}
.skeleton::after{
  content:"";
  position:absolute; inset:0;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%,
    rgba(255,255,255,.6) 50%, rgba(255,255,255,0) 100%);
  transform: translateX(-100%);
  animation: shimmer 1.35s infinite;
  pointer-events: none;
}
@keyframes shimmer{ 100% { transform: translateX(100%); } }

.skeleton__header{
  display:flex; gap:12px; align-items:center;
}
.skeleton__avatar{
  width:40px; height:40px; border-radius:50%;
  background: #eaeef4;
}
.skeleton__lines{ flex:1; }
.skeleton__line{
  height:10px; border-radius:8px; background:#eaeef4;
}
.mt-6{ margin-top:6px; }
.mt-8{ margin-top:8px; }
.mt-14{ margin-top:14px; }
.w-40{ width:40%; }
.w-60{ width:60%; }
.w-80{ width:80%; }
.w-90{ width:90%; }

.skeleton__tags{
  display:flex; gap:8px; flex-wrap:wrap;
}
.skeleton__tag{
  width:64px; height:22px; border-radius:999px; background:#eaeef4;
}

@media (prefers-color-scheme: dark){
  :root{ --bg:#0f1115; }
  .card{ background:#0f1115; border-color:#1f2937; box-shadow:none; }
  .card:hover{ border-color:#2b3545; box-shadow:none; }
  .empty{ background:#0f1115; border-color:#263244; color:#9ca3af; }
  .empty__title{ color:#e5e7eb; }
  .skeleton__avatar,
  .skeleton__line,
  .skeleton__tag{ background:#1a2432; }
  .skeleton::after{
    background: linear-gradient(90deg, rgba(15,17,21,0) 0%,
    rgba(255,255,255,.08) 50%, rgba(15,17,21,0) 100%);
  }
}

@media (min-width: 768px){
  .cards{
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1100px){
  .cards{
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
