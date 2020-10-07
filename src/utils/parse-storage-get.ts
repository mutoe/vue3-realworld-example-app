export default function parseStorageGet<T = any> (key: string): T | null {
  try {
    const value = localStorage.getItem(key) || ''
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}
