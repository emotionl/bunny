import type { Mode, Note, SingleNoteList } from '../types'
import { INTERVAL_SEMITONE_MAP, MODE_INTERVAL_MAP, NOTE_LIST } from '../constants'
import { getKeyIndex } from '../utils'

export function getScale(key: Note, mode: Mode, isSharp: boolean = true, withOctave: boolean = false): SingleNoteList {
  const keyIndex = getKeyIndex(key)
  const modeInterval = MODE_INTERVAL_MAP[mode]
  let scale = modeInterval.map((interval) => {
    const step = INTERVAL_SEMITONE_MAP[interval]
    let noteIndex = keyIndex + step
    if (noteIndex > 11)
      noteIndex = noteIndex - 12
    let note = NOTE_LIST[noteIndex]
    if (Array.isArray(note))
      note = isSharp ? note[0] : note[1]
    return note
  })
  if (withOctave)
    scale = scale.concat(scale[0])
  return scale
}
