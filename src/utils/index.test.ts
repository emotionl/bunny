import type { Note } from '../types'
import { describe, expect, it } from 'vitest'
import { getKeyIndex } from './index'

describe('utils', () => {
  describe('getKeyIndex', () => {
    it('should return correct index for natural notes', () => {
      expect(getKeyIndex('C')).toBe(0)
      expect(getKeyIndex('D')).toBe(2)
      expect(getKeyIndex('E')).toBe(4)
      expect(getKeyIndex('F')).toBe(5)
      expect(getKeyIndex('G')).toBe(7)
      expect(getKeyIndex('A')).toBe(9)
      expect(getKeyIndex('B')).toBe(11)
    })

    it('should return correct index for sharp notes', () => {
      expect(getKeyIndex('C♯')).toBe(1)
      expect(getKeyIndex('D♯')).toBe(3)
      expect(getKeyIndex('F♯')).toBe(6)
      expect(getKeyIndex('G♯')).toBe(8)
      expect(getKeyIndex('A♯')).toBe(10)
    })

    it('should return correct index for flat notes', () => {
      expect(getKeyIndex('D♭')).toBe(1)
      expect(getKeyIndex('E♭')).toBe(3)
      expect(getKeyIndex('G♭')).toBe(6)
      expect(getKeyIndex('A♭')).toBe(8)
      expect(getKeyIndex('B♭')).toBe(10)
    })

    it('should handle enharmonic equivalents correctly', () => {
      // C♯ and D♭ should return the same index
      expect(getKeyIndex('C♯')).toBe(getKeyIndex('D♭'))
      expect(getKeyIndex('D♯')).toBe(getKeyIndex('E♭'))
      expect(getKeyIndex('F♯')).toBe(getKeyIndex('G♭'))
      expect(getKeyIndex('G♯')).toBe(getKeyIndex('A♭'))
      expect(getKeyIndex('A♯')).toBe(getKeyIndex('B♭'))
    })

    it('should return the same index as the array position', () => {
      const expectedIndexes = [
        { note: 'C' as Note, index: 0 },
        { note: 'C♯' as Note, index: 1 },
        { note: 'D♭' as Note, index: 1 },
        { note: 'D' as Note, index: 2 },
        { note: 'D♯' as Note, index: 3 },
        { note: 'E♭' as Note, index: 3 },
        { note: 'E' as Note, index: 4 },
        { note: 'F' as Note, index: 5 },
        { note: 'F♯' as Note, index: 6 },
        { note: 'G♭' as Note, index: 6 },
        { note: 'G' as Note, index: 7 },
        { note: 'G♯' as Note, index: 8 },
        { note: 'A♭' as Note, index: 8 },
        { note: 'A' as Note, index: 9 },
        { note: 'A♯' as Note, index: 10 },
        { note: 'B♭' as Note, index: 10 },
        { note: 'B' as Note, index: 11 },
      ]

      expectedIndexes.forEach(({ note, index }) => {
        expect(getKeyIndex(note)).toBe(index)
      })
    })

    it('should work with all valid Note types', () => {
      const allNotes: Note[] = [
        'C',
        'D',
        'E',
        'F',
        'G',
        'A',
        'B',
        'F♯',
        'C♯',
        'G♯',
        'D♯',
        'A♯',
        'B♭',
        'E♭',
        'A♭',
        'D♭',
        'G♭',
      ]

      allNotes.forEach((note) => {
        const index = getKeyIndex(note)
        expect(index).toBeGreaterThanOrEqual(0)
        expect(index).toBeLessThanOrEqual(11)
        expect(Number.isInteger(index)).toBe(true)
      })
    })

    it('should return valid chromatic indexes', () => {
      const allNotes: Note[] = [
        'C',
        'D',
        'E',
        'F',
        'G',
        'A',
        'B',
        'F♯',
        'C♯',
        'G♯',
        'D♯',
        'A♯',
        'B♭',
        'E♭',
        'A♭',
        'D♭',
        'G♭',
      ]

      const foundIndexes = new Set<number>()

      allNotes.forEach((note) => {
        const index = getKeyIndex(note)
        foundIndexes.add(index)
      })

      // Should cover all 12 chromatic positions
      expect(foundIndexes.size).toBe(12)

      // Should include all indexes from 0 to 11
      for (let i = 0; i < 12; i++) {
        expect(foundIndexes.has(i)).toBe(true)
      }
    })

    it('should maintain consistency across multiple calls', () => {
      const testNotes: Note[] = ['C', 'F♯', 'B♭', 'G♯', 'E']

      testNotes.forEach((note) => {
        const index1 = getKeyIndex(note)
        const index2 = getKeyIndex(note)
        const index3 = getKeyIndex(note)

        expect(index1).toBe(index2)
        expect(index2).toBe(index3)
      })
    })

    it('should handle edge case with enharmonic notes in different contexts', () => {
      // Test that both spellings of the same pitch return the same index
      const enharmonicPairs: Array<[Note, Note]> = [
        ['C♯', 'D♭'],
        ['D♯', 'E♭'],
        ['F♯', 'G♭'],
        ['G♯', 'A♭'],
        ['A♯', 'B♭'],
      ]

      enharmonicPairs.forEach(([sharp, flat]) => {
        expect(getKeyIndex(sharp)).toBe(getKeyIndex(flat))
      })
    })

    it('should match the NOTE_LIST array structure', () => {
      // This test ensures getKeyIndex works correctly with the NOTE_LIST constant
      // Natural notes should be at specific positions
      expect(getKeyIndex('C')).toBe(0) // NOTE_LIST[0] = 'C'
      expect(getKeyIndex('D')).toBe(2) // NOTE_LIST[2] = 'D'
      expect(getKeyIndex('E')).toBe(4) // NOTE_LIST[4] = 'E'
      expect(getKeyIndex('F')).toBe(5) // NOTE_LIST[5] = 'F'
      expect(getKeyIndex('G')).toBe(7) // NOTE_LIST[7] = 'G'
      expect(getKeyIndex('A')).toBe(9) // NOTE_LIST[9] = 'A'
      expect(getKeyIndex('B')).toBe(11) // NOTE_LIST[11] = 'B'

      // Enharmonic notes should be at specific positions
      expect(getKeyIndex('C♯')).toBe(1) // NOTE_LIST[1] = ['C♯', 'D♭']
      expect(getKeyIndex('D♭')).toBe(1) // NOTE_LIST[1] = ['C♯', 'D♭']
      expect(getKeyIndex('F♯')).toBe(6) // NOTE_LIST[6] = ['F♯', 'G♭']
      expect(getKeyIndex('G♭')).toBe(6) // NOTE_LIST[6] = ['F♯', 'G♭']
    })
  })
})
