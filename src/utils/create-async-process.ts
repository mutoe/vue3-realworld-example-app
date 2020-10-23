import { ref } from 'vue'

export default function createAsyncProcess<T extends (...args: any[]) => any> (fn: T) {
  const active = ref<boolean>(false)

  async function run (...args : Parameters<T>): Promise<ReturnType<T>> {
    active.value = true
    const result = await fn(...args)
    active.value = false
    return result
  }

  return { active, run }
}
