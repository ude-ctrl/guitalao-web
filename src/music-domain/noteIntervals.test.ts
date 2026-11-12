import { describe, expect, it } from 'vitest';
import {
  NOTE_INTERVALS,
  ascendingSemitones,
  transposeNote,
} from './noteIntervals';
import type { NoteIntervalId } from './noteIntervals';
import { areEnharmonic, parseNote, pitchClass } from './notes';

describe('Intervalos e grafia diatônica', () => {
  const cases = [
    ['C', 'E', 'G'],
    ['Db', 'F', 'Ab'],
    ['D', 'F#', 'A'],
    ['Eb', 'G', 'Bb'],
    ['E', 'G#', 'B'],
    ['F', 'A', 'C'],
    ['F#', 'A#', 'C#'],
    ['G', 'B', 'D'],
    ['Ab', 'C', 'Eb'],
    ['A', 'C#', 'E'],
    ['Bb', 'D', 'F'],
    ['B', 'D#', 'F#'],
  ];
  it.each(cases)('terças e quintas corretas em %s', (root, third, fifth) => {
    expect(transposeNote(parseNote(root), 'M3')).toEqual(parseNote(third));
    expect(transposeNote(parseNote(root), 'P5')).toEqual(parseNote(fifth));
  });
  const fromC: [NoteIntervalId, string, number][] = [
    ['P1', 'C', 0],
    ['m2', 'Db', 1],
    ['M2', 'D', 2],
    ['m3', 'Eb', 3],
    ['M3', 'E', 4],
    ['P4', 'F', 5],
    ['A4', 'F#', 6],
    ['d5', 'Gb', 6],
    ['P5', 'G', 7],
    ['m6', 'Ab', 8],
    ['M6', 'A', 9],
    ['m7', 'Bb', 10],
    ['M7', 'B', 11],
    ['P8', 'C', 12],
  ];
  it.each(fromC)('Dó + %s = %s (%s semitons)', (id, expected, semitones) => {
    expect(transposeNote(parseNote('C'), id)).toEqual(parseNote(expected));
    expect(NOTE_INTERVALS[id].semitones).toBe(semitones);
  });
  it.each(cases)('confere todos os intervalos cromáticos em %s', (root) => {
    for (const [id, , distance] of fromC) {
      const origin = parseNote(root);
      const result = transposeNote(origin, id);
      expect(pitchClass(result)).toBe((pitchClass(origin) + distance) % 12);
      expect(ascendingSemitones(origin, result)).toBe(distance % 12);
    }
  });
  it.each([
    ['C#', 'M3', 'E#'],
    ['Gb', 'P4', 'Cb'],
    ['G#', 'M7', 'F##'],
    ['Cb', 'm3', 'Ebb'],
    ['B#', 'M3', 'D##'],
    ['F#', 'P8', 'F#'],
  ] as const)('preserva a grafia em %s + %s = %s', (root, id, expected) =>
    expect(transposeNote(parseNote(root), id)).toEqual(parseNote(expected)),
  );
  it('trítono tem duas grafias conforme o intervalo', () => {
    const fourth = transposeNote(parseNote('C'), 'A4');
    const fifth = transposeNote(parseNote('C'), 'd5');
    expect(fourth.letter).toBe('F');
    expect(fifth.letter).toBe('G');
    expect(areEnharmonic(fourth, fifth)).toBe(true);
  });
  it('distância ascendente cruza o Dó e não indica registro', () => {
    expect(ascendingSemitones(parseNote('B'), parseNote('C'))).toBe(1);
    expect(ascendingSemitones(parseNote('C'), parseNote('B'))).toBe(11);
    expect(ascendingSemitones(parseNote('B#'), parseNote('C'))).toBe(0);
  });
  it('não muda os argumentos', () => {
    const root = Object.freeze(parseNote('C#'));
    expect(transposeNote(root, 'M3')).toEqual(parseNote('E#'));
    expect(root).toEqual(parseNote('C#'));
  });
  it('rejeita grafia que exigiria acidente triplo', () =>
    expect(() => transposeNote(parseNote('B##'), 'M3')).toThrow(RangeError));
});
