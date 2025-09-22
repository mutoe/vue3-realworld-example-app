<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import { bus, type ConfirmPayload } from './bus'

const open = ref(false)
const state = reactive<Required<ConfirmPayload>>({
  message: '',
  confirmText: 'OK',
  cancelText: 'Cancel',
  onConfirm: () => {},
  onCancel: () => {},
})

function show(p: ConfirmPayload) {
  state.message = p.message
  state.confirmText = p.confirmText ?? 'OK'
  state.cancelText = p.cancelText ?? 'Cancel'
  state.onConfirm = p.onConfirm ?? (() => {})
  state.onCancel = p.onCancel ?? (() => {})
  open.value = true
}
function close() { open.value = false }

function confirm() {
  const cb = state.onConfirm
  close()
  try { cb() } catch {}
}
function cancel() {
  const cb = state.onCancel
  close()
  try { cb() } catch {}
}

function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') cancel()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  bus.on<ConfirmPayload>('confirm', show)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="cfm__wrap" @click.self="cancel">
      <div class="cfm__box" role="dialog" aria-modal="true" aria-labelledby="cfm-title">
        <h3 id="cfm-title" class="cfm__title">Confirm</h3>
        <p class="cfm__msg">{{ state.message }}</p>
        <div class="cfm__actions">
          <button class="btn btn-light" @click="cancel">{{ state.cancelText }}</button>
          <button class="btn btn-danger" @click="confirm">{{ state.confirmText }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.cfm__wrap{
  position: fixed; inset: 0; z-index: 4000;
  display:flex; align-items:center; justify-content:center;
  background: rgba(15, 18, 28, .45);
  backdrop-filter: blur(2px);
}
.cfm__box{
  width:min(520px, 92vw);
  background:#fff; border-radius:14px; padding:18px 18px 14px;
  box-shadow: 0 20px 60px rgba(0,0,0,.2);
  border:1px solid rgba(0,0,0,.06);
}
.cfm__title{ margin:0 0 6px; font-weight:700; font-size:1.05rem; }
.cfm__msg{ margin: 0 0 16px; color:#374151; }
.cfm__actions{ display:flex; justify-content:flex-end; gap:8px; }
.btn{ padding:8px 12px; border-radius:8px; border:1px solid transparent; cursor:pointer; }
.btn-light{ background:#f3f4f6; color:#111827; border-color:#e5e7eb; }
.btn-danger{ background:#dc2626; color:#fff; }
.btn:disabled{ opacity:.6; cursor:not-allowed; }
@media (prefers-color-scheme: dark){
  .cfm__box{ background:#0f1115; border-color:#1f2937; color:#e5e7eb; }
  .cfm__msg{ color:#9ca3af; }
  .btn-light{ background:#1f2937; color:#e5e7eb; border-color:#374151; }
  .btn-danger{ background:#ef4444; color:#fff; }
}
</style>
