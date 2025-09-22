<template>
  <section class="revs">
    <header class="revs__header">
      <h2>Revision History</h2>
      <span v-if="!loading && revisions.length" class="pill">
        {{ revisions.length }} revisions
      </span>
    </header>

    <div v-if="loading" class="state muted">Loading history…</div>

    <div v-else-if="error" class="state error" role="alert">
      {{ error }}
    </div>

    <div v-else-if="!revisions.length" class="state muted">
      No revisions yet.
    </div>

    <ul v-else class="revs__list">
      <li v-for="rev in revisions" :key="rev.id" class="rev">
        <div class="rev__head">
          <div class="rev__title">
            <span class="hash">#{{ rev.id }}</span>
            <strong>{{ rev.title }}</strong>
          </div>

          <button
            v-if="canRevert"
            class="btn btn-sm btn-outline-danger"
            :disabled="revertingId === rev.id"
            :title="revertingId === rev.id ? 'Reverting…' : 'Revert to this revision'"
            @click="handleRevert(rev.id)"
          >
            <i class="ion-refresh mr-6" />
            {{ revertingId === rev.id ? 'Reverting…' : 'Revert' }}
          </button>
        </div>

        <div class="rev__meta">
          <span class="chip" :title="rev.slug">
            <i class="ion-link mr-4" aria-hidden="true" /> {{ rev.slug }}
          </span>

          <time
            class="chip"
            :datetime="rev.created_at"
            :title="formatShortDate(rev.created_at)"
          >
            <i class="ion-clock mr-4" aria-hidden="true" />
            {{ formatShortDate(rev.created_at) }}
            <span class="muted"> ({{ relative(rev.created_at) }})</span>
          </time>
        </div>

        <div v-if="rev.description" class="rev__desc muted">
          {{ rev.description }}
        </div>

        <div class="rev__body">
          {{ rev.body }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { api } from 'src/services'
import type { Article } from 'src/services/api'
import { bus } from 'src/ui/bus'

const props = defineProps<{ articleId: number, canRevert?: boolean }>()
const emit = defineEmits<{ (e: 'reverted', article: Article): void }>()

interface Revision {
  id: number
  title: string
  slug: string
  description: string
  body: string
  created_at: string
}

const loading = ref(true)
const error = ref<string | null>(null)
const revisions = ref<Revision[]>([])
const revertingId = ref<number | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await api.articles.getArticleRevisions(props.articleId)
    revisions.value = res.data.data.revisions
  }
  catch (error_: any) {
    error.value = error_?.message ?? 'Failed to load history'
    bus.emit('toast', { type: 'error', message: 'Failed to load history' })
  }
  finally {
    loading.value = false
  }
}

function askConfirm(message: string, confirmText = 'OK', cancelText = 'Cancel'): Promise<boolean> {
  return new Promise(resolve => {
    bus.emit('confirm', {
      message,
      confirmText,
      cancelText,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })
}

async function handleRevert(revId: number) {
  if (!props.canRevert || revertingId.value)
    return

  const ok = await askConfirm('Revert the article to this revision?', 'Revert', 'Cancel')
  if (!ok) {
    bus.emit('toast', { type: 'info', message: 'Revert cancelled' })
    return
  }

  try {
    revertingId.value = revId
    const res = await api.articles.revertArticleRevision(props.articleId, revId)
    bus.emit('toast', { type: 'success', message: `Reverted to revision #${revId}` })
    emit('reverted', res.data.article)

    load()
  }
  catch (error_: any) {
    const msg = error_?.message ?? 'Failed to revert'
    error.value = msg
    bus.emit('toast', { type: 'error', message: msg })
  }
  finally {
    revertingId.value = null
  }
}

function formatShortDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
function relative(iso: string): string {
  const now = new Date()
  const then = new Date(iso)
  const sec = Math.round((then.getTime() - now.getTime()) / 1000)
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
  const ranges = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ] as const
  for (const [unit, secondsInUnit] of ranges) {
    if (Math.abs(sec) >= secondsInUnit || unit === 'second')
      return rtf.format(Math.round(sec / secondsInUnit), unit as Intl.RelativeTimeFormatUnit)
  }
  return ''
}

onMounted(load)
watch(() => props.articleId, load)
</script>

<style scoped>
.revs{ margin-top: 28px; }
.revs__header{
  display:flex; align-items:center; gap:10px; margin-bottom:10px;
}
.revs__header h2{
  font-size:1.1rem; font-weight:700; margin:0;
}
.pill{
  font-size:.78rem; padding:4px 10px; border-radius:999px;
  background:#f1f5f9; color:#475569; border:1px solid #e2e8f0;
}

.state{ padding:10px 0; }
.state.muted{ color:#6b7280; }
.state.error{
  color:#b91c1c; background:#fff1f2; border:1px solid #fecaca;
  padding:10px 12px; border-radius:10px;
}

.revs__list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:14px; }
.rev{
  padding:14px 16px;
  background:#fff; border:1px solid rgba(0,0,0,.06); border-radius:14px;
  box-shadow:0 4px 14px rgba(0,0,0,.04);
}
.rev__head{
  display:flex; justify-content:space-between; align-items:center; gap:12px;
}
.rev__title{ display:flex; align-items:center; gap:8px; min-width:0; }
.hash{
  font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  color:#64748b; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:6px; padding:1px 6px;
}
.rev__meta{
  display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;
}
.chip{
  font-size:.85rem; background:#f8fafc; color:#475569; border:1px solid #eef2f7;
  padding:3px 8px; border-radius:999px; display:inline-flex; align-items:center; gap:6px;
}
.muted{ color:#6b7280; }

.rev__desc{ margin-top:8px; }
.rev__body{ margin-top:6px; color:#111827; }

.btn{ padding:6px 10px; border-radius:8px; border:1px solid #e5e7eb; cursor:pointer; background:#fff; }
.btn-sm{ font-size:.88rem; }
.btn-outline-danger{ color:#b91c1c; border-color:#fecaca; }
.btn-outline-danger:hover{ background:#fff1f2; }
.btn:disabled{ opacity:.6; cursor:not-allowed; }

.mr-6{ margin-right:6px; }
.mr-4{ margin-right:4px; }

@media (prefers-color-scheme: dark){
  .rev{ background:#0f1115; border-color:#1f2937; box-shadow:none; }
  .pill{ background:#111827; border-color:#1f2937; color:#9ca3af; }
  .chip{ background:#0b1220; border-color:#1f2937; color:#9ca3af; }
  .hash{ background:#0b1220; border-color:#1f2937; color:#93a4b4; }
  .muted{ color:#9ca3af; }
  .btn{ background:#0f1115; border-color:#374151; color:#e5e7eb; }
  .btn-outline-danger{ color:#fca5a5; border-color:#7f1d1d; }
  .btn-outline-danger:hover{ background:#2b0f12; }
  .state.error{ background:#2b0f12; border-color:#7f1d1d; color:#fecaca; }
}

@media (max-width: 640px){
  .rev__head{ align-items:flex-start; flex-direction:column; }
  .rev__meta{ gap:6px; }
}
</style>
