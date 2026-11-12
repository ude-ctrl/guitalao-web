import { describe, expect, it } from 'vitest';
import { intervalPositions, intervals, roots } from './intervals';
describe('Intervalos na sexta corda, afinação padrão', () => {
  it.each(roots.map((name, root) => ({ name, root })))(
    'preserva as distâncias em $name',
    ({ root }) => {
      for (const interval of intervals) {
        const positions = intervalPositions(root, interval.semitones);
        expect(positions.rootMidi).toBe(40 + root);
        expect(positions.targetMidi - positions.rootMidi).toBe(
          interval.semitones,
        );
        expect(positions.targetFret - positions.rootFret).toBe(
          interval.semitones,
        );
      }
    },
  );
  it('posiciona Lá e sua terça maior na sexta corda', () => {
    expect(intervalPositions(5, 4)).toEqual({
      rootFret: 5,
      targetFret: 9,
      rootMidi: 45,
      targetMidi: 49,
    });
  });
});
