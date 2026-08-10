import * as Tone from 'tone';

// Generamos el mapeo base para un Acordeón SolDoFa (GCF) de 34 botones
// Un acordeón de 34 botones típicamente tiene 3 hileras: Exterior (12), Medio (11), Interior (11)
const baseGCF = {
  // Fila 1 (Exterior) - Tonalidad G (Sol) - 12 botones
  row1: [
    { push: 'G2', pull: 'A2' },   // Botón extra 1
    { push: 'B2', pull: 'C3' },   // Botón extra 2
    { push: 'D3', pull: 'F#3' },
    { push: 'G3', pull: 'A3' },
    { push: 'B3', pull: 'C4' },
    { push: 'D4', pull: 'E4' },
    { push: 'G4', pull: 'F#4' },
    { push: 'B4', pull: 'A4' },
    { push: 'D5', pull: 'C5' },
    { push: 'G5', pull: 'E5' },
    { push: 'B5', pull: 'F#5' },
    { push: 'D6', pull: 'A5' },
  ],
  // Fila 2 (Medio) - Tonalidad C (Do) - 11 botones
  row2: [
    { push: 'C3', pull: 'D3' },   // Botón extra
    { push: 'E3', pull: 'F3' },
    { push: 'G3', pull: 'A3' },
    { push: 'C4', pull: 'B3' },
    { push: 'E4', pull: 'D4' },
    { push: 'G4', pull: 'F4' },
    { push: 'C5', pull: 'A4' },
    { push: 'E5', pull: 'B4' },
    { push: 'G5', pull: 'D5' },
    { push: 'C6', pull: 'F5' },
    { push: 'E6', pull: 'A5' },
  ],
  // Fila 3 (Interior) - Tonalidad F (Fa) - 11 botones
  row3: [
    { push: 'F3', pull: 'G3' },   // Botón extra
    { push: 'A3', pull: 'Bb3' },
    { push: 'C4', pull: 'D4' },
    { push: 'F4', pull: 'E4' },
    { push: 'A4', pull: 'G4' },
    { push: 'C5', pull: 'Bb4' },
    { push: 'F5', pull: 'D5' },
    { push: 'A5', pull: 'E5' },
    { push: 'C6', pull: 'G5' },
    { push: 'F6', pull: 'Bb5' },
    { push: 'A6', pull: 'D6' },
  ]
};

// Función para transponer notas
function transposeNote(note, semitones) {
  if (!note) return note;
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
