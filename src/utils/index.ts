import type { Note } from '../types'
import { NOTE_LIST } from '../constants'

export function getKeyIndex(key: Note): number {
  return NOTE_LIST.findIndex((item) => {
    if (Array.isArray(item)) {
      return item.includes(key)
    }
    return item === key
  })
}
