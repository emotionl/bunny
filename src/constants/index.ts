import type { Interval, ModeIntervalMap, MultiNoteList, Semitone } from '../types'

export const NOTE_LIST: MultiNoteList = [
  'C',
  ['C♯', 'D♭'],
  'D',
  ['D♯', 'E♭'],
  'E',
  'F',
  ['F♯', 'G♭'],
  'G',
  ['G♯', 'A♭'],
  'A',
  ['A♯', 'B♭'],
  'B',
]

export const INTERVAL_SEMITONE_MAP: Record<Interval, Semitone> = {
  P1: 0,
  m2: 1,
  M2: 2,
  m3: 3,
  M3: 4,
  P4: 5,
  d5: 6,
  A4: 6,
  P5: 7,
  m6: 8,
  M6: 9,
  m7: 10,
  M7: 11,
  P8: 12,
}

export const MODE_INTERVAL_MAP: ModeIntervalMap = {
  'Ionian': ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
  'Dorian': ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
  'Phrygian': ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  'Lydian': ['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'],
  'Mixolydian': ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
  'Aeolian': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  'Locrian': ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
  'Major Pentatonic': ['P1', 'M2', 'M3', 'P5', 'M6'],
  'Minor Pentatonic': ['P1', 'm3', 'P4', 'P5', 'm7'],
  'Mixolydian Pentatonic': ['P1', 'M3', 'P4', 'P5', 'm7'],
  'Blues Scale': ['P1', 'm3', 'P4', 'd5', 'P5', 'm7'],
  'Harmonic Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7'],
  'Melodic Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7'],
  'Bebop Major': ['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M6', 'M7'],
  'Bebop Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M6', 'M7'],
  'Bebop Dominent': ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7', 'M7'],
  'Bebop Dorian': ['P1', 'M2', 'm3', 'M3', 'P4', 'P5', 'M6', 'm7'],
}

export const OCTAVE_INTERVAL: Interval = 'P8'
export const OCTAVE_SEMITONE = 12
