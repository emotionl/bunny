import { describe, expect, it } from 'vitest'
import { NoteCalculator } from './note-calculator'

describe('noteCalculator', () => {
  describe('normalizeIndex', () => {
    it('should return the same index when within valid range (0-11)', () => {
      expect(NoteCalculator.normalizeIndex(0)).toBe(0)
      expect(NoteCalculator.normalizeIndex(5)).toBe(5)
      expect(NoteCalculator.normalizeIndex(11)).toBe(11)
    })

    it('should wrap index when greater than 11', () => {
      expect(NoteCalculator.normalizeIndex(12)).toBe(0)
      expect(NoteCalculator.normalizeIndex(13)).toBe(1)
      expect(NoteCalculator.normalizeIndex(15)).toBe(3)
      expect(NoteCalculator.normalizeIndex(23)).toBe(11)
      expect(NoteCalculator.normalizeIndex(24)).toBe(0)
    })

    it('should wrap index when less than 0', () => {
      expect(NoteCalculator.normalizeIndex(-1)).toBe(11)
      expect(NoteCalculator.normalizeIndex(-2)).toBe(10)
      expect(NoteCalculator.normalizeIndex(-12)).toBe(0)
      expect(NoteCalculator.normalizeIndex(-13)).toBe(11)
    })

    it('should handle extreme values correctly', () => {
      expect(NoteCalculator.normalizeIndex(100)).toBe(4) // 100 % 12 = 4
      expect(NoteCalculator.normalizeIndex(-100)).toBe(8) // -100 + 108 = 8
    })
  })

  describe('resolveNote', () => {
    it('should return the note as-is when not an array', () => {
      expect(NoteCalculator.resolveNote('C')).toBe('C')
      expect(NoteCalculator.resolveNote('F')).toBe('F')
      expect(NoteCalculator.resolveNote('B')).toBe('B')
    })

    it('should return sharp note when isSharp is true (default)', () => {
      expect(NoteCalculator.resolveNote(['C♯', 'D♭'])).toBe('C♯')
      expect(NoteCalculator.resolveNote(['F♯', 'G♭'])).toBe('F♯')
      expect(NoteCalculator.resolveNote(['A♯', 'B♭'])).toBe('A♯')
    })

    it('should return flat note when isSharp is false', () => {
      expect(NoteCalculator.resolveNote(['C♯', 'D♭'], false)).toBe('D♭')
      expect(NoteCalculator.resolveNote(['F♯', 'G♭'], false)).toBe('G♭')
      expect(NoteCalculator.resolveNote(['A♯', 'B♭'], false)).toBe('B♭')
    })

    it('should handle explicit isSharp parameter', () => {
      expect(NoteCalculator.resolveNote(['D♯', 'E♭'], true)).toBe('D♯')
      expect(NoteCalculator.resolveNote(['G♯', 'A♭'], true)).toBe('G♯')
    })
  })

  describe('calculateNoteAtInterval', () => {
    it('should calculate notes correctly with positive intervals', () => {
      expect(NoteCalculator.calculateNoteAtInterval('C', 0)).toBe('C')
      expect(NoteCalculator.calculateNoteAtInterval('C', 1)).toBe('C♯')
      expect(NoteCalculator.calculateNoteAtInterval('C', 2)).toBe('D')
      expect(NoteCalculator.calculateNoteAtInterval('C', 7)).toBe('G')
      expect(NoteCalculator.calculateNoteAtInterval('C', 12)).toBe('C')
    })

    it('should calculate notes correctly with intervals that wrap around', () => {
      expect(NoteCalculator.calculateNoteAtInterval('A', 3)).toBe('C')
      expect(NoteCalculator.calculateNoteAtInterval('G', 7)).toBe('D')
      expect(NoteCalculator.calculateNoteAtInterval('B', 1)).toBe('C')
    })

    it('should handle sharp/flat preference correctly', () => {
      expect(NoteCalculator.calculateNoteAtInterval('C', 1, true)).toBe('C♯')
      expect(NoteCalculator.calculateNoteAtInterval('C', 1, false)).toBe('D♭')
      expect(NoteCalculator.calculateNoteAtInterval('F', 1, true)).toBe('F♯')
      expect(NoteCalculator.calculateNoteAtInterval('F', 1, false)).toBe('G♭')
    })

    it('should calculate relative minor correctly', () => {
      expect(NoteCalculator.calculateNoteAtInterval('C', 9)).toBe('A') // C major -> A minor
      expect(NoteCalculator.calculateNoteAtInterval('G', 9)).toBe('E') // G major -> E minor
      expect(NoteCalculator.calculateNoteAtInterval('D', 9)).toBe('B') // D major -> B minor
    })

    it('should calculate perfect fifth correctly', () => {
      expect(NoteCalculator.calculateNoteAtInterval('C', 7)).toBe('G')
      expect(NoteCalculator.calculateNoteAtInterval('G', 7)).toBe('D')
      expect(NoteCalculator.calculateNoteAtInterval('D', 7)).toBe('A')
      expect(NoteCalculator.calculateNoteAtInterval('F', 7)).toBe('C')
    })
  })

  describe('calculateNoteSequence', () => {
    it('should calculate note sequence from intervals array', () => {
      const intervals = [0, 2, 4, 5, 7, 9, 11] // Major scale intervals
      const result = NoteCalculator.calculateNoteSequence('C', intervals)
      expect(result).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
    })

    it('should handle sharp/flat preference in sequences', () => {
      const intervals = [0, 1, 3, 6, 8, 10] // Some intervals with accidentals
      const sharpResult = NoteCalculator.calculateNoteSequence('C', intervals, true)
      const flatResult = NoteCalculator.calculateNoteSequence('C', intervals, false)

      expect(sharpResult).toEqual(['C', 'C♯', 'D♯', 'F♯', 'G♯', 'A♯'])
      expect(flatResult).toEqual(['C', 'D♭', 'E♭', 'G♭', 'A♭', 'B♭'])
    })

    it('should handle empty intervals array', () => {
      const result = NoteCalculator.calculateNoteSequence('C', [])
      expect(result).toEqual([])
    })

    it('should handle intervals that wrap around octave', () => {
      const intervals = [0, 12, 24] // Same note across octaves
      const result = NoteCalculator.calculateNoteSequence('C', intervals)
      expect(result).toEqual(['C', 'C', 'C'])
    })
  })

  describe('generateNoteListByStep', () => {
    it('should generate notes with fixed step size', () => {
      const result = NoteCalculator.generateNoteListByStep('C', 2, 4) // Whole steps
      expect(result).toEqual(['C', 'D', 'E', 'F♯'])
    })

    it('should generate chromatic sequence with step of 1', () => {
      const result = NoteCalculator.generateNoteListByStep('C', 1, 5)
      expect(result).toEqual(['C', 'C♯', 'D', 'D♯', 'E'])
    })

    it('should handle step sizes that wrap around', () => {
      const result = NoteCalculator.generateNoteListByStep('A', 7, 3) // Perfect fifths
      expect(result).toEqual(['A', 'E', 'B'])
    })

    it('should handle sharp/flat preference', () => {
      const sharpResult = NoteCalculator.generateNoteListByStep('C', 1, 3, true)
      const flatResult = NoteCalculator.generateNoteListByStep('C', 1, 3, false)

      expect(sharpResult).toEqual(['C', 'C♯', 'D'])
      expect(flatResult).toEqual(['C', 'D♭', 'D'])
    })

    it('should handle amount of 0', () => {
      const result = NoteCalculator.generateNoteListByStep('C', 1, 0)
      expect(result).toEqual([])
    })

    it('should handle amount of 1', () => {
      const result = NoteCalculator.generateNoteListByStep('G', 5, 1)
      expect(result).toEqual(['G'])
    })

    it('should generate circle of fifths correctly', () => {
      const result = NoteCalculator.generateNoteListByStep('C', 7, 12) // Complete circle of fifths
      expect(result).toEqual(['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F'])
    })
  })

  describe('integration with real music theory examples', () => {
    it('should generate C major scale correctly', () => {
      const majorIntervals = [0, 2, 4, 5, 7, 9, 11]
      const result = NoteCalculator.calculateNoteSequence('C', majorIntervals)
      expect(result).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
    })

    it('should generate A minor scale correctly', () => {
      const minorIntervals = [0, 2, 3, 5, 7, 8, 10]
      const result = NoteCalculator.calculateNoteSequence('A', minorIntervals)
      expect(result).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
    })

    it('should generate pentatonic scale correctly', () => {
      const pentatonicIntervals = [0, 2, 4, 7, 9]
      const result = NoteCalculator.calculateNoteSequence('C', pentatonicIntervals)
      expect(result).toEqual(['C', 'D', 'E', 'G', 'A'])
    })

    it('should work with different starting notes', () => {
      const majorIntervals = [0, 2, 4, 5, 7, 9, 11]
      const gMajor = NoteCalculator.calculateNoteSequence('G', majorIntervals)
      expect(gMajor).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F♯'])
    })
  })
})
