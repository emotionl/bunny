# Bunny 🐰

[![npm version](https://badge.fury.io/js/@emotionl%2Fbunny.svg)](https://badge.fury.io/js/@emotionl%2Fbunny)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[English](./README.md) | [中文](./README.zh-CN.md)

一个轻量级的音乐理论计算 JavaScript 库。Bunny 为音阶、音程、调式和其他音乐理论概念提供直观的方法和常量。

## ✨ 特性

- 🎵 生成 18 种不同调式的音阶（包括五声音阶、布鲁斯音阶、比波普音阶和和声音阶）
- 🔄 使用五度圈和关系调
- 🎼 基于音程创建音符序列
- 🎹 支持升号和降号记谱法
- 📊 访问半音模式和音程计算
- 🔧 完整的 TypeScript 支持和全面的类型定义
- 🚀 零依赖且轻量级（约 5KB）

## 📦 安装

```bash
# 使用 npm
npm install @emotionl/bunny --save

# 使用 yarn
yarn add @emotionl/bunny

# 使用 pnpm
pnpm add @emotionl/bunny
```

## 🚀 快速开始

```js
import { getCircleOfFifthList, getNoteListByStep, getScale } from '@emotionl/bunny'

// 获取 C 大调音阶
const cMajor = getScale('C', 'Ionian')
console.log(cMajor) // ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// 获取五度圈
const circleOfFifths = getCircleOfFifthList()
console.log(circleOfFifths[0]) // { major: 'C', minor: 'A' }

// 生成纯五度序列
const fifths = getNoteListByStep('C', 'P5', 7)
console.log(fifths) // ['C', 'G', 'D', 'A', 'E', 'B', 'F♯']
```

## 📚 API 参考

### 音阶

#### `getScale(key: Note, mode: Mode, isSharp?: boolean, withOctave?: boolean): SingleNoteList`

返回指定调式的音阶音符。

**参数：**

- `key`: 音阶的主音
- `mode`: 调式名称（参见[支持的调式](#支持的调式)）
- `isSharp`: 使用升号（♯）或降号（♭）记谱法（默认：`true`）
- `withOctave`: 在末尾包含八度音符（默认：`false`）

**返回值：** 音阶中的音符数组

**示例：**

```js
import { getScale } from '@emotionl/bunny'

// 大调音阶（伊奥尼亚调式）
const cMajor = getScale('C', 'Ionian')
// ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// 小调音阶（爱奥尼亚调式）带八度
const aMinor = getScale('A', 'Aeolian', true, true)
// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']

// 多利亚调式使用降号
const dDorian = getScale('D', 'Dorian', false)
// ['D', 'E', 'F', 'G', 'A', 'B', 'C']

// 五声音阶
const cPentatonic = getScale('C', 'Major Pentatonic')
// ['C', 'D', 'E', 'G', 'A']

// 布鲁斯音阶
const cBlues = getScale('C', 'Blues Scale')
// ['C', 'E♭', 'F', 'G♭', 'G', 'B♭']
```

### 五度圈与和声

#### `getCircleOfFifthList(isSharp?: boolean): CircleOfFifthList`

返回完整的五度圈，包含大调和关系小调。

**参数：**

- `isSharp`: 使用升号（♯）或降号（♭）记谱法（默认：`true`）

**返回值：** 包含大调和小调键对的对象数组

**示例：**

```js
import { getCircleOfFifthList } from '@emotionl/bunny'

const circleOfFifths = getCircleOfFifthList()
console.log(circleOfFifths)
// [
//   { major: 'C', minor: 'A' },
//   { major: 'G', minor: 'E' },
//   { major: 'D', minor: 'B' },
//   // ... 继续所有 12 个调
// ]

// 使用降号
const circleWithFlats = getCircleOfFifthList(false)
```

#### `getRelativeMinorKey(majorKey: Note, isSharp?: boolean): Note`

返回给定大调的关系小调。

**参数：**

- `majorKey`: 大调音符
- `isSharp`: 使用升号（♯）或降号（♭）记谱法（默认：`true`）

**返回值：** 关系小调音符

**示例：**

```js
import { getRelativeMinorKey } from '@emotionl/bunny'

const relativeMinor = getRelativeMinorKey('C') // 'A'
const relativeMinorFlat = getRelativeMinorKey('F', false) // 'D'
```

### 音符序列

#### `getNoteListByStep(startNote: Note, interval: Interval, amount: number, isSharp?: boolean): SingleNoteList`

生成遵循指定音程模式的音符序列。

**参数：**

- `startNote`: 起始音符
- `interval`: 步进音程（参见[支持的音程](#支持的音程)）
- `amount`: 要生成的音符数量
- `isSharp`: 使用升号（♯）或降号（♭）记谱法（默认：`true`）

**返回值：** 遵循音程模式的音符数组

**示例：**

```js
import { getNoteListByStep } from '@emotionl/bunny'

// 纯五度（适合和弦进行）
const fifths = getNoteListByStep('C', 'P5', 7)
// ['C', 'G', 'D', 'A', 'E', 'B', 'F♯']

// 大三度（用于增三和弦）
const majorThirds = getNoteListByStep('C', 'M3', 4)
// ['C', 'E', 'G♯', 'C']

// 纯四度（用于四度和声）
const fourths = getNoteListByStep('C', 'P4', 5)
// ['C', 'F', 'B♭', 'E♭', 'A♭']
```

### 调式分析

#### `getModeSemitone(mode: Mode, withOctave?: boolean): number[]`

返回指定调式的半音模式。

**参数：**

- `mode`: 调式名称
- `withOctave`: 包含八度半音（默认：`false`）

**返回值：** 从根音开始的半音间隔数组

**示例：**

```js
import { getModeSemitone } from '@emotionl/bunny'

const majorSemitones = getModeSemitone('Ionian')
// [0, 2, 4, 5, 7, 9, 11]

const dorianSemitones = getModeSemitone('Dorian')
// [0, 2, 3, 5, 7, 9, 10]
```

#### `getModeInterval(mode: Mode, withOctave?: boolean): Interval[]`

返回指定调式的音程模式。

**参数：**

- `mode`: 调式名称
- `withOctave`: 包含八度音程（默认：`false`）

**返回值：** 从根音开始的音程数组

**示例：**

```js
import { getModeInterval } from '@emotionl/bunny'

const majorIntervals = getModeInterval('Ionian')
// ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']

const minorIntervals = getModeInterval('Aeolian')
// ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7']
```

#### `getModeList(): ModeList`

返回所有可用的调式名称。

**返回值：** 所有支持的调式名称数组

**示例：**

```js
import { getModeList } from '@emotionl/bunny'

const allModes = getModeList()
console.log(allModes.length) // 18 种调式可用
```

## 🎼 支持的调式

Bunny 支持 18 种不同的调式和音阶：

### 教会调式（7 个音符）

- **Ionian（伊奥尼亚）** - 大调音阶（全-全-半-全-全-全-半）
- **Dorian（多利亚）** - 自然小调升 6 度
- **Phrygian（弗里吉亚）** - 自然小调降 2 度
- **Lydian（利底亚）** - 大调升 4 度
- **Mixolydian（混合利底亚）** - 大调降 7 度
- **Aeolian（爱奥尼亚）** - 自然小调音阶
- **Locrian（洛克里亚）** - 减音阶

### 五声音阶（5 个音符）

- **Major Pentatonic（大调五声）** - 大调去掉 4 度和 7 度
- **Minor Pentatonic（小调五声）** - 小调去掉 2 度和 6 度
- **Mixolydian Pentatonic（混合利底亚五声）** - 混合利底亚去掉 2 度和 6 度

### 爵士与布鲁斯音阶

- **Blues Scale（布鲁斯音阶）** - 小调五声加降 5 度
- **Harmonic Minor（和声小调）** - 小调升 7 度
- **Melodic Minor（旋律小调）** - 小调升 6 度和 7 度
- **Bebop Major（比波普大调）** - 大调加升 5 度
- **Bebop Minor（比波普小调）** - 小调加还原 6 度
- **Bebop Dominant（比波普属调）** - 混合利底亚加还原 7 度
- **Bebop Dorian（比波普多利亚）** - 多利亚加还原 3 度

## 🎵 支持的音程

| 音程   | 符号  | 半音数 | 描述          |
| ------ | ----- | ------ | ------------- |
| 纯一度 | P1    | 0      | 同音          |
| 小二度 | m2    | 1      | 半音          |
| 大二度 | M2    | 2      | 全音          |
| 小三度 | m3    | 3      | 小三度        |
| 大三度 | M3    | 4      | 大三度        |
| 纯四度 | P4    | 5      | 纯四度        |
| 三全音 | d5/A4 | 6      | 减五度/增四度 |
| 纯五度 | P5    | 7      | 纯五度        |
| 小六度 | m6    | 8      | 小六度        |
| 大六度 | M6    | 9      | 大六度        |
| 小七度 | m7    | 10     | 小七度        |
| 大七度 | M7    | 11     | 大七度        |
| 纯八度 | P8    | 12     | 八度          |

## 🎹 支持的音符

Bunny 支持所有 12 个半音音符，包括升号和降号表示法：

**自然音符：** C, D, E, F, G, A, B

**变化音符：**

- **升号：** C♯, D♯, F♯, G♯, A♯
- **降号：** D♭, E♭, G♭, A♭, B♭

## 💡 使用场景

### 音乐制作

```js
// 生成和弦进行
const progression = ['C', 'Am', 'F', 'G'].map(chord =>
  getScale(chord.replace('m', ''), chord.includes('m') ? 'Aeolian' : 'Ionian')
)

// 使用五度圈创建低音线
const bassLine = getCircleOfFifthList().slice(0, 4).map(key => key.major)
```

### 音乐教育

```js
// 比较从同一根音开始的不同调式
const modes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian']
const comparison = modes.map(mode => ({
  mode,
  notes: getScale('C', mode),
  intervals: getModeInterval(mode)
}))
```

### 算法作曲

```js
// 生成旋律序列
const melody = getNoteListByStep('C', 'M2', 8) // 全音音阶
const harmony = getNoteListByStep('C', 'M3', 4) // 增三和弦循环
```

## 🔧 TypeScript 支持

Bunny 使用 TypeScript 编写，提供全面的类型定义：

```typescript
import type { Interval, Mode, Note, SingleNoteList } from '@emotionl/bunny'

// 所有类型都已导出并可供使用
function createScale(root: Note, mode: Mode): SingleNoteList {
  return getScale(root, mode)
}
```

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。对于重大更改，请先开启 issue 讨论您想要更改的内容。

### 开发设置

```bash
# 克隆仓库
git clone https://github.com/emotionl/bunny.git
cd bunny

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 运行代码检查
pnpm lint
```

## 📄 许可证

MIT © [emotionl](https://github.com/emotionl/)

## 🙏 致谢

- 受音乐理论启发，满足简单、准确的音乐计算需求
- 使用现代 JavaScript/TypeScript 最佳实践构建
- 专为教育和生产使用而设计

## 📚 API 参考

### 音阶

#### `getScale(key: Note, mode: Mode, isSharp?: boolean, withOctave?: boolean): SingleNoteList`

返回指定调式的音阶音符。

**参数：**

- `key`: 音阶的主音
- `mode`: 调式名称（参见[支持的调式](#支持的调式)）
- `isSharp`: 使用升号（♯）或降号（♭）记谱法（默认：`true`）
- `withOctave`: 在末尾包含八度音符（默认：`false`）

**返回值：** 音阶中的音符数组

**示例：**

```js
import { getScale } from '@emotionl/bunny'

// 大调音阶（伊奥尼亚调式）
const cMajor = getScale('C', 'Ionian')
// ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// 小调音阶（爱奥尼亚调式）带八度
const aMinor = getScale('A', 'Aeolian', true, true)
// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']

// 多利亚调式使用降号
const dDorian = getScale('D', 'Dorian', false)
// ['D', 'E', 'F', 'G', 'A', 'B', 'C']

// 五声音阶
const cPentatonic = getScale('C', 'Major Pentatonic')
// ['C', 'D', 'E', 'G', 'A']

// 布鲁斯音阶
const cBlues = getScale('C', 'Blues Scale')
// ['C', 'E♭', 'F', 'G♭', 'G', 'B♭']
```

### 五度圈与和声

#### `getCircleOfFifthList(isSharp?: boolean): CircleOfFifthList`

返回完整的五度圈，包含大调和关系小调。

**参数：**

- `isSharp`: 使用升号（♯）或降号（♭）记谱法（默认：`true`）

**返回值：** 包含大调和小调键对的对象数组

**示例：**

```js
import { getCircleOfFifthList } from '@emotionl/bunny'

const circleOfFifths = getCircleOfFifthList()
console.log(circleOfFifths)
// [
//   { major: 'C', minor: 'A' },
//   { major: 'G', minor: 'E' },
//   { major: 'D', minor: 'B' },
//   // ... 继续所有 12 个调
// ]

// 使用降号
const circleWithFlats = getCircleOfFifthList(false)
```

#### `getRelativeMinorKey(majorKey: Note, isSharp?: boolean): Note`

返回给定大调的关系小调。

**参数：**

- `majorKey`: 大调音符
- `isSharp`: 使用升号（♯）或降号（♭）记谱法（默认：`true`）

**返回值：** 关系小调音符

**示例：**

```js
import { getRelativeMinorKey } from '@emotionl/bunny'

const relativeMinor = getRelativeMinorKey('C') // 'A'
const relativeMinorFlat = getRelativeMinorKey('F', false) // 'D'
```

### 音符序列

#### `getNoteListByStep(startNote: Note, interval: Interval, amount: number, isSharp?: boolean): SingleNoteList`

生成遵循指定音程模式的音符序列。

**参数：**

- `startNote`: 起始音符
- `interval`: 步进音程（参见[支持的音程](#支持的音程)）
- `amount`: 要生成的音符数量
- `isSharp`: 使用升号（♯）或降号（♭）记谱法（默认：`true`）

**返回值：** 遵循音程模式的音符数组

**示例：**

```js
import { getNoteListByStep } from '@emotionl/bunny'

// 纯五度（适合和弦进行）
const fifths = getNoteListByStep('C', 'P5', 7)
// ['C', 'G', 'D', 'A', 'E', 'B', 'F♯']

// 大三度（用于增三和弦）
const majorThirds = getNoteListByStep('C', 'M3', 4)
// ['C', 'E', 'G♯', 'C']

// 纯四度（用于四度和声）
const fourths = getNoteListByStep('C', 'P4', 5)
// ['C', 'F', 'B♭', 'E♭', 'A♭']
```

### 调式分析

#### `getModeSemitone(mode: Mode, withOctave?: boolean): number[]`

返回指定调式的半音模式。

**参数：**

- `mode`: 调式名称
- `withOctave`: 包含八度半音（默认：`false`）

**返回值：** 从根音开始的半音间隔数组

**示例：**

```js
import { getModeSemitone } from '@emotionl/bunny'

const majorSemitones = getModeSemitone('Ionian')
// [0, 2, 4, 5, 7, 9, 11]

const dorianSemitones = getModeSemitone('Dorian')
// [0, 2, 3, 5, 7, 9, 10]
```

#### `getModeInterval(mode: Mode, withOctave?: boolean): Interval[]`

返回指定调式的音程模式。

**参数：**

- `mode`: 调式名称
- `withOctave`: 包含八度音程（默认：`false`）

**返回值：** 从根音开始的音程数组

**示例：**

```js
import { getModeInterval } from '@emotionl/bunny'

const majorIntervals = getModeInterval('Ionian')
// ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']

const minorIntervals = getModeInterval('Aeolian')
// ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7']
```

#### `getModeList(): ModeList`

返回所有可用的调式名称。

**返回值：** 所有支持的调式名称数组

**示例：**

```js
import { getModeList } from '@emotionl/bunny'

const allModes = getModeList()
console.log(allModes.length) // 18 种调式可用
```

## 🎼 支持的调式

Bunny 支持 18 种不同的调式和音阶：

### 教会调式（7 个音符）

- **Ionian（伊奥尼亚）** - 大调音阶（全-全-半-全-全-全-半）
- **Dorian（多利亚）** - 自然小调升 6 度
- **Phrygian（弗里吉亚）** - 自然小调降 2 度
- **Lydian（利底亚）** - 大调升 4 度
- **Mixolydian（混合利底亚）** - 大调降 7 度
- **Aeolian（爱奥尼亚）** - 自然小调音阶
- **Locrian（洛克里亚）** - 减音阶

### 五声音阶（5 个音符）

- **Major Pentatonic（大调五声）** - 大调去掉 4 度和 7 度
- **Minor Pentatonic（小调五声）** - 小调去掉 2 度和 6 度
- **Mixolydian Pentatonic（混合利底亚五声）** - 混合利底亚去掉 2 度和 6 度

### 爵士与布鲁斯音阶

- **Blues Scale（布鲁斯音阶）** - 小调五声加降 5 度
- **Harmonic Minor（和声小调）** - 小调升 7 度
- **Melodic Minor（旋律小调）** - 小调升 6 度和 7 度
- **Bebop Major（比波普大调）** - 大调加升 5 度
- **Bebop Minor（比波普小调）** - 小调加还原 6 度
- **Bebop Dominant（比波普属调）** - 混合利底亚加还原 7 度
- **Bebop Dorian（比波普多利亚）** - 多利亚加还原 3 度

## 🎵 支持的音程

| 音程   | 符号  | 半音数 | 描述          |
| ------ | ----- | ------ | ------------- |
| 纯一度 | P1    | 0      | 同音          |
| 小二度 | m2    | 1      | 半音          |
| 大二度 | M2    | 2      | 全音          |
| 小三度 | m3    | 3      | 小三度        |
| 大三度 | M3    | 4      | 大三度        |
| 纯四度 | P4    | 5      | 纯四度        |
| 三全音 | d5/A4 | 6      | 减五度/增四度 |
| 纯五度 | P5    | 7      | 纯五度        |
| 小六度 | m6    | 8      | 小六度        |
| 大六度 | M6    | 9      | 大六度        |
| 小七度 | m7    | 10     | 小七度        |
| 大七度 | M7    | 11     | 大七度        |
| 纯八度 | P8    | 12     | 八度          |

## 🎹 支持的音符

Bunny 支持所有 12 个半音音符，包括升号和降号表示法：

**自然音符：** C, D, E, F, G, A, B

**变化音符：**

- **升号：** C♯, D♯, F♯, G♯, A♯
- **降号：** D♭, E♭, G♭, A♭, B♭

## 💡 使用场景

### 音乐制作

```js
// 生成和弦进行
const progression = ['C', 'Am', 'F', 'G'].map(chord =>
  getScale(chord.replace('m', ''), chord.includes('m') ? 'Aeolian' : 'Ionian')
)

// 使用五度圈创建低音线
const bassLine = getCircleOfFifthList().slice(0, 4).map(key => key.major)
```

### 音乐教育

```js
// 比较从同一根音开始的不同调式
const modes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian']
const comparison = modes.map(mode => ({
  mode,
  notes: getScale('C', mode),
  intervals: getModeInterval(mode)
}))
```

### 算法作曲

```js
// 生成旋律序列
const melody = getNoteListByStep('C', 'M2', 8) // 全音音阶
const harmony = getNoteListByStep('C', 'M3', 4) // 增三和弦循环
```

## 🔧 TypeScript 支持

Bunny 使用 TypeScript 编写，提供全面的类型定义：

```typescript
import type { Interval, Mode, Note, SingleNoteList } from '@emotionl/bunny'

// 所有类型都已导出并可供使用
function createScale(root: Note, mode: Mode): SingleNoteList {
  return getScale(root, mode)
}
```

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。对于重大更改，请先开启 issue 讨论您想要更改的内容。

### 开发设置

```bash
# 克隆仓库
git clone https://github.com/emotionl/bunny.git
cd bunny

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 运行代码检查
pnpm lint
```

## 📄 许可证

MIT © [emotionl](https://github.com/emotionl/)

## 🙏 致谢

- 受音乐理论启发，满足简单、准确的音乐计算需求
- 使用现代 JavaScript/TypeScript 最佳实践构建
- 专为教育和生产使用而设计
