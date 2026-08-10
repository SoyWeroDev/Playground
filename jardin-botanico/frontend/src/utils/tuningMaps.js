import * as Tone from 'tone';

// Mapeo exacto basado en las imágenes del acordeón GCF (Sol)
const baseGCF = {
  // Fila 1 (Izquierda) - Tonalidad G (Sol) - 11 botones
  row1: [
    { push: 'C#3', pull: 'D#3' }, // Do# / Mib
    { push: 'G3', pull: 'A3' },   // Sol / La
    { push: 'B3', pull: 'C4' },   // Si / Do
    { push: 'D4', pull: 'E4' },   // Re / Mi
    { push: 'G4', pull: 'F#4' },  // Sol / Fa#
    { push: 'B4', pull: 'A4' },   // Si / La
    { push: 'D5', pull: 'C5' },   // Re / Do
    { push: 'G5', pull: 'E5' },   // Sol / Mi
    { push: 'B5', pull: 'F#5' },  // Si / Fa#
    { push: 'D6', pull: 'A5' },   // Re / La
    { push: 'G6', pull: 'C6' },   // Sol / Do
  ],
  // Fila 2 (Medio) - Tonalidad C (Do) - 12 botones
  row2: [
    { push: 'F#3', pull: 'G#3' }, // Fa# / Sol#
    { push: 'G3', pull: 'B3' },   // Sol / Si
    { push: 'C4', pull: 'D4' },   // Do / Re
    { push: 'E4', pull: 'F4' },   // Mi / Fa
    { push: 'G4', pull: 'A4' },   // Sol / La
    { push: 'C5', pull: 'B4' },   // Do / Si
    { push: 'E5', pull: 'D5' },   // Mi / Re
    { push: 'G5', pull: 'F5' },   // Sol / Fa
    { push: 'C6', pull: 'A5' },   // Do / La
    { push: 'E6', pull: 'B5' },   // Mi / Si
    { push: 'G6', pull: 'D6' },   // Sol / Re
    { push: 'C7', pull: 'F6' },   // Do / Fa
  ],
  // Fila 3 (Derecha) - Tonalidad F (Fa) - 11 botones
  row3: [
    { push: 'D#3', pull: 'C#3' }, // Mib / Do#
    { push: 'C4', pull: 'E3' },   // Do / Mi
    { push: 'F4', pull: 'G3' },   // Fa / Sol
    { push: 'A4', pull: 'Bb3' },  // La / Sib
    { push: 'C5', pull: 'D4' },   // Do / Re
    { push: 'F5', pull: 'E4' },   // Fa / Mi
    { push: 'A5', pull: 'G4' },   // La / Sol
    { push: 'C6', pull: 'Bb4' },  // Do / Sib
    { push: 'F6', pull: 'D5' },   // Fa / Re
    { push: 'A6', pull: 'E5' },   // La / Mi
    { push: 'C7', pull: 'G5' },   // Do / Sol
  ]
};

// Función para transponer notas
function transposeNote(note, semitones) {
  if (!note) return note;
  // Tone.Frequency acepta C#3, D#3 etc. y lo transpone
  return Tone.Frequency(note).transpose(semitones).toNote();
}

// Función para transponer todo el acordeón
function transposeAccordion(baseMap, semitones) {
  const newMap = {};
  for (const row in baseMap) {
    newMap[row] = baseMap[row].map(button => ({
      push: transposeNote(button.push, semitones),
      pull: transposeNote(button.pull, semitones)
    }));
  }
  return newMap;
}

// Exportamos las tres tonalidades norteñas
export const tunings = {
  'GCF': baseGCF, // Sol-Do-Fa (Base)
  'FBEb': transposeAccordion(baseGCF, -2), // Fa-Sib-Mib (2 semitonos abajo de GCF)
  'EAD': transposeAccordion(baseGCF, -3),  // Mi-La-Re (3 semitonos abajo de GCF)
};
