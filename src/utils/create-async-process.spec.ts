import { isRef } from 'vue'
import createAsyncProcess from './create-async-process'

describe('# Create async process', function () {
  const someProcess = (): Promise<null> => Promise.resolve(null)

  it('should expect active as Vue Ref type', function () {
    const { active } = createAsyncProcess(someProcess)

    expect(isRef(active)).toBe(true)
  })

  it('should correctly test active functionality', async function () {
    const { active, run } = createAsyncProcess(someProcess)

    expect(active.value).toBe(false)

    const promise = run()

    expect(active.value).toBe(true)

    await promise

    expect(active.value).toBe(false)
  })

  it('should expect run as a function', function () {
    const { run } = createAsyncProcess(someProcess)

    expect(run).toBeInstanceOf(Function)
  })

  it('should expect original function called with correct params and return correct data', async function () {
    const someProcess = jest.fn().mockImplementation(a => Promise.resolve({ a, b: null }))
    const { run } = createAsyncProcess(someProcess)

    const result = await run(null)

    expect(someProcess).toBeCalledWith(null)
    expect(result).toEqual({ a: null, b: null })
  })
})
