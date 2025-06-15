# Bunny 🐰

A lightweight JavaScript library for music theory calculations. Bunny provides intuitive methods and constants for scales, intervals, modes, and other music theory concepts.

## Installation

```bash
# Using npm
npm install @emotionl/bunny --save

# Using yarn
yarn add @emotionl/bunny

# Using pnpm
pnpm add @emotionl/bunny
```

## Features

- Generate scales across different modes
- Work with the circle of fifths
- Create note lists based on intervals
- Access semitone patterns for modes
- Calculate intervals for different modes

## API Reference

### Scales

#### `getScale(key: Note, mode: Mode, isSharp: boolean = true, withOctave: boolean = false): SingleNoteList`

Returns the scale notes for a specified mode.

**Parameters:**

- `key`: The tonic of the scale
- `mode`: The name of the mode
- `isSharp`: Use sharps or flats notation (default: `true`)
- `withOctave`: Include an octave of notes (default: `false`)

**Returns:** Array of notes in the scale

**Example:**

```js
import { getScale } from '@emotionl/bunny'

// Get C Major scale
const cMajor = getScale('C', 'ionian') // ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// Get D Dorian scale with octave
const dDorian = getScale('D', 'dorian', true, true) // ['D', 'E', 'F', 'G', 'A', 'B', 'C', 'D']

// Get Bb Mixolydian scale (using flats)
const bFlatMixolydian = getScale('Bb', 'mixolydian', false) // ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'Ab']
```

### Circle of Fifths

#### `getCircleOfFifthList(isSharp: boolean = true): CircleOfFifthList`

Returns the circle of fifths for all modes.

**Parameters:**

- `isSharp`: Use sharps or flats notation (default: `true`)

**Returns:** Array of objects containing the mode name and notes for major and relative minor keys

**Example:**

```js
import { getCircleOfFifthList } from '@emotionl/bunny'

const circleOfFifths = getCircleOfFifthList()
console.log(circleOfFifths[0]) // First entry in the circle of fifths
```

### Note Sequences

#### `getNoteListByStep(startNote: Note, interval: Interval, amount: number, isSharp: boolean = true): SingleNoteList`

Generates a sequence of notes following a specified interval pattern.

**Parameters:**

- `startNote`: The starting note
- `interval`: The interval pattern to follow
- `amount`: Number of notes to include
- `isSharp`: Use sharps or flats notation (default: `true`)

**Returns:** Array of notes following the interval pattern

**Example:**

```js
import { getNoteListByStep } from '@emotionl/bunny'

// Generate a sequence of perfect fifths starting from C
const fifths = getNoteListByStep('C', 'P5', 7) // ['C', 'G', 'D', 'A', 'E', 'B', 'F#']
```

### Mode Functions

#### `getModeSemitone(mode: Mode, withOctave: boolean = false): number[]`

Returns the semitone pattern for a specified mode.

**Parameters:**

- `mode`: The name of the mode
- `withOctave`: Include an octave (default: `false`)

**Returns:** Array of semitone values

#### `getModeList(): ModeList`

Returns all available mode names.

**Returns:** Array of mode names

#### `getModeInterval(mode: Mode, withOctave: boolean = false): Interval[]`

Returns the interval pattern for a specified mode.

**Parameters:**

- `mode`: The name of the mode
- `withOctave`: Include an octave (default: `false`)

**Returns:** Array of intervals

## Types

The library includes TypeScript type definitions for all functions and return values.

## License

MIT
