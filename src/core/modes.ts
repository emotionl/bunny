import type { Interval, Mode, ModeList } from '../types'
import { INTERVAL_SEMITONE_MAP, MODE_INTERVAL_MAP, OCTAVE_INTERVAL, OCTAVE_SEMITONES } from '../constants'

export function getModeInterval(mode: Mode, withOctave: boolean = false): Array<Interval> {
  let modeInterval = MODE_INTERVAL_MAP[mode]
  if (withOctave)
    modeInterval = modeInterval.concat(OCTAVE_INTERVAL)
  return modeInterval
}

export function getModeSemitone(mode: Mode, withOctave: boolean = false): number[] {
  let modeSemitone = MODE_INTERVAL_MAP[mode].map(item => INTERVAL_SEMITONE_MAP[item])
  if (withOctave)
    modeSemitone = modeSemitone.concat(OCTAVE_SEMITONES)
  return modeSemitone
}

export const getModeList = (): ModeList => Object.keys(MODE_INTERVAL_MAP) as ModeList
