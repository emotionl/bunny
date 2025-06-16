import type { Note } from '../types'
import { describe, expect, it } from 'vitest'
import { getCircleOfFifthList, getRelativeMinorKey } from './harmony'

describe('harmony', () => {
  describe('getRelativeMinorKey', () => {
    it('should return correct relative minor for major keys with sharps', () => {
      expect(getRelativeMinorKey('C', true)).toBe('A')
      expect(getRelativeMinorKey('G', true)).toBe('E')
      expect(getRelativeMinorKey('D', true)).toBe('B')
      expect(getRelativeMinorKey('A', true)).toBe('F♯')
      expect(getRelativeMinorKey('E', true)).toBe('C♯')
      expect(getRelativeMinorKey('B', true)).toBe('G♯')
    })

    it('should return correct relative minor for major keys with flats', () => {
      expect(getRelativeMinorKey('C', false)).toBe('A')
      expect(getRelativeMinorKey('F', false)).toBe('D')
      expect(getRelativeMinorKey('B♭', false)).toBe('G')
      expect(getRelativeMinorKey('E♭', false)).toBe('C')
      expect(getRelativeMinorKey('A♭', false)).toBe('F')
      expect(getRelativeMinorKey('D♭', false)).toBe('B♭')
    })

    it('should handle enharmonic major keys correctly', () => {
      expect(getRelativeMinorKey('F♯', true)).toBe('D♯')
      expect(getRelativeMinorKey('G♭', false)).toBe('E♭')
      expect(getRelativeMinorKey('C♯', true)).toBe('A♯')
      expect(getRelativeMinorKey('D♭', false)).toBe('B♭')
    })
  })

  describe('getCircleOfFifthList', () => {
    it('should generate complete circle of fifths with sharps', () => {
      const circleWithSharps = getCircleOfFifthList(true)

      expect(circleWithSharps).toHaveLength(12)

      // Test first few entries
      expect(circleWithSharps[0]).toEqual({ major: 'C', minor: 'A' })
      expect(circleWithSharps[1]).toEqual({ major: 'G', minor: 'E' })
      expect(circleWithSharps[2]).toEqual({ major: 'D', minor: 'B' })
      expect(circleWithSharps[3]).toEqual({ major: 'A', minor: 'F♯' })
      expect(circleWithSharps[4]).toEqual({ major: 'E', minor: 'C♯' })
    })

    it('should generate complete circle of fifths with flats', () => {
      const circleWithFlats = getCircleOfFifthList(false)

      expect(circleWithFlats).toHaveLength(12)

      // Test first few entries
      expect(circleWithFlats[0]).toEqual({ major: 'C', minor: 'A' })
      expect(circleWithFlats[1]).toEqual({ major: 'G', minor: 'E' })
      expect(circleWithFlats[2]).toEqual({ major: 'D', minor: 'B' })

      // Test flat entries
      expect(circleWithFlats[11]).toEqual({ major: 'F', minor: 'D' })
      expect(circleWithFlats[10]).toEqual({ major: 'B♭', minor: 'G' })
      expect(circleWithFlats[9]).toEqual({ major: 'E♭', minor: 'C' })
    })

    it('should maintain consistent major-minor relationships', () => {
      const circle = getCircleOfFifthList(true)

      circle.forEach(({ major, minor }) => {
        expect(getRelativeMinorKey(major as Note, true)).toBe(minor)
      })
    })

    it('should cycle through all 12 chromatic keys', () => {
      const circleWithSharps = getCircleOfFifthList(true)
      const circleWithFlats = getCircleOfFifthList(false)

      const majorKeys = new Set([
        ...circleWithSharps.map(item => item.major),
        ...circleWithFlats.map(item => item.major),
      ])

      // Should cover all chromatic possibilities
      expect(majorKeys.size).toBeGreaterThanOrEqual(12)
    })
  })
})
