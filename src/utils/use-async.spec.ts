import { isRef } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import useAsync from 'src/utils/use-async'

describe('# Create async process', () => {
  const someProcess = (): Promise<null> => Promise.resolve(null)

  it('should expect active as Vue Ref type', () => {
    const { active } = useAsync(someProcess)

    expect(isRef(active)).toBe(true)
  })

  it('should correctly test active functionality', async () => {
    const { active, run } = useAsync(someProcess)

    expect(active.value).toBe(false)

    const promise = run()

    expect(active.value).toBe(true)

    await promise

    expect(active.value).toBe(false)
  })

  it('should expect run as a function', () => {
    const { run } = useAsync(someProcess)

    expect(run).toBeInstanceOf(Function)
  })

  it('should expect original function called with correct params and return correct data', async () => {
    const someProcess = vi.fn().mockResolvedValue({ a: 1, b: null })
    const { run } = useAsync(someProcess)

    const result = await run(null)
    expect(result).toEqual({ a: 1, b: null })
    expect(someProcess).toBeCalledWith(null)
  })
})
