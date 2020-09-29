export default function parseStorageGet (key: string) {
  try {
    const value = localStorage.getItem(key) || ''
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}
