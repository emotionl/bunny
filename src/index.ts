import {
  INTERVAL_SEMITONE_MAP,
  MODE_INTERVAL_MAP,
  NOTE_LIST,
  OCTAVE_INTERVAL,
  OCTAVE_SEMITONE
} from './constants'
import { CircleOfFifthList, Interval, Mode, ModeList, Note, SingleNoteList } from './typings'

const getKeyIndex = (key: Note): number => {
  return NOTE_LIST.findIndex(item => {
    if (Array.isArray(item)) {
      return item.some(item => item === key)
    }
    return item === key
  })
}
const getModeInterval = (mode: Mode, withOctave: boolean = false): Array<Interval> => {
  let modeInterval = MODE_INTERVAL_MAP[mode]
  if (withOctave) modeInterval = modeInterval.concat(OCTAVE_INTERVAL)
  return modeInterval
}
const getModeSemitone = (mode: Mode, withOctave: boolean = false): number[] => {
  let modeSemitone = MODE_INTERVAL_MAP[mode].map(item => INTERVAL_SEMITONE_MAP[item])
  if (withOctave) modeSemitone = modeSemitone.concat(OCTAVE_SEMITONE)
  return modeSemitone
}
const getScale = (
  key: Note,
  mode: Mode,
  isSharp: boolean = true,
  withOctave: boolean = false
): SingleNoteList => {
  const keyIndex = getKeyIndex(key)
  const modeInterval = MODE_INTERVAL_MAP[mode]
  let scale = modeInterval.map(interval => {
    const step = INTERVAL_SEMITONE_MAP[interval]
    let noteIndex = keyIndex + step
    if (noteIndex > 11) noteIndex = noteIndex - 12
    let note = NOTE_LIST[noteIndex]
    if (Array.isArray(note)) note = isSharp ? note[0] : note[1]
    return note
  })
  if (withOctave) scale = scale.concat(scale[0])
  return scale
}
const getRelativeMinorKey = (majorKey: Note, isSharp: boolean = true): Note => {
  const majorKeyIndex = getKeyIndex(majorKey)
  let minorKeyIndex = majorKeyIndex + 9
  if (minorKeyIndex > 11) minorKeyIndex = minorKeyIndex - 12
  let minorKeyItem = NOTE_LIST[minorKeyIndex]
  if (Array.isArray(minorKeyItem)) minorKeyItem = isSharp ? minorKeyItem[0] : minorKeyItem[1]
  return minorKeyItem
}
const getCircleOfFifthList = (isSharp: boolean = true): CircleOfFifthList => {
  let times = 12
  let currentIndex = 0
  let list = []
  while (times > 0) {
    let major = NOTE_LIST[currentIndex]
    if (Array.isArray(major)) major = isSharp ? major[0] : major[1]
    let minor = getRelativeMinorKey(major, isSharp)
    list.push({ major, minor })
    times--
    currentIndex += 7
    if (currentIndex > 11) currentIndex = currentIndex - 12
  }
  return list
}
const getNoteListByStep = (
  startNote: Note,
  interval: Interval,
  amount: number,
  isSharp: boolean = true
): SingleNoteList => {
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
    if (index > 11) index = index - 12
    amount--
  }
  return noteList
}
const getModeList = (): ModeList => Object.keys(MODE_INTERVAL_MAP) as ModeList

export {
  getScale,
  getCircleOfFifthList,
  getNoteListByStep,
  getModeSemitone,
  getModeList,
  getModeInterval
}
