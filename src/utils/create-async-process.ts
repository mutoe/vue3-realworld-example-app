import { ref } from 'vue'

export default function createAsyncProcess<T extends (...args: any) => Promise<any>> (fn: T) {
  const active = ref<boolean>(false)

  async function run (...args : any): Promise<ReturnType<T>> {
    active.value = true
    const result = await fn(...args)
    active.value = false
    return result
  }

  return { active, run }
}
