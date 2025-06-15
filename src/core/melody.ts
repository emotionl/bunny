import type { Interval, Note, SingleNoteList } from '../types'
import { INTERVAL_SEMITONE_MAP, NOTE_LIST } from '../constants'
import { getKeyIndex } from '../utils'

export function getNoteListByStep(startNote: Note, interval: Interval, amount: number, isSharp: boolean = true): SingleNoteList {
  const noteStep = INTERVAL_SEMITONE_MAP[interval]
  let index = getKeyIndex(startNote)
  const noteList: SingleNoteList = []
  while (amount > 0) {
    let noteItem = NOTE_LIST[index]
    if (Array.isArray(noteItem)) {
      noteItem = isSharp ? noteItem[0] : noteItem[1]
    }
    noteList.push(noteItem)
    index = index + noteStep
    if (index > 11)
      index = index - 12
    amount--
  }
  return noteList
}
