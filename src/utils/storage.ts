function get<T> (key: string): T | null {
  try {
    const value = localStorage.getItem(key) ?? ''
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

function set <T> (key: string, value: T): void {
  const strValue = JSON.stringify(value)
  localStorage.setItem(key, strValue)
}

function remove (key: string): void {
  localStorage.removeItem(key)
}

export default {
  get,
  set,
  remove,
}
