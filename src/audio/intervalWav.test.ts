import { expect, it } from 'vitest';
import { intervalWav } from './intervalWav';
it('gera WAV PCM audível com duas notas e cabeçalho consistente', () => {
  const uri = intervalWav([69, 76]);
  const binary = atob(uri.split(',')[1]);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const view = new DataView(bytes.buffer);
  expect(binary.slice(0, 4)).toBe('RIFF');
  expect(binary.slice(8, 12)).toBe('WAVE');
  expect(view.getUint32(24, true)).toBe(22050);
  expect(view.getUint32(40, true)).toBe(bytes.length - 44);
  const peak = (from: number, to: number) => {
    let maximum = 0;
    for (let sample = from; sample < to; sample++)
      maximum = Math.max(
        maximum,
        Math.abs(view.getInt16(44 + sample * 2, true)),
      );
    return maximum;
  };
  expect(peak(0, 10000)).toBeGreaterThan(5000);
  expect(peak(22050, 32050)).toBeGreaterThan(5000);
  expect(peak(18000, 19000)).toBe(0);
});
