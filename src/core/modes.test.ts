import type { Mode } from '../types'
import { describe, expect, it } from 'vitest'
import { getModeInterval, getModeList, getModeSemitone } from './modes'

describe('modes', () => {
  describe('getModeInterval', () => {
    it('should return correct intervals for Church modes', () => {
      expect(getModeInterval('Ionian', false)).toEqual(['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'])
      expect(getModeInterval('Dorian', false)).toEqual(['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'])
      expect(getModeInterval('Phrygian', false)).toEqual(['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'])
      expect(getModeInterval('Lydian', false)).toEqual(['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'])
      expect(getModeInterval('Mixolydian', false)).toEqual(['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'])
      expect(getModeInterval('Aeolian', false)).toEqual(['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'])
      expect(getModeInterval('Locrian', false)).toEqual(['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'])
    })

    it('should return correct intervals for pentatonic scales', () => {
      expect(getModeInterval('Major Pentatonic', false)).toEqual(['P1', 'M2', 'M3', 'P5', 'M6'])
      expect(getModeInterval('Minor Pentatonic', false)).toEqual(['P1', 'm3', 'P4', 'P5', 'm7'])
      expect(getModeInterval('Mixolydian Pentatonic', false)).toEqual(['P1', 'M3', 'P4', 'P5', 'm7'])
    })

    it('should return correct intervals for jazz and blues scales', () => {
      expect(getModeInterval('Blues Scale', false)).toEqual(['P1', 'm3', 'P4', 'd5', 'P5', 'm7'])
      expect(getModeInterval('Harmonic Minor', false)).toEqual(['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7'])
      expect(getModeInterval('Melodic Minor', false)).toEqual(['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7'])
    })

    it('should return correct intervals for bebop scales', () => {
      expect(getModeInterval('Bebop Major', false)).toEqual(['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M6', 'M7'])
      expect(getModeInterval('Bebop Minor', false)).toEqual(['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M6', 'M7'])
      expect(getModeInterval('Bebop Dominent', false)).toEqual(['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7', 'M7'])
      expect(getModeInterval('Bebop Dorian', false)).toEqual(['P1', 'M2', 'm3', 'M3', 'P4', 'P5', 'M6', 'm7'])
    })

    it('should add octave interval when withOctave is true', () => {
      const ionianWithoutOctave = getModeInterval('Ionian', false)
      const ionianWithOctave = getModeInterval('Ionian', true)

      expect(ionianWithoutOctave).toHaveLength(7)
      expect(ionianWithOctave).toHaveLength(8)
      expect(ionianWithOctave[7]).toBe('P8')
      expect(ionianWithOctave.slice(0, 7)).toEqual(ionianWithoutOctave)
    })

    it('should handle withOctave for all scale types', () => {
      const pentatonicWithOctave = getModeInterval('Major Pentatonic', true)
      const bluesWithOctave = getModeInterval('Blues Scale', true)
      const bebopWithOctave = getModeInterval('Bebop Major', true)

      expect(pentatonicWithOctave[pentatonicWithOctave.length - 1]).toBe('P8')
      expect(bluesWithOctave[bluesWithOctave.length - 1]).toBe('P8')
      expect(bebopWithOctave[bebopWithOctave.length - 1]).toBe('P8')
    })
  })

  describe('getModeSemitone', () => {
    it('should return correct semitones for Church modes', () => {
      expect(getModeSemitone('Ionian', false)).toEqual([0, 2, 4, 5, 7, 9, 11])
      expect(getModeSemitone('Dorian', false)).toEqual([0, 2, 3, 5, 7, 9, 10])
      expect(getModeSemitone('Phrygian', false)).toEqual([0, 1, 3, 5, 7, 8, 10])
      expect(getModeSemitone('Lydian', false)).toEqual([0, 2, 4, 6, 7, 9, 11])
      expect(getModeSemitone('Mixolydian', false)).toEqual([0, 2, 4, 5, 7, 9, 10])
      expect(getModeSemitone('Aeolian', false)).toEqual([0, 2, 3, 5, 7, 8, 10])
      expect(getModeSemitone('Locrian', false)).toEqual([0, 1, 3, 5, 6, 8, 10])
    })

    it('should return correct semitones for pentatonic scales', () => {
      expect(getModeSemitone('Major Pentatonic', false)).toEqual([0, 2, 4, 7, 9])
      expect(getModeSemitone('Minor Pentatonic', false)).toEqual([0, 3, 5, 7, 10])
      expect(getModeSemitone('Mixolydian Pentatonic', false)).toEqual([0, 4, 5, 7, 10])
    })

    it('should return correct semitones for jazz and blues scales', () => {
      expect(getModeSemitone('Blues Scale', false)).toEqual([0, 3, 5, 6, 7, 10])
      expect(getModeSemitone('Harmonic Minor', false)).toEqual([0, 2, 3, 5, 7, 8, 11])
      expect(getModeSemitone('Melodic Minor', false)).toEqual([0, 2, 3, 5, 7, 9, 11])
    })

    it('should return correct semitones for bebop scales', () => {
      expect(getModeSemitone('Bebop Major', false)).toEqual([0, 2, 4, 5, 7, 8, 9, 11])
      expect(getModeSemitone('Bebop Minor', false)).toEqual([0, 2, 3, 5, 7, 8, 9, 11])
      expect(getModeSemitone('Bebop Dominent', false)).toEqual([0, 2, 4, 5, 7, 9, 10, 11])
      expect(getModeSemitone('Bebop Dorian', false)).toEqual([0, 2, 3, 4, 5, 7, 9, 10])
    })

    it('should add octave semitone when withOctave is true', () => {
      const ionianWithoutOctave = getModeSemitone('Ionian', false)
      const ionianWithOctave = getModeSemitone('Ionian', true)

      expect(ionianWithoutOctave).toHaveLength(7)
      expect(ionianWithOctave).toHaveLength(8)
      expect(ionianWithOctave[7]).toBe(12) // Octave is 12 semitones
      expect(ionianWithOctave.slice(0, 7)).toEqual(ionianWithoutOctave)
    })

    it('should maintain interval-semitone consistency', () => {
      const modes: Mode[] = ['Ionian', 'Dorian', 'Major Pentatonic', 'Blues Scale', 'Harmonic Minor']

      modes.forEach((mode) => {
        const intervals = getModeInterval(mode, false)
        const semitones = getModeSemitone(mode, false)

        expect(intervals).toHaveLength(semitones.length)

        // First interval should always be P1 (0 semitones)
        expect(intervals[0]).toBe('P1')
        expect(semitones[0]).toBe(0)
      })
    })

    it('should have ascending semitone values', () => {
      const modes: Mode[] = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian']

      modes.forEach((mode) => {
        const semitones = getModeSemitone(mode, false)

        for (let i = 1; i < semitones.length; i++) {
          expect(semitones[i]).toBeGreaterThan(semitones[i - 1])
        }
      })
    })
  })

  describe('getModeList', () => {
    it('should return all available modes', () => {
      const modes = getModeList()

      expect(modes).toHaveLength(17)
      expect(modes).toContain('Ionian')
      expect(modes).toContain('Dorian')
      expect(modes).toContain('Phrygian')
      expect(modes).toContain('Lydian')
      expect(modes).toContain('Mixolydian')
      expect(modes).toContain('Aeolian')
      expect(modes).toContain('Locrian')
      expect(modes).toContain('Major Pentatonic')
      expect(modes).toContain('Minor Pentatonic')
      expect(modes).toContain('Mixolydian Pentatonic')
      expect(modes).toContain('Blues Scale')
      expect(modes).toContain('Harmonic Minor')
      expect(modes).toContain('Melodic Minor')
      expect(modes).toContain('Bebop Major')
      expect(modes).toContain('Bebop Minor')
      expect(modes).toContain('Bebop Dominent')
      expect(modes).toContain('Bebop Dorian')
    })

    it('should return consistent results on multiple calls', () => {
      const modes1 = getModeList()
      const modes2 = getModeList()

      expect(modes1).toEqual(modes2)
    })

    it('should contain all Church modes', () => {
      const modes = getModeList()
      const churchModes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian']

      churchModes.forEach((mode) => {
        expect(modes).toContain(mode)
      })
    })

    it('should contain all pentatonic scales', () => {
      const modes = getModeList()
      const pentatonicModes = ['Major Pentatonic', 'Minor Pentatonic', 'Mixolydian Pentatonic']

      pentatonicModes.forEach((mode) => {
        expect(modes).toContain(mode)
      })
    })

    it('should contain all bebop scales', () => {
      const modes = getModeList()
      const bebopModes = ['Bebop Major', 'Bebop Minor', 'Bebop Dominent', 'Bebop Dorian']

      bebopModes.forEach((mode) => {
        expect(modes).toContain(mode)
      })
    })

    it('should allow all modes to be used with other functions', () => {
      const modes = getModeList()

      modes.forEach((mode) => {
        // Test that each mode works with other functions
        expect(() => getModeInterval(mode, false)).not.toThrow()
        expect(() => getModeSemitone(mode, false)).not.toThrow()

        const intervals = getModeInterval(mode, false)
        const semitones = getModeSemitone(mode, false)

        expect(intervals.length).toBeGreaterThan(0)
        expect(semitones.length).toBeGreaterThan(0)
        expect(intervals.length).toBe(semitones.length)
      })
    })
  })
})
