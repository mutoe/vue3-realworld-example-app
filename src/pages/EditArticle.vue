<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="form.title"
                aria-label="Title"
                type="text"
                class="form-control form-control-lg"
                placeholder="Article Title"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.description"
                aria-label="Description"
                type="text"
                class="form-control form-control-lg"
                placeholder="What's this article about?"
              >
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="form.body"
                aria-label="Body"
                :rows="8"
                class="form-control"
                placeholder="Write your article (in markdown)"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="newTag"
                aria-label="Tags"
                type="text"
                class="form-control"
                placeholder="Enter tags"
                @change="addTag"
                @keypress.enter.prevent="addTag"
              >
              <div class="tag-list">
                <span
                  v-for="tag in form.tagList"
                  :key="tag"
                  class="tag-default tag-pill"
                >
                  <i
                    role="button"
                    tabindex="0"
                    :aria-label="`Delete tag: ${tag}`"
                    class="ion-close-round"
                    @click="removeTag(tag)"
                    @keypress.enter="removeTag(tag)"
                  />
                  {{ tag }}
                </span>
              </div>
            </fieldset>
            <button
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
              :disabled="!(form.title && form.description && form.body)"
            >
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from 'src/services'
import type { Article } from 'src/services/api'

interface FormState {
  title: string
  description: string
  body: string
  tagList: string[]
}

const route = useRoute()
const router = useRouter()
const slug = computed<string>(() => route.params.slug as string)

const form: FormState = reactive({
  title: '',
  description: '',
  body: '',
  tagList: [],
})

const newTag = ref<string>('')
function addTag() {
  form.tagList.push(newTag.value.trim())
  newTag.value = ''
}
function removeTag(tag: string) {
  form.tagList = form.tagList.filter(t => t !== tag)
}

async function fetchArticle(slug: string) {
  const article = await api.articles.getArticle(slug).then(res => res.data.article)

  // FIXME: I always feel a little wordy here
  form.title = article.title
  form.description = article.description
  form.body = article.body
  form.tagList = article.tagList
}

onMounted(async () => {
  if (slug.value)
    await fetchArticle(slug.value)
})

async function onSubmit() {
  let article: Article
  if (slug.value)
    article = await api.articles.updateArticle(slug.value, { article: form }).then(res => res.data.article)
  else
    article = await api.articles.createArticle({ article: form }).then(res => res.data.article)

  return router.push({ name: 'article', params: { slug: article.slug } })
}
</script>
