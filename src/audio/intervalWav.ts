// PCM mono WAV, generated locally; no downloads or external audio services.
const cache = new Map<string, string>();
export function intervalWav(notes: number[]): string {
  const key = notes.join(',');
  const cached = cache.get(key);
  if (cached) return cached;
  const rate = 22050;
  const slot = 0.9;
  const samples = Math.ceil(notes.length * slot * rate);
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);
  const text = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i++)
      view.setUint8(offset + i, value.charCodeAt(i));
  };
  text(0, 'RIFF');
  view.setUint32(4, 36 + samples * 2, true);
  text(8, 'WAVE');
  text(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, 'data');
  view.setUint32(40, samples * 2, true);
  for (let i = 0; i < samples; i++) {
    const time = i / rate;
    const index = Math.min(Math.floor(time / slot), notes.length - 1);
    const local = time - index * slot;
    const envelope = Math.min(local / 0.02, 1) * Math.max(0, 1 - local / 0.75);
    const phase = 2 * Math.PI * 440 * 2 ** ((notes[index] - 69) / 12) * local;
    const wave =
      Math.sin(phase) + 0.4 * Math.sin(2 * phase) + 0.2 * Math.sin(3 * phase);
    view.setInt16(44 + i * 2, Math.round(wave * envelope * 0.3 * 32767), true);
  }
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const uri = `data:audio/wav;base64,${btoa(binary)}`;
  if (cache.size >= 32) cache.clear();
  cache.set(key, uri);
  return uri;
}
