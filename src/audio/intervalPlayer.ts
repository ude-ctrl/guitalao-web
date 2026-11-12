export async function playInterval(
  notes: number[],
  onNote: (index: number) => void,
  onEnd: () => void,
) {
  // Create and resume synchronously during the user's click, before any await.
  const AudioContextClass =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) throw new Error('Web Audio indisponível');
  const context = new AudioContextClass();
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      context.resume(),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error('Áudio bloqueado pelo navegador')),
          3000,
        );
      }),
    ]);
    if (context.state !== 'running')
      throw new Error('Áudio suspenso pelo navegador');
  } catch (error) {
    void context.close().catch(() => {});
    throw error;
  } finally {
    clearTimeout(timeout);
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
