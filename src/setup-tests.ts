import '@testing-library/jest-dom/vitest'

// Node 22+ ships a built-in localStorage that lacks getItem/setItem/removeItem
// when --localstorage-file is not set, which overrides happy-dom's implementation.
// Polyfill it so tests work on Node 22+.
if (typeof localStorage !== 'undefined' && typeof localStorage.getItem !== 'function') {
  const store = new Map<string, string>()
  const storage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, String(value)),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    get length() { return store.size },
    key: (index: number) => [...store.keys()][index] ?? null,
  }
  Object.defineProperty(globalThis, 'localStorage', { value: storage, writable: true })
  Object.defineProperty(globalThis, 'localStorage', { value: storage, writable: true })
}

// https://github.com/mswjs/msw/issues/1415#issuecomment-1650562700
location.href = 'https://api.realworld.show/'
