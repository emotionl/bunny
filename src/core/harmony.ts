import type { CircleOfFifthList, Note } from '../types'
import { NOTE_LIST } from '../constants'
import { getKeyIndex } from '../utils'

export function getRelativeMinorKey(majorKey: Note, isSharp: boolean = true): Note {
  const majorKeyIndex = getKeyIndex(majorKey)
  let minorKeyIndex = majorKeyIndex + 9
  if (minorKeyIndex > 11)
    minorKeyIndex = minorKeyIndex - 12
  let minorKeyItem = NOTE_LIST[minorKeyIndex]
  if (Array.isArray(minorKeyItem))
    minorKeyItem = isSharp ? minorKeyItem[0] : minorKeyItem[1]
  return minorKeyItem
}

export function getCircleOfFifthList(isSharp: boolean = true): CircleOfFifthList {
  let times = 12
  let currentIndex = 0
  const list = []
  while (times > 0) {
    let major = NOTE_LIST[currentIndex]
    if (Array.isArray(major))
      major = isSharp ? major[0] : major[1]
    const minor = getRelativeMinorKey(major, isSharp)
    list.push({ major, minor })
    times--
    currentIndex += 7
    if (currentIndex > 11)
      currentIndex = currentIndex - 12
  }
  return list
}
