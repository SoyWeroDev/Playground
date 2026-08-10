import * as Tone from 'tone';

// Mapeo exacto basado en la afinación CUSTOM para el Acordeón en FA (Fa/Sib/Mib - FBEb)
// 34 Botones en distribución 11 - 12 - 11
const baseFBEb = {
  // Hilera 1 (Exterior - Fa) - 11 botones
  row1: [
    { push: 'Ab3', pull: 'D3' },
    { push: 'C3', pull: 'C3' },
    { push: 'Ab3', pull: 'Ab3' },
    { push: 'F3', pull: 'F3' },
    { push: 'D4', pull: 'D4' },
    { push: 'C4', pull: 'C4' },
    { push: 'Ab4', pull: 'Ab4' },
    { push: 'F4', pull: 'F4' },
    { push: 'D5', pull: 'D5' },
    { push: 'C5', pull: 'C5' },
    { push: 'B4', pull: 'B4' }
  ],
  
  // Hilera 2 (Medio - Sib) - 12 botones
  row2: [
    { push: 'C3', pull: 'G2' },
    { push: 'Bb2', pull: 'A2' },
    { push: 'Bb2', pull: 'G2' },
    { push: 'G3', pull: 'Eb3' },
    { push: 'Bb3', pull: 'C4' },
    { push: 'Bb3', pull: 'A3' },
    { push: 'G4', pull: 'G4' },
    { push: 'Bb4', pull: 'D5' },
    { push: 'Bb4', pull: 'C5' },
    { push: 'G5', pull: 'A4' },
    { push: 'Bb5', pull: 'G5' },
    { push: 'Db5', pull: 'G5' }
  ],

  // Hilera 3 (Interior - Mib) - 11 botones
  row3: [
    { push: 'D3', pull: 'Eb2' },
    { push: 'Eb3', pull: 'D3' },
    { push: 'Eb3', pull: 'Eb3' },
    { push: 'Bb3', pull: 'Bb3' },
    { push: 'Eb4', pull: 'F4' },
    { push: 'Eb4', pull: 'Eb4' },
    { push: 'Bb4', pull: 'Bb4' },
    { push: 'Eb5', pull: 'F5' },
    { push: 'Eb5', pull: 'Eb5' },
    { push: 'Bb5', pull: 'Bb5' },
    { push: 'Db6', pull: 'B5' }
  ]
};

// Función para transponer notas
function transposeNote(note, semitones) {
  if (!note) return note;
  return Tone.Frequency(note).transpose(semitones).toNote();
}

// Función para transponer todo el acordeón basado en el mapa base
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

// Exportamos las tres tonalidades norteñas basadas en esta afinación custom de FBEb
export const tunings = {
  'FBEb': baseFBEb,                               // Fa-Sib-Mib (Base Custom)
  'GCF': transposeAccordion(baseFBEb, 2),         // Sol-Do-Fa (2 semitonos arriba)
  'EAD': transposeAccordion(baseFBEb, -1),        // Mi-La-Re (1 semitono abajo)
};
