/** Written pitch, without octave. C=Do; accidental is measured in semitones. */
export type NoteLetter = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type Accidental = -2 | -1 | 0 | 1 | 2;
export interface Note {
  readonly letter: NoteLetter;
  readonly accidental: Accidental;
}
export type AccidentalPreference = 'sharps' | 'flats';

export const NOTE_LETTERS: readonly NoteLetter[] = [
  'C',
  'D',
  'E',
  'F',
  'G',
  'A',
  'B',
];
const NATURAL_PITCH: Record<NoteLetter, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};
const PORTUGUESE_NAMES: Record<NoteLetter, string> = {
  C: 'Dó',
  D: 'Ré',
  E: 'Mi',
  F: 'Fá',
  G: 'Sol',
  A: 'Lá',
  B: 'Si',
};
const ACCIDENTALS: Record<string, Accidental> = {
  '': 0,
  '♮': 0,
  '#': 1,
  '♯': 1,
  b: -1,
  '♭': -1,
  '##': 2,
  '♯♯': 2,
  x: 2,
  '𝄪': 2,
  bb: -2,
  '♭♭': -2,
  '𝄫': -2,
};

export function requireInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value))
    throw new RangeError(`${label}: inteiro seguro esperado`);
}

/** Wrap a signed semitone count into C-based pitch classes 0..11. */
export function normalizePitchClass(value: number): number {
  requireInteger(value, 'Altura');
  return ((value % 12) + 12) % 12;
}

export function validateNote(note: Note): void {
  if (!Object.hasOwn(NATURAL_PITCH, note.letter))
    throw new RangeError('Letra de nota inválida');
  requireInteger(note.accidental, 'Acidente');
  if (Math.abs(note.accidental) > 2)
    throw new RangeError('Acidente fora do limite de dois semitons');
}

/** Accepts scientific letters and an optional accidental, never octave numbers. */
export function parseNote(value: string): Note {
  const match = /^([A-Ga-g])(.*)$/u.exec(value.trim());
  if (!match || !Object.hasOwn(ACCIDENTALS, match[2]))
    throw new RangeError(`Nota inválida: ${value}`);
  return {
    letter: match[1].toUpperCase() as NoteLetter,
    accidental: ACCIDENTALS[match[2]],
  };
}

export function pitchClass(note: Note): number {
  validateNote(note);
  return normalizePitchClass(NATURAL_PITCH[note.letter] + note.accidental);
}

/** Equality of sound in twelve-tone equal temperament, not equality of spelling. */
export function areEnharmonic(first: Note, second: Note): boolean {
  return pitchClass(first) === pitchClass(second);
}

/** A display spelling without harmonic context. Transposition uses interval spelling instead. */
export function noteFromPitchClass(
  value: number,
  preference: AccidentalPreference,
): Note {
  requireInteger(value, 'Classe de altura');
  if (value < 0 || value > 11)
    throw new RangeError('Classe de altura deve estar entre 0 e 11');
  if (preference !== 'sharps' && preference !== 'flats')
    throw new RangeError('Preferência de grafia inválida');
  const names =
    preference === 'sharps'
      ? ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      : ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  return parseNote(names[value]);
}

export function formatNote(
  note: Note,
  language: 'pt' | 'scientific' = 'pt',
): string {
  validateNote(note);
  const accidental = { '-2': '𝄫', '-1': '♭', '0': '', '1': '♯', '2': '𝄪' }[
    note.accidental
  ];
  return `${language === 'pt' ? PORTUGUESE_NAMES[note.letter] : note.letter}${accidental}`;
}
