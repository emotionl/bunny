import type { CircleOfFifthList, Note } from '../types'
import { CHROMATIC_NOTES_COUNT, CIRCLE_OF_FIFTHS_INTERVAL, NOTE_LIST, RELATIVE_MINOR_INTERVAL } from '../constants'
import { NoteCalculator } from './note-calculator'

export function getRelativeMinorKey(majorKey: Note, isSharp: boolean = true): Note {
  return NoteCalculator.calculateNoteAtInterval(majorKey, RELATIVE_MINOR_INTERVAL, isSharp)
}

export function getCircleOfFifthList(isSharp: boolean = true): CircleOfFifthList {
  let times = CHROMATIC_NOTES_COUNT
  let currentIndex = 0
  const list = []
  while (times > 0) {
    const majorNoteItem = NOTE_LIST[currentIndex]
    const major = NoteCalculator.resolveNote(majorNoteItem, isSharp)
    const minor = getRelativeMinorKey(major, isSharp)
    list.push({ major, minor })
    times--
    currentIndex = NoteCalculator.normalizeIndex(currentIndex + CIRCLE_OF_FIFTHS_INTERVAL)
  }
  return list
}
