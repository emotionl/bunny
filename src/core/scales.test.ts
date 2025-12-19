import type { Mode, Note } from '../types'
import { describe, expect, it } from 'vitest'
import { getScale } from './scales'

describe('scales', () => {
  describe('getScale', () => {
    describe('church Modes', () => {
      it('should generate correct Ionian (Major) scale', () => {
        expect(getScale('C', 'Ionian', true, false)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
        expect(getScale('G', 'Ionian', true, false)).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F♯'])
      })

      it('should generate correct Dorian scale', () => {
        expect(getScale('D', 'Dorian', true, false)).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C'])
        expect(getScale('A', 'Dorian', true, false)).toEqual(['A', 'B', 'C', 'D', 'E', 'F♯', 'G'])
      })

      it('should generate correct Phrygian scale', () => {
        expect(getScale('E', 'Phrygian', true, false)).toEqual(['E', 'F', 'G', 'A', 'B', 'C', 'D'])
        expect(getScale('B', 'Phrygian', true, false)).toEqual(['B', 'C', 'D', 'E', 'F♯', 'G', 'A'])
      })

      it('should generate correct Lydian scale', () => {
        expect(getScale('F', 'Lydian', true, false)).toEqual(['F', 'G', 'A', 'B', 'C', 'D', 'E'])
        expect(getScale('C', 'Lydian', true, false)).toEqual(['C', 'D', 'E', 'F♯', 'G', 'A', 'B'])
      })

      it('should generate correct Mixolydian scale', () => {
        expect(getScale('G', 'Mixolydian', true, false)).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F'])
        expect(getScale('D', 'Mixolydian', true, false)).toEqual(['D', 'E', 'F♯', 'G', 'A', 'B', 'C'])
      })

      it('should generate correct Aeolian (Natural Minor) scale', () => {
        expect(getScale('A', 'Aeolian', true, false)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
        expect(getScale('E', 'Aeolian', true, false)).toEqual(['E', 'F♯', 'G', 'A', 'B', 'C', 'D'])
      })

      it('should generate correct Locrian scale', () => {
        expect(getScale('B', 'Locrian', true, false)).toEqual(['B', 'C', 'D', 'E', 'F', 'G', 'A'])
        expect(getScale('F♯', 'Locrian', true, false)).toEqual(['F♯', 'G', 'A', 'B', 'C', 'D', 'E'])
      })
    })

    describe('pentatonic Scales', () => {
      it('should generate correct Major Pentatonic scale', () => {
        expect(getScale('C', 'Major Pentatonic', true, false)).toEqual(['C', 'D', 'E', 'G', 'A'])
        expect(getScale('G', 'Major Pentatonic', true, false)).toEqual(['G', 'A', 'B', 'D', 'E'])
      })

      it('should generate correct Minor Pentatonic scale', () => {
        expect(getScale('A', 'Minor Pentatonic', true, false)).toEqual(['A', 'C', 'D', 'E', 'G'])
        expect(getScale('E', 'Minor Pentatonic', true, false)).toEqual(['E', 'G', 'A', 'B', 'D'])
      })

      it('should generate correct Mixolydian Pentatonic scale', () => {
        expect(getScale('G', 'Mixolydian Pentatonic', true, false)).toEqual(['G', 'B', 'C', 'D', 'F'])
        expect(getScale('C', 'Mixolydian Pentatonic', true, false)).toEqual(['C', 'E', 'F', 'G', 'A♯'])
      })
    })

    describe('jazz and Blues Scales', () => {
      it('should generate correct Blues Scale', () => {
        expect(getScale('C', 'Blues Scale', true, false)).toEqual(['C', 'D♯', 'F', 'F♯', 'G', 'A♯'])
        expect(getScale('A', 'Blues Scale', true, false)).toEqual(['A', 'C', 'D', 'D♯', 'E', 'G'])
      })

      it('should generate correct Harmonic Minor scale', () => {
        expect(getScale('A', 'Harmonic Minor', true, false)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G♯'])
        expect(getScale('D', 'Harmonic Minor', true, false)).toEqual(['D', 'E', 'F', 'G', 'A', 'A♯', 'C♯'])
      })

      it('should generate correct Melodic Minor scale', () => {
        expect(getScale('A', 'Melodic Minor', true, false)).toEqual(['A', 'B', 'C', 'D', 'E', 'F♯', 'G♯'])
        expect(getScale('C', 'Melodic Minor', true, false)).toEqual(['C', 'D', 'D♯', 'F', 'G', 'A', 'B'])
      })

      it('should generate correct Bebop Major scale', () => {
        expect(getScale('C', 'Bebop Major', true, false)).toEqual(['C', 'D', 'E', 'F', 'G', 'G♯', 'A', 'B'])
      })

      it('should generate correct Bebop Minor scale', () => {
        expect(getScale('C', 'Bebop Minor', true, false)).toEqual(['C', 'D', 'D♯', 'F', 'G', 'G♯', 'A', 'B'])
      })

      it('should generate correct Bebop Dominant scale', () => {
        expect(getScale('C', 'Bebop Dominant', true, false)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'A♯', 'B'])
      })

      it('should generate correct Bebop Dorian scale', () => {
        expect(getScale('C', 'Bebop Dorian', true, false)).toEqual(['C', 'D', 'D♯', 'E', 'F', 'G', 'A', 'A♯'])
      })
    })

    describe('withOctave parameter', () => {
      it('should add octave note when withOctave is true', () => {
        const scaleWithoutOctave = getScale('C', 'Ionian', true, false)
        const scaleWithOctave = getScale('C', 'Ionian', true, true)

        expect(scaleWithoutOctave).toHaveLength(7)
        expect(scaleWithOctave).toHaveLength(8)
        expect(scaleWithOctave[7]).toBe('C') // Octave note should be same as first
        expect(scaleWithOctave.slice(0, 7)).toEqual(scaleWithoutOctave)
      })

      it('should work with pentatonic scales', () => {
        const pentatonicWithOctave = getScale('C', 'Major Pentatonic', true, true)
        expect(pentatonicWithOctave).toHaveLength(6)
        expect(pentatonicWithOctave[5]).toBe('C')
      })
    })

    describe('sharp/flat preference', () => {
      it('should respect sharp preference', () => {
        const scaleWithSharps = getScale('F♯', 'Ionian', true, false)
        const hasSharp = scaleWithSharps.some(note => note.includes('♯'))
        expect(hasSharp).toBe(true)
      })

      it('should respect flat preference', () => {
        const scaleWithFlats = getScale('D♭', 'Ionian', false, false)
        const hasFlat = scaleWithFlats.some(note => note.includes('♭'))
        expect(hasFlat).toBe(true)
      })

      it('should handle enharmonic keys consistently', () => {
        const fSharpMajor = getScale('F♯', 'Ionian', true, false)
        const gFlatMajor = getScale('G♭', 'Ionian', false, false)

        expect(fSharpMajor).toHaveLength(7)
        expect(gFlatMajor).toHaveLength(7)
        // They should be enharmonically equivalent but spelled differently
        expect(fSharpMajor[0]).toBe('F♯')
        expect(gFlatMajor[0]).toBe('G♭')
      })
    })

    describe('edge cases', () => {
      it('should handle all natural notes as starting points', () => {
        const naturalNotes: Note[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

        naturalNotes.forEach((note) => {
          const scale = getScale(note, 'Ionian', true, false)
          expect(scale).toHaveLength(7)
          expect(scale[0]).toBe(note)
        })
      })

      it('should handle all modes with same starting note', () => {
        const modes: Mode[] = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian']

        modes.forEach((mode) => {
          const scale = getScale('C', mode, true, false)
          expect(scale).toHaveLength(7)
          expect(scale[0]).toBe('C')
        })
      })
    })

    describe('melodic minor mode', () => {
      it('should generate correct Melodic Minor scale', () => {
        expect(getScale('A', 'Melodic Minor', false, false)).toEqual(['A', 'B', 'C', 'D', 'E', 'G♭', 'A♭'])
        expect(getScale('A♭', 'Altered', false, false)).toEqual(['A♭', 'A', 'B', 'C', 'D', 'E', 'G♭'])
        expect(getScale('D', 'Lydian Dominant', false, false)).toEqual(['D', 'E', 'G♭', 'A♭', 'A', 'B', 'C'])
      })
    })
  })
})
