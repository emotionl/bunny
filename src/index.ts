// Typings
export type Accidental = '♮' | '♯' | '♭'
export type Note =
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'A'
  | 'B'
  | 'F♯'
  | 'C♯'
  | 'G♯'
  | 'D♯'
  | 'A♯'
  | 'B♭'
  | 'E♭'
  | 'A♭'
  | 'D♭'
  | 'G♭'
export type SingleNoteList = Array<Note>
export type MultiNoteList = Array<Note | Array<Note>>
export type CircleOfFifthList = Array<{ major: Note; minor: Note }>
export type Interval =
  | 'P1'
  | 'm2'
  | 'M2'
  | 'm3'
  | 'M3'
  | 'P4'
  | 'd5'
  | 'A4'
  | 'P5'
  | 'm6'
  | 'M6'
  | 'm7'
  | 'M7'
  | 'P8'
export type Semitone = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type Mode =
  | 'Ionian'
  | 'Dorian'
  | 'Phrygian'
  | 'Lydian'
  | 'Mixolydian'
  | 'Aeolian'
  | 'Locrian'
  | 'Major Pentatonic'
  | 'Minor Pentatonic'
  | 'Blues Scale'
  | 'Harmonic Minor'
  | 'Melodic Minor'
  | 'Bebop Major'
  | 'Bebop Minor'
  | 'Bebop Dominent'

export type ModeList = Array<Mode>
export type ModeIntervalMap = Record<Mode, Array<Interval>>

// Constants
const NOTE_LIST: MultiNoteList = [
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
  'B'
]
const INTERVAL_SEMITONE_MAP: Record<Interval, Semitone> = {
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
  P8: 12
}
const MODE_INTERVAL_MAP: ModeIntervalMap = {
  Ionian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
  Dorian: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
  Phrygian: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  Lydian: ['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'],
  Mixolydian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
  Aeolian: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  Locrian: ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
  'Major Pentatonic': ['P1', 'M2', 'M3', 'P5', 'M6'],
  'Minor Pentatonic': ['P1', 'm3', 'P4', 'P5', 'm7'],
  'Blues Scale': ['P1', 'm3', 'P4', 'd5', 'P5', 'm7'],
  'Harmonic Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7'],
  'Melodic Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7'],
  'Bebop Major': ['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M6', 'M7'],
  'Bebop Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M6', 'M7'],
  'Bebop Dominent': ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7', 'M7']
}
const OCTAVE_INTERVAL: Interval = 'P8'
const OCTAVE_SEMITONE = 12

// Core
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
