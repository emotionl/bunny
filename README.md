# Bunny 🐰

[![npm version](https://badge.fury.io/js/@emotionl%2Fbunny.svg)](https://badge.fury.io/js/@emotionl%2Fbunny)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[English](https://github.com/emotionl/bunny/blob/main/README.md) | [中文](https://github.com/emotionl/bunny/blob/main/README.zh-CN.md)

A lightweight JavaScript library for music theory calculations. Bunny provides intuitive methods and constants for scales, intervals, modes, and other music theory concepts.

## ✨ Features

- 🎵 Generate scales across 18 different modes (including pentatonic, blues, bebop, and harmonic scales)
- 🔄 Work with the circle of fifths and relative keys
- 🎼 Create note sequences based on intervals
- 🎹 Support for both sharp and flat notations
- 📊 Access semitone patterns and interval calculations
- 🔧 Full TypeScript support with comprehensive type definitions
- 🚀 Zero dependencies and lightweight (~5KB)

## 📦 Installation

```bash
# Using npm
npm install @emotionl/bunny --save

# Using yarn
yarn add @emotionl/bunny

# Using pnpm
pnpm add @emotionl/bunny
```

## 🚀 Quick Start

```js
import { getCircleOfFifthList, getNoteListByStep, getScale } from '@emotionl/bunny'

// Get C Major scale
const cMajor = getScale('C', 'Ionian')
console.log(cMajor) // ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// Get circle of fifths
const circleOfFifths = getCircleOfFifthList()
console.log(circleOfFifths[0]) // { major: 'C', minor: 'A' }

// Generate a sequence of perfect fifths
const fifths = getNoteListByStep('C', 'P5', 7)
console.log(fifths) // ['C', 'G', 'D', 'A', 'E', 'B', 'F♯']
```

## 📚 API Reference

### Scales

#### `getScale(key: Note, mode: Mode, isSharp?: boolean, withOctave?: boolean): SingleNoteList`

Returns the scale notes for a specified mode.

**Parameters:**

- `key`: The tonic note of the scale
- `mode`: The mode name (see [Supported Modes](#-supported-modes))
- `isSharp`: Use sharps (♯) or flats (♭) notation (default: `true`)
- `withOctave`: Include an octave note at the end (default: `false`)

**Returns:** Array of notes in the scale

**Examples:**

```js
import { getScale } from '@emotionl/bunny'

// Major scale (Ionian mode)
const cMajor = getScale('C', 'Ionian')
// ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// Minor scale (Aeolian mode) with octave
const aMinor = getScale('A', 'Aeolian', true, true)
// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']

// Dorian mode using flats
const dDorian = getScale('D', 'Dorian', false)
// ['D', 'E', 'F', 'G', 'A', 'B', 'C']

// Pentatonic scale
const cPentatonic = getScale('C', 'Major Pentatonic')
// ['C', 'D', 'E', 'G', 'A']

// Blues scale
const cBlues = getScale('C', 'Blues Scale')
// ['C', 'E♭', 'F', 'G♭', 'G', 'B♭']
```

### Circle of Fifths & Harmony

#### `getCircleOfFifthList(isSharp?: boolean): CircleOfFifthList`

Returns the complete circle of fifths with major and relative minor keys.

**Parameters:**

- `isSharp`: Use sharps (♯) or flats (♭) notation (default: `true`)

**Returns:** Array of objects with major and minor key pairs

**Example:**

```js
import { getCircleOfFifthList } from '@emotionl/bunny'

const circleOfFifths = getCircleOfFifthList()
console.log(circleOfFifths)
// [
//   { major: 'C', minor: 'A' },
//   { major: 'G', minor: 'E' },
//   { major: 'D', minor: 'B' },
//   // ... continues for all 12 keys
// ]

// Using flats
const circleWithFlats = getCircleOfFifthList(false)
```

#### `getRelativeMinorKey(majorKey: Note, isSharp?: boolean): Note`

Returns the relative minor key for a given major key.

**Parameters:**

- `majorKey`: The major key note
- `isSharp`: Use sharps (♯) or flats (♭) notation (default: `true`)

**Returns:** The relative minor key note

**Example:**

```js
import { getRelativeMinorKey } from '@emotionl/bunny'

const relativeMinor = getRelativeMinorKey('C') // 'A'
const relativeMinorFlat = getRelativeMinorKey('F', false) // 'D'
```

### Note Sequences

#### `getNoteListByStep(startNote: Note, interval: Interval, amount: number, isSharp?: boolean): SingleNoteList`

Generates a sequence of notes following a specified interval pattern.

**Parameters:**

- `startNote`: The starting note
- `interval`: The interval to step by (see [Supported Intervals](#-supported-intervals))
- `amount`: Number of notes to generate
- `isSharp`: Use sharps (♯) or flats (♭) notation (default: `true`)

**Returns:** Array of notes following the interval pattern

**Examples:**

```js
import { getNoteListByStep } from '@emotionl/bunny'

// Perfect fifths (great for chord progressions)
const fifths = getNoteListByStep('C', 'P5', 7)
// ['C', 'G', 'D', 'A', 'E', 'B', 'F♯']

// Major thirds (for augmented chords)
const majorThirds = getNoteListByStep('C', 'M3', 4)
// ['C', 'E', 'G♯', 'C']

// Perfect fourths (for quartal harmony)
const fourths = getNoteListByStep('C', 'P4', 5)
// ['C', 'F', 'B♭', 'E♭', 'A♭']
```

### Mode Analysis

#### `getModeSemitone(mode: Mode, withOctave?: boolean): number[]`

Returns the semitone pattern for a specified mode.

**Parameters:**

- `mode`: The mode name
- `withOctave`: Include octave semitone (default: `false`)

**Returns:** Array of semitone intervals from the root

**Example:**

```js
import { getModeSemitone } from '@emotionl/bunny'

const majorSemitones = getModeSemitone('Ionian')
// [0, 2, 4, 5, 7, 9, 11]

const dorianSemitones = getModeSemitone('Dorian')
// [0, 2, 3, 5, 7, 9, 10]
```

#### `getModeInterval(mode: Mode, withOctave?: boolean): Interval[]`

Returns the interval pattern for a specified mode.

**Parameters:**

- `mode`: The mode name
- `withOctave`: Include octave interval (default: `false`)

**Returns:** Array of intervals from the root

**Example:**

```js
import { getModeInterval } from '@emotionl/bunny'

const majorIntervals = getModeInterval('Ionian')
// ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']

const minorIntervals = getModeInterval('Aeolian')
// ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7']
```

#### `getModeList(): ModeList`

Returns all available mode names.

**Returns:** Array of all supported mode names

**Example:**

```js
import { getModeList } from '@emotionl/bunny'

const allModes = getModeList()
console.log(allModes.length) // 18 modes available
```

## 🎼 Supported Modes

Bunny supports 18 different modes and scales:

### Church Modes (7 notes)

- **Ionian** - Major scale (W-W-H-W-W-W-H)
- **Dorian** - Natural minor with raised 6th
- **Phrygian** - Natural minor with lowered 2nd
- **Lydian** - Major with raised 4th
- **Mixolydian** - Major with lowered 7th
- **Aeolian** - Natural minor scale
- **Locrian** - Diminished scale

### Pentatonic Scales (5 notes)

- **Major Pentatonic** - Major scale without 4th and 7th
- **Minor Pentatonic** - Minor scale without 2nd and 6th
- **Mixolydian Pentatonic** - Mixolydian without 2nd and 6th

### Jazz & Blues Scales

- **Blues Scale** - Minor pentatonic with added ♭5
- **Harmonic Minor** - Minor with raised 7th
- **Melodic Minor** - Minor with raised 6th and 7th
- **Bebop Major** - Major with added ♯5
- **Bebop Minor** - Minor with added ♮6
- **Bebop Dominant** - Mixolydian with added ♮7
- **Bebop Dorian** - Dorian with added ♮3

## 🎵 Supported Intervals

| Interval       | Symbol | Semitones | Description                    |
| -------------- | ------ | --------- | ------------------------------ |
| Perfect Unison | P1     | 0         | Same note                      |
| Minor Second   | m2     | 1         | Half step                      |
| Major Second   | M2     | 2         | Whole step                     |
| Minor Third    | m3     | 3         | Minor third                    |
| Major Third    | M3     | 4         | Major third                    |
| Perfect Fourth | P4     | 5         | Perfect fourth                 |
| Tritone        | d5/A4  | 6         | Diminished 5th / Augmented 4th |
| Perfect Fifth  | P5     | 7         | Perfect fifth                  |
| Minor Sixth    | m6     | 8         | Minor sixth                    |
| Major Sixth    | M6     | 9         | Major sixth                    |
| Minor Seventh  | m7     | 10        | Minor seventh                  |
| Major Seventh  | M7     | 11        | Major seventh                  |
| Perfect Octave | P8     | 12        | Octave                         |

## 🎹 Supported Notes

Bunny supports all 12 chromatic notes with both sharp and flat representations:

**Natural Notes:** C, D, E, F, G, A, B

**Accidental Notes:**

- **Sharps:** C♯, D♯, F♯, G♯, A♯
- **Flats:** D♭, E♭, G♭, A♭, B♭

## 💡 Use Cases

### Music Production

```js
// Generate chord progressions
const progression = ['C', 'Am', 'F', 'G'].map(chord =>
  getScale(chord.replace('m', ''), chord.includes('m') ? 'Aeolian' : 'Ionian')
)

// Create bass lines using circle of fifths
const bassLine = getCircleOfFifthList().slice(0, 4).map(key => key.major)
```

### Music Education

```js
// Compare different modes starting from the same root
const modes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian']
const comparison = modes.map(mode => ({
  mode,
  notes: getScale('C', mode),
  intervals: getModeInterval(mode)
}))
```

### Algorithmic Composition

```js
// Generate melodic sequences
const melody = getNoteListByStep('C', 'M2', 8) // Whole tone scale
const harmony = getNoteListByStep('C', 'M3', 4) // Augmented triad cycle
```

## 🔧 TypeScript Support

Bunny is written in TypeScript and provides comprehensive type definitions:

```typescript
import type { Interval, Mode, Note, SingleNoteList } from '@emotionl/bunny'

// All types are exported and available for use
function createScale(root: Note, mode: Mode): SingleNoteList {
  return getScale(root, mode)
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/emotionl/bunny.git
cd bunny

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run linting
pnpm lint
```

## 📄 License

MIT © [emotionl](https://github.com/emotionl/)

## 🙏 Acknowledgments

- Inspired by music theory and the need for simple, accurate music calculations
- Built with modern JavaScript/TypeScript best practices
- Designed for both educational and production use
