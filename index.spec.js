const shapify = require('./index')

describe('shapify', () => {
  it('renames properties', () => {
    expect(shapify({ a: 'b' }, { b: 'foo' })).toEqual({ a: 'foo' })
  })

  it('skips non used properties by default', () => {
    expect(shapify({ a: 'b' }, { b: 'foo', other: true })).toEqual({ a: 'foo' })
  })

  it('invokes functions to map values', () => {
    expect(shapify({ a: ({ n }) => n * 2 }, { n: 2 })).toEqual({ a: 4 })
  })

  it('can read Symbols from object', () => {
    const s = Symbol('s')
    expect(shapify({ a: s }, { [s]: true })).toEqual({ a: true })
  })

  it('can create Symbol keys', () => {
    const s = Symbol('s')
    expect(shapify({ [s]: 'a' }, { a: true })).toEqual({ [s]: true })
  })

  it('maps function from symbols too', () => {
    const s = Symbol('s')
    expect(shapify({ [s]: ({ n }) => n * 2 }, { n: 3 })).toEqual({ [s]: 6 })
  })
})