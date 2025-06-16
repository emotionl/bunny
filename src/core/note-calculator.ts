import type { Note, SingleNoteList } from '../types'
import { CHROMATIC_NOTES_COUNT, NOTE_LIST } from '../constants'
import { getKeyIndex } from '../utils'

/**
 * 音符计算工具类
 * 统一处理音符索引计算、音符解析、音符序列生成等操作
 * 消除重复代码，提供统一的音符操作接口
 */
export class NoteCalculator {
  /**
   * 标准化音符索引，处理越界情况
   * 将超出 0-11 范围的索引规范化到有效范围内
   */
  static normalizeIndex(index: number): number {
    // 使用模运算处理所有越界情况
    const result = index % CHROMATIC_NOTES_COUNT
    // 处理负数的情况，确保结果在 0-11 范围内
    const normalized = result < 0 ? result + CHROMATIC_NOTES_COUNT : result
    // 处理 -0 的情况，确保返回 +0
    return normalized === 0 ? 0 : normalized
  }

  /**
   * 解析音符，处理升降号选择
   * 统一处理 Array.isArray 判断和 isSharp 选择逻辑
   */
  static resolveNote(noteItem: Note | Note[], isSharp: boolean = true): Note {
    if (Array.isArray(noteItem)) {
      return isSharp ? noteItem[0] : noteItem[1]
    }
    return noteItem
  }

  /**
   * 计算指定半音数间隔后的音符
   * 从起始音符开始，按指定半音数计算目标音符
   */
  static calculateNoteAtInterval(startNote: Note, semitones: number, isSharp: boolean = true): Note {
    const startIndex = getKeyIndex(startNote)
    const targetIndex = this.normalizeIndex(startIndex + semitones)
    const noteItem = NOTE_LIST[targetIndex]
    return this.resolveNote(noteItem, isSharp)
  }

  /**
   * 批量计算音符序列
   * 根据半音数间隔数组，从起始音符计算整个音符序列
   */
  static calculateNoteSequence(startNote: Note, intervals: number[], isSharp: boolean = true): SingleNoteList {
    const startIndex = getKeyIndex(startNote)
    return intervals.map((interval) => {
      const targetIndex = this.normalizeIndex(startIndex + interval)
      const noteItem = NOTE_LIST[targetIndex]
      return this.resolveNote(noteItem, isSharp)
    })
  }

  /**
   * 生成指定步长的音符列表
   * 从起始音符开始，按固定步长生成指定数量的音符
   */
  static generateNoteListByStep(startNote: Note, step: number, amount: number, isSharp: boolean = true): SingleNoteList {
    let currentIndex = getKeyIndex(startNote)
    const noteList: SingleNoteList = []

    for (let i = 0; i < amount; i++) {
      const noteItem = NOTE_LIST[currentIndex]
      noteList.push(this.resolveNote(noteItem, isSharp))
      currentIndex = this.normalizeIndex(currentIndex + step)
    }

    return noteList
  }
}
