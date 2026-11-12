import { describe, expect, it } from 'vitest';
import {
  areEnharmonic,
  formatNote,
  normalizePitchClass,
  noteFromPitchClass,
  parseNote,
  pitchClass,
} from './notes';

describe('Notas e grafias enarmônicas', () => {
  it.each([
    ['C', 0, 'Dó'],
    ['D', 2, 'Ré'],
    ['E', 4, 'Mi'],
    ['F', 5, 'Fá'],
    ['G', 7, 'Sol'],
    ['A', 9, 'Lá'],
    ['B', 11, 'Si'],
    ['C#', 1, 'Dó♯'],
    ['Db', 1, 'Ré♭'],
    ['B#', 0, 'Si♯'],
    ['Cb', 11, 'Dó♭'],
    ['E#', 5, 'Mi♯'],
    ['Fb', 4, 'Fá♭'],
    ['F##', 7, 'Fá𝄪'],
    ['Bbb', 9, 'Si𝄫'],
  ])('interpreta %s como altura %s e nome %s', (input, value, display) => {
    const note = parseNote(String(input));
    expect(pitchClass(note)).toBe(value);
    expect(formatNote(note)).toBe(display);
  });
  it.each(['#', '♯'])('aceita sustenido %s', (symbol) =>
    expect(parseNote(`C${symbol}`)).toEqual(parseNote('C#')),
  );
  it.each(['##', '♯♯', 'x', '𝄪'])('aceita dobrado sustenido %s', (symbol) =>
    expect(parseNote(`F${symbol}`)).toEqual(parseNote('F##')),
  );
  it.each(['bb', '♭♭', '𝄫'])('aceita dobrado bemol %s', (symbol) =>
    expect(parseNote(`B${symbol}`)).toEqual(parseNote('Bbb')),
  );
  it('aceita caixa, espaços externos e bequadro explícito', () => {
    expect(parseNote(' c♮ ')).toEqual(parseNote('C'));
    expect(formatNote(parseNote('Db'), 'scientific')).toBe('D♭');
  });
  it('distingue nome escrito e equivalência sonora', () => {
    expect(parseNote('C#')).not.toEqual(parseNote('Db'));
    expect(areEnharmonic(parseNote('C#'), parseNote('Db'))).toBe(true);
    expect(areEnharmonic(parseNote('C'), parseNote('D'))).toBe(false);
  });
  const sharps = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];
  const flats = [
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
    'Ab',
    'A',
    'Bb',
    'B',
  ];
  it.each(sharps.map((name, pc) => ({ name, pc })))(
    'oferece as duas grafias para altura $pc',
    ({ name, pc }) => {
      expect(noteFromPitchClass(pc, 'sharps')).toEqual(parseNote(name));
      expect(noteFromPitchClass(pc, 'flats')).toEqual(parseNote(flats[pc]));
      expect(pitchClass(noteFromPitchClass(pc, 'flats'))).toBe(pc);
    },
  );
  it.each([
    [-13, 11],
    [-1, 11],
    [0, 0],
    [12, 0],
    [25, 1],
  ])('normaliza %s para %s', (input, expected) =>
    expect(normalizePitchClass(input)).toBe(expected),
  );
  it.each(['', 'H', 'C4', 'Dó', 'C###', 'Dbbb', 'C#b', 'C #', 'Cconstructor'])(
    'rejeita nota inválida %s',
    (input) => expect(() => parseNote(input)).toThrow(RangeError),
  );
  it.each([NaN, Infinity, 1.2, Number.MAX_SAFE_INTEGER + 1])(
    'rejeita altura inválida %s',
    (input) => expect(() => normalizePitchClass(input)).toThrow(RangeError),
  );
  it.each([-1, 12, NaN, 1.5])('rejeita classe de altura %s', (input) =>
    expect(() => noteFromPitchClass(input, 'sharps')).toThrow(RangeError),
  );
});
