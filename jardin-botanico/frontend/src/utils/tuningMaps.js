import * as Tone from 'tone';

// Mapeo exacto proporcionado para el Acordeón en FA (Fa/Sib/Mib - FBEb)
// 34 Botones en distribución 11 - 12 - 11
const baseFBEb = {
  // Hilera 1 (Exterior - Fa) - 11 botones
  row1: [
    { push: 'Gb3', pull: 'Ab3' },
    { push: 'E3', pull: 'Gb3' },
    { push: 'B3', pull: 'Db4' },
    { push: 'F3', pull: 'G3' },
    { push: 'A3', pull: 'Bb3' },
    { push: 'C4', pull: 'D4' },
    { push: 'F4', pull: 'E4' },
    { push: 'A4', pull: 'G4' },
    { push: 'C5', pull: 'Bb4' },
    { push: 'F5', pull: 'D5' },
    { push: 'A5', pull: 'E5' }
  ],
  
  // Hilera 2 (Medio - Sib) - 12 botones
  row2: [
    { push: 'F3', pull: 'A3' },
    { push: 'Bb3', pull: 'C4' },
    { push: 'D4', pull: 'Eb4' },
    { push: 'F4', pull: 'G4' },
    { push: 'Bb4', pull: 'A4' },
    { push: 'D5', pull: 'C5' },
    { push: 'F5', pull: 'Eb5' },
    { push: 'Bb5', pull: 'G5' },
    { push: 'D6', pull: 'A5' },
    { push: 'F6', pull: 'C6' },
    { push: 'Bb6', pull: 'Eb6' },
    { push: 'D7', pull: 'F6' }
  ],

  // Hilera 3 (Interior - Mib) - 11 botones
  row3: [
    { push: 'Db4', pull: 'B3' },
    { push: 'Bb3', pull: 'D4' },
    { push: 'Eb4', pull: 'F4' },
    { push: 'G4', pull: 'Ab4' },
    { push: 'Bb4', pull: 'C5' },
    { push: 'Eb5', pull: 'D5' },
    { push: 'G5', pull: 'F5' },
    { push: 'Bb5', pull: 'Ab5' },
    { push: 'Eb6', pull: 'C6' },
    { push: 'G6', pull: 'D6' },
    { push: 'Bb6', pull: 'F6' }
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

// Exportamos las tres tonalidades norteñas basadas ahora en FBEb
export const tunings = {
  'FBEb': baseFBEb,                               // Fa-Sib-Mib (Base)
  'GCF': transposeAccordion(baseFBEb, 2),         // Sol-Do-Fa (2 semitonos arriba de FBEb)
  'EAD': transposeAccordion(baseFBEb, -1),        // Mi-La-Re (1 semitono abajo de FBEb)
};
