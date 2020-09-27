<template>
  <h1>{{ props.msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script lang="ts" setup="props">
import { ref } from "vue";

declare const props: {
  msg: string
}

export const count = ref(0)
</script>
