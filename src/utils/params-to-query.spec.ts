import { describe, it, expect } from 'vitest'
import params2query from './params-to-query'

describe('# params2query', () => {
  it('should return query string given an object', () => {
    const params = {
      foo: 'bar',
      foo2: 'bar2',
    }

    const result = params2query(params)

    expect(result).toEqual('foo=bar&foo2=bar2')
  })
})
