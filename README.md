# **Bunny🐰**

Bunny is a JavaScript library for music theory calculations, providing some common methods and constants for music theory calculations.

## **Installation**

Install via npm:

```bash
npm install @emotionl/bunny --save
```

## **API**

### **`getScale(key: Note, mode: Mode, isSharp: boolean = true, withOctave: boolean = false): SingleNoteList`**

Gets the scale of a specified mode.

- `key`: The tonic of the scale.
- `mode`: The name of the mode.
- `isSharp`: Whether to use sharps or flats in the scale (default is `true`).
- `withOctave`: Whether to include an octave of notes (default is `false`).
- Returns: An array containing a list of notes.

### **`getCircleOfFifthList(isSharp: boolean = true): CircleOfFifthList`**

Gets the circle of fifths for all modes.

- `isSharp`: Whether to use sharps or flats in the modes (default is `true`).
- Returns: An array of objects containing the name of the mode and the notes for the major and relative minor keys.

### **`getNoteListByStep(startNote: Note, interval: Interval, amount: number, isSharp: boolean = true): SingleNoteList`**

Gets a list of notes starting from a specified note and following a specified interval pattern.

- `startNote`: The starting note.
- `interval`: The interval pattern.
- `amount`: The number of notes to include in the list.
- `isSharp`: Whether to use sharps or flats in the notes (default is `true`).
- Returns: An array containing a list of notes.

### **`getModeSemitone(mode: Mode, withOctave: boolean = false): number[]`**

Gets the list of semitones for a specified mode.

- `mode`: The name of the mode.
- `withOctave`: Whether to include an octave of notes (default is `false`).
- Returns: An array containing a list of semitones.

### **`getModeList(): ModeList`**

Gets the list of mode names.

- Returns: An array containing a list of mode names.

### **`getModeInterval(mode: Mode, withOctave: boolean = false): Interval[]`**

Gets the list of intervals for a specified mode.

- `mode`: The name of the mode.
- `withOctave`: Whether to include an octave of notes (default is `false`).
- Returns: An array containing a list of intervals.

## **License**

MIT.
