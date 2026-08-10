import * as Tone from 'tone';

// Mapeo detallado con frecuencias exactas basadas en A4=440Hz para el Acordeón FA (Fa/Sib/Mib - FBEb)
// Registro Fundamental (Clarinete) - 34 Botones (11-12-11)
const baseFBEb = {
  // Hilera 1: FA (Exterior) - 10 botones
  row1: [
    { id: 1, pushNote: 'B3', pushFreq: 246.94, pullNote: 'Db4', pullFreq: 277.18 },
    { id: 2, pushNote: 'F3', pushFreq: 174.61, pullNote: 'G3', pullFreq: 196.00 },
    { id: 3, pushNote: 'A3', pushFreq: 220.00, pullNote: 'Bb3', pullFreq: 233.08 },
    { id: 4, pushNote: 'C4', pushFreq: 261.63, pullNote: 'D4', pullFreq: 293.66 },
    { id: 5, pushNote: 'F4', pushFreq: 349.23, pullNote: 'E4', pullFreq: 329.63 },
    { id: 6, pushNote: 'A4', pushFreq: 440.00, pullNote: 'G4', pullFreq: 392.00 },
    { id: 7, pushNote: 'C5', pushFreq: 523.25, pullNote: 'Bb4', pullFreq: 466.16 },
    { id: 8, pushNote: 'F5', pushFreq: 698.46, pullNote: 'D5', pullFreq: 587.33 },
    { id: 9, pushNote: 'A5', pushFreq: 880.00, pullNote: 'E5', pullFreq: 659.25 },
    { id: 10, pushNote: 'C6', pushFreq: 1046.50, pullNote: 'G5', pullFreq: 783.99 }
  ],
  
  // Hilera 2: SIB (Medio) - 11 botones
  row2: [
    { id: 1, pushNote: 'E3', pushFreq: 164.81, pullNote: 'F#3', pullFreq: 185.00 },
    { id: 2, pushNote: 'F3', pushFreq: 174.61, pullNote: 'A3', pullFreq: 220.00 },
    { id: 3, pushNote: 'Bb3', pushFreq: 233.08, pullNote: 'C4', pullFreq: 261.63 },
    { id: 4, pushNote: 'D4', pushFreq: 293.66, pullNote: 'Eb4', pullFreq: 311.13 },
    { id: 5, pushNote: 'F4', pushFreq: 349.23, pullNote: 'G4', pullFreq: 392.00 },
    { id: 6, pushNote: 'Bb4', pushFreq: 466.16, pullNote: 'A4', pullFreq: 440.00 },
    { id: 7, pushNote: 'D5', pushFreq: 587.33, pullNote: 'C5', pullFreq: 523.25 },
    { id: 8, pushNote: 'F5', pushFreq: 698.46, pullNote: 'Eb5', pullFreq: 622.25 },
    { id: 9, pushNote: 'Bb5', pushFreq: 932.33, pullNote: 'G5', pullFreq: 783.99 },
    { id: 10, pushNote: 'D6', pushFreq: 1174.66, pullNote: 'A5', pullFreq: 880.00 },
    { id: 11, pushNote: 'F6', pushFreq: 1396.91, pullNote: 'C6', pullFreq: 1046.50 }
  ],

  // Hilera 3: MIB (Interior) - 10 botones
  row3: [
    { id: 1, pushNote: 'Db4', pushFreq: 277.18, pullNote: 'B3', pullFreq: 246.94 },
    { id: 2, pushNote: 'Bb3', pushFreq: 233.08, pullNote: 'D4', pullFreq: 293.66 },
    { id: 3, pushNote: 'Eb4', pushFreq: 311.13, pullNote: 'F4', pullFreq: 349.23 },
    { id: 4, pushNote: 'G4', pushFreq: 392.00, pullNote: 'Ab4', pullFreq: 415.30 },
    { id: 5, pushNote: 'Bb4', pushFreq: 466.16, pullNote: 'C5', pullFreq: 523.25 },
    { id: 6, pushNote: 'Eb5', pushFreq: 622.25, pullNote: 'D5', pullFreq: 587.33 },
    { id: 7, pushNote: 'G5', pushFreq: 783.99, pullNote: 'F5', pullFreq: 698.46 },
    { id: 8, pushNote: 'Bb5', pushFreq: 932.33, pullNote: 'Ab5', pullFreq: 830.61 },
    { id: 9, pushNote: 'Eb6', pushFreq: 1244.51, pullNote: 'C6', pullFreq: 1046.50 },
    { id: 10, pushNote: 'G6', pushFreq: 1567.98, pullNote: 'D6', pullFreq: 1174.66 }
  ]
};

// Función para transponer la nota musical
function transposeNote(note, semitones) {
  if (!note) return note;
  return Tone.Frequency(note).transpose(semitones).toNote();
}

// Función para transponer el acordeón y recalcular frecuencias
function transposeAccordion(baseMap, semitones) {
  const newMap = {};
  for (const row in baseMap) {
    newMap[row] = baseMap[row].map(button => {
      const pNote = transposeNote(button.pushNote, semitones);
      const plNote = transposeNote(button.pullNote, semitones);
      
      return {
        id: button.id,
        pushNote: pNote,
        pushFreq: Tone.Frequency(pNote).toFrequency(),
        pullNote: plNote,
        pullFreq: Tone.Frequency(plNote).toFrequency()
      };
    });
  }
  return newMap;
}

export const tunings = {
  'FBEb': baseFBEb,                               
  'GCF': transposeAccordion(baseFBEb, 2),         
  'EAD': transposeAccordion(baseFBEb, -1),        
};
