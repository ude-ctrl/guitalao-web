export async function playInterval(
  notes: number[],
  onNote: (index: number) => void,
  onEnd: () => void,
) {
  const context = new AudioContext();
  try {
    await context.resume();
  } catch (error) {
    await context.close();
    throw error;
  }
  const timers: ReturnType<typeof setTimeout>[] = [];
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    timers.forEach(clearTimeout);
    void context.close();
    onEnd();
  };
  notes.forEach((midi, index) => {
    const start = context.currentTime + 0.05 + index * 0.75;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(0.16, start + 0.015);
    envelope.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
    oscillator.connect(envelope).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.65);
    timers.push(setTimeout(() => onNote(index), 50 + index * 750));
  });
  timers.push(setTimeout(stop, 50 + notes.length * 750));
  return stop;
}
