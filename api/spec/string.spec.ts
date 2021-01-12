import { isMaxLength, isMinLength } from '../lib/string'

describe('string utils', () => {
  describe('isMinLength', () => {
    it('should return true if given string is within limits', () => {
      const str = 'abc'

      const result = isMinLength(2)(str)

      expect(result).toBe(true)
    })

    it('should return false if given string does not meet minimum length', () => {
      const str = 'abc'

      const result = isMinLength(5)(str)

      expect(result).toBe(false)
    })
  }),

  describe('isMaxLength', () => {
    it('should return true if given string is within limits', () => {
      const str = 'abc'

      const result = isMaxLength(4)(str)

      expect(result).toBe(true)
    })

    it('should return false if given string is higher than max', () => {
      const str = 'abc'

      const result = isMaxLength(2)(str)

      expect(result).toBe(false)
    })
  })
})
