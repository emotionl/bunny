import type { Mode, Note, SingleNoteList } from '../types'
import { INTERVAL_SEMITONE_MAP, MODE_INTERVAL_MAP } from '../constants'
import { NoteCalculator } from './note-calculator'

export function getScale(key: Note, mode: Mode, isSharp: boolean = true, withOctave: boolean = false): SingleNoteList {
  const modeInterval = MODE_INTERVAL_MAP[mode]
  const intervals = modeInterval.map(interval => INTERVAL_SEMITONE_MAP[interval])
  let scale = NoteCalculator.calculateNoteSequence(key, intervals, isSharp)
  if (withOctave)
    scale = scale.concat(scale[0])
  return scale
}
