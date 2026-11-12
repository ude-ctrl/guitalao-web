import {
  NOTE_LETTERS,
  pitchClass,
  normalizePitchClass,
  validateNote,
} from './notes';
import type { Accidental, Note } from './notes';

/** Ascending intervals up to the octave. A4 and d5 share sound distance, not spelling. */
export const NOTE_INTERVALS = {
  P1: { label: 'Uníssono justo', steps: 0, semitones: 0 },
  m2: { label: 'Segunda menor', steps: 1, semitones: 1 },
  M2: { label: 'Segunda maior', steps: 1, semitones: 2 },
  m3: { label: 'Terça menor', steps: 2, semitones: 3 },
  M3: { label: 'Terça maior', steps: 2, semitones: 4 },
  P4: { label: 'Quarta justa', steps: 3, semitones: 5 },
  A4: { label: 'Quarta aumentada', steps: 3, semitones: 6 },
  d5: { label: 'Quinta diminuta', steps: 4, semitones: 6 },
  P5: { label: 'Quinta justa', steps: 4, semitones: 7 },
  m6: { label: 'Sexta menor', steps: 5, semitones: 8 },
  M6: { label: 'Sexta maior', steps: 5, semitones: 9 },
  m7: { label: 'Sétima menor', steps: 6, semitones: 10 },
  M7: { label: 'Sétima maior', steps: 6, semitones: 11 },
  P8: { label: 'Oitava justa', steps: 7, semitones: 12 },
} as const;
export type NoteIntervalId = keyof typeof NOTE_INTERVALS;

/** Chromatic distance ascending modulo 12. Cannot distinguish unison and octave. */
export function ascendingSemitones(from: Note, to: Note): number {
  return normalizePitchClass(pitchClass(to) - pitchClass(from));
}

/** Transpose while preserving the diatonic interval (C# + M3 = E#, never F). */
export function transposeNote(note: Note, intervalId: NoteIntervalId): Note {
  validateNote(note);
  if (!Object.hasOwn(NOTE_INTERVALS, intervalId))
    throw new RangeError('Intervalo não suportado');
  const interval = NOTE_INTERVALS[intervalId];
  const letterIndex = NOTE_LETTERS.indexOf(note.letter);
  const letter = NOTE_LETTERS[(letterIndex + interval.steps) % 7];
  const destination = normalizePitchClass(
    pitchClass(note) + interval.semitones,
  );
  const accidental =
    normalizePitchClass(
      destination - pitchClass({ letter, accidental: 0 }) + 6,
    ) - 6;
  if (Math.abs(accidental) > 2)
    throw new RangeError(
      'Transposição exige mais de dois acidentes; escolha outra grafia de origem',
    );
  return { letter, accidental: accidental as Accidental };
}
