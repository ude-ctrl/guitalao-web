export const roots = [
  'Mi',
  'Fá',
  'Fá♯',
  'Sol',
  'Sol♯',
  'Lá',
  'Lá♯',
  'Si',
  'Dó',
  'Dó♯',
  'Ré',
  'Ré♯',
];
export const intervals = [
  { id: 'terca', label: 'Terça maior', degree: '3', semitones: 4 },
  { id: 'quinta', label: 'Quinta justa', degree: '5', semitones: 7 },
] as const;
export function intervalPositions(root: number, semitones: number) {
  return {
    rootFret: root,
    targetFret: root + semitones,
    rootMidi: 40 + root,
    targetMidi: 40 + root + semitones,
  };
}
