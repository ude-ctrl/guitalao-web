import { afterEach, expect, it, vi } from 'vitest';
import { playInterval } from './intervalPlayer';
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
it('agenda tônica e intervalo, e interrompe o áudio e os destaques', async () => {
  vi.useFakeTimers();
  const frequencies: number[] = [];
  const close = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal(
    'AudioContext',
    class {
      state = 'running';
      currentTime = 0;
      destination = {};
      resume = vi.fn().mockResolvedValue(undefined);
      close = close;
      createOscillator() {
        const frequency = { value: 0 };
        return {
          frequency,
          type: '',
          connect: vi.fn().mockReturnValue({ connect: vi.fn() }),
          start: () => frequencies.push(frequency.value),
          stop: vi.fn(),
        };
      }
      createGain() {
        return {
          gain: {
            setValueAtTime: vi.fn(),
            linearRampToValueAtTime: vi.fn(),
            exponentialRampToValueAtTime: vi.fn(),
          },
        };
      }
    },
  );
  const onNote = vi.fn();
  const onEnd = vi.fn();
  const stop = await playInterval([69, 76], onNote, onEnd);
  expect(frequencies[0]).toBe(440);
  expect(frequencies[1]).toBeCloseTo(659.255, 2);
  vi.advanceTimersByTime(50);
  expect(onNote).toHaveBeenCalledWith(0);
  stop();
  vi.runAllTimers();
  expect(close).toHaveBeenCalledOnce();
  expect(onEnd).toHaveBeenCalledOnce();
  expect(onNote).toHaveBeenCalledTimes(1);
});

it('inicia o contexto durante o clique, antes de aguardar a reprodução', async () => {
  const resume = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal(
    'AudioContext',
    class {
      state = 'suspended';
      resume = resume;
      close = vi.fn().mockResolvedValue(undefined);
    },
  );
  const playback = playInterval([45, 49], vi.fn(), vi.fn());
  expect(resume).toHaveBeenCalledOnce();
  await expect(playback).rejects.toThrow('Áudio suspenso');
});
