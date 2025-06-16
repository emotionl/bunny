import type { Interval, Note, SingleNoteList } from '../types'
import { INTERVAL_SEMITONE_MAP } from '../constants'
import { NoteCalculator } from './note-calculator'

export function getNoteListByStep(startNote: Note, interval: Interval, amount: number, isSharp: boolean = true): SingleNoteList {
  const noteStep = INTERVAL_SEMITONE_MAP[interval]
  return NoteCalculator.generateNoteListByStep(startNote, noteStep, amount, isSharp)
}
