import type { Interval } from '../types'
import { describe, expect, it } from 'vitest'
import { getNoteListByStep } from './melody'

describe('melody', () => {
  describe('getNoteListByStep', () => {
    it('should generate correct note sequence for major seconds with sharps', () => {
      const result = getNoteListByStep('C', 'M2', 4, true)
      expect(result).toEqual(['C', 'D', 'E', 'F♯'])
    })

    it('should generate correct note sequence for major seconds with flats', () => {
      const result = getNoteListByStep('C', 'M2', 4, false)
      expect(result).toEqual(['C', 'D', 'E', 'G♭'])
    })

    it('should generate correct note sequence for perfect fifths', () => {
      const result = getNoteListByStep('C', 'P5', 5, true)
      expect(result).toEqual(['C', 'G', 'D', 'A', 'E'])
    })

    it('should generate correct note sequence for minor thirds', () => {
      const result = getNoteListByStep('C', 'm3', 4, true)
      expect(result).toEqual(['C', 'D♯', 'F♯', 'A'])
    })

    it('should handle different starting notes', () => {
      const resultFromG = getNoteListByStep('G', 'M2', 3, true)
      expect(resultFromG).toEqual(['G', 'A', 'B'])

      const resultFromF = getNoteListByStep('F', 'P4', 3, true)
      expect(resultFromF).toEqual(['F', 'A♯', 'D♯'])
    })

    it('should handle enharmonic starting notes', () => {
      const resultFromCSharp = getNoteListByStep('C♯', 'M3', 3, true)
      const resultFromDFlat = getNoteListByStep('D♭', 'M3', 3, false)

      expect(resultFromCSharp).toHaveLength(3)
      expect(resultFromDFlat).toHaveLength(3)
      expect(resultFromCSharp[0]).toBe('C♯')
      expect(resultFromDFlat[0]).toBe('D♭')
    })

    it('should cycle through octave correctly', () => {
      const result = getNoteListByStep('A', 'M2', 8, true)
      expect(result).toEqual(['A', 'B', 'C♯', 'D♯', 'F', 'G', 'A', 'B'])

      // Should contain starting note again after cycling
      expect(result[0]).toBe(result[6])
    })

    it('should handle single note request', () => {
      const result = getNoteListByStep('E', 'P5', 1, true)
      expect(result).toEqual(['E'])
    })

    it('should handle different intervals correctly', () => {
      const intervals: Array<{ interval: Interval, expected: string[] }> = [
        { interval: 'P1', expected: ['C', 'C', 'C'] },
        { interval: 'm2', expected: ['C', 'C♯', 'D'] },
        { interval: 'M3', expected: ['C', 'E', 'G♯'] },
        { interval: 'P4', expected: ['C', 'F', 'A♯'] },
        { interval: 'P8', expected: ['C', 'C', 'C'] },
      ]

      intervals.forEach(({ interval, expected }) => {
        const result = getNoteListByStep('C', interval, 3, true)
        expect(result).toEqual(expected)
      })
    })

    it('should respect sharp/flat preference for enharmonic notes', () => {
      const withSharps = getNoteListByStep('C', 'm2', 6, true)
      const withFlats = getNoteListByStep('C', 'm2', 6, false)

      // Both should have same length but different enharmonic spellings
      expect(withSharps).toHaveLength(6)
      expect(withFlats).toHaveLength(6)

      // Check that enharmonic notes are spelled differently
      const sharpsHasSharp = withSharps.some(note => note.includes('♯'))
      const flatsHasFlat = withFlats.some(note => note.includes('♭'))

      expect(sharpsHasSharp).toBe(true)
      expect(flatsHasFlat).toBe(true)
    })

    it('should handle large amounts correctly', () => {
      const result = getNoteListByStep('C', 'P5', 12, true)
      expect(result).toHaveLength(12)

      // Should cycle back to starting note
      expect(result[0]).toBe('C')
      expect(result[11]).toBe('F')
    })
  })
})
