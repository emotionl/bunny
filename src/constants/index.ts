import type { Interval, ModeIntervalMap, MultiNoteList, Semitone } from '../types'

// =====================================
// 基础音乐理论常量
// =====================================

/**
 * 十二平均律中的半音数量
 */
export const CHROMATIC_NOTES_COUNT = 12

/**
 * 音符索引的最大值 (0-11)
 */
export const MAX_NOTE_INDEX = 11

/**
 * 音符索引的最小值
 */
export const MIN_NOTE_INDEX = 0

/**
 * 八度音程的半音数
 */
export const OCTAVE_SEMITONES = 12

/**
 * 八度音程标识符
 */
export const OCTAVE_INTERVAL: Interval = 'P8'

// =====================================
// 音程关系常量
// =====================================

/**
 * 大调到其关系小调的音程间隔（小六度 = 9个半音）
 */
export const RELATIVE_MINOR_INTERVAL = 9

/**
 * 五度圈中相邻调性的音程间隔（完全五度 = 7个半音）
 */
export const CIRCLE_OF_FIFTHS_INTERVAL = 7

/**
 * 完全五度的半音数
 */
export const PERFECT_FIFTH_SEMITONES = 7

// =====================================
// 音符系统定义
// =====================================

/**
 * 十二平均律音符列表
 * 包含所有自然音符和升降音符的异名同音表示
 */
export const NOTE_LIST: MultiNoteList = [
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
  'B',
]

// =====================================
// 音程映射定义
// =====================================

/**
 * 音程名称到半音数的映射表
 * 涵盖了所有常用的音程类型
 */
export const INTERVAL_SEMITONE_MAP: Record<Interval, Semitone> = {
  P1: 0, // 纯一度
  m2: 1, // 小二度
  M2: 2, // 大二度
  m3: 3, // 小三度
  M3: 4, // 大三度
  P4: 5, // 纯四度
  d5: 6, // 减五度
  A4: 6, // 增四度（三全音）
  P5: 7, // 纯五度
  m6: 8, // 小六度
  M6: 9, // 大六度
  m7: 10, // 小七度
  M7: 11, // 大七度
  P8: 12, // 纯八度
}

// =====================================
// 调式映射定义
// =====================================

/**
 * 调式名称到音程序列的映射表
 * 按调式类型分组：教会调式、五声音阶、爵士/蓝调音阶、现代音阶
 */
export const MODE_INTERVAL_MAP: ModeIntervalMap = {
  // 教会调式 (Church Modes)
  'Ionian': ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'], // 大调
  'Dorian': ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'], // 多利亚调式
  'Phrygian': ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'], // 弗里吉亚调式
  'Lydian': ['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'], // 利第亚调式
  'Mixolydian': ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'], // 混合利第亚调式
  'Aeolian': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'], // 自然小调
  'Locrian': ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'], // 洛克里亚调式

  // 五声音阶 (Pentatonic Scales)
  'Major Pentatonic': ['P1', 'M2', 'M3', 'P5', 'M6'], // 大调五声音阶
  'Minor Pentatonic': ['P1', 'm3', 'P4', 'P5', 'm7'], // 小调五声音阶
  'Mixolydian Pentatonic': ['P1', 'M3', 'P4', 'P5', 'm7'], // 混合利第亚五声音阶

  // 爵士与蓝调音阶 (Jazz & Blues Scales)
  'Blues Scale': ['P1', 'm3', 'P4', 'd5', 'P5', 'm7'], // 蓝调音阶
  'Bebop Major': ['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M6', 'M7'], // 咆勃大调
  'Bebop Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M6', 'M7'], // 咆勃小调
  'Bebop Dominent': ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7', 'M7'], // 咆勃属调
  'Bebop Dorian': ['P1', 'M2', 'm3', 'M3', 'P4', 'P5', 'M6', 'm7'], // 咆勃多利亚

  // 现代音阶 (Modern Scales)
  'Harmonic Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7'], // 和声小调
  'Melodic Minor': ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7'], // 旋律小调
}
