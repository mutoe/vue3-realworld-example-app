<template>
  <teleport to="body">
    <div class="toaster">
      <div
        v-for="t in list"
        :key="t.id"
        class="toast"
        :class="t.type"
      >
        {{ t.message }}
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { type ToastPayload, bus } from './bus'

type Toast = { id: number } & Required<ToastPayload>
const list = reactive<Toast[]>([])
let idc = 1

function push(p: ToastPayload) {
  const t: Toast = {
    id: idc++,
    type: p.type ?? 'info',
    message: p.message,
    duration: p.duration ?? 2500,
  }
  list.push(t)
  setTimeout(() => remove(t.id), t.duration)
}
function remove(id: number) {
  const i = list.findIndex(x => x.id === id)
  if (i >= 0)
    list.splice(i, 1)
}

onMounted(() => {
  bus.on<ToastPayload>('toast', push)
})
</script>

<style scoped>
.toaster{
  position: fixed; right: 16px; bottom: 16px; z-index: 5000;
  display:flex; flex-direction:column; gap:8px;
}
.toast{
  min-width: 220px;
  background:#0ea5e9; color:#fff; padding:10px 12px; border-radius:10px;
  box-shadow: 0 8px 30px rgba(2,6,23,.25);
  border:1px solid rgba(255,255,255,.12);
}
.toast.success{ background:#16a34a; }
.toast.error{ background:#ef4444; }
.toast.info{ background:#0ea5e9; }
@media (prefers-color-scheme: dark){
  .toast{ border-color:rgba(255,255,255,.08); }
}
</style>
