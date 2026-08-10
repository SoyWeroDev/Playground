import * as Tone from 'tone';

// Mapeo detallado con frecuencias para el Acordeón en FA (Fa/Sib/Mib - FBEb)
// 34 Botones en distribución 11 - 12 - 11
const baseFBEb = {
  // Hilera 1: FA (Exterior) - 11 botones
  row1: [
    { id: 1, pushNote: 'Ab3', pushFreq: 207.65, pullNote: 'D3', pullFreq: 146.83 },
    { id: 2, pushNote: 'C3', pushFreq: 130.81, pullNote: 'C3', pullFreq: 130.81 },
    { id: 3, pushNote: 'Ab3', pushFreq: 207.65, pullNote: 'Ab3', pullFreq: 207.65 },
    { id: 4, pushNote: 'F3', pushFreq: 174.61, pullNote: 'F3', pullFreq: 174.61 },
    { id: 5, pushNote: 'D4', pushFreq: 293.66, pullNote: 'D4', pullFreq: 293.66 },
    { id: 6, pushNote: 'C4', pushFreq: 261.63, pullNote: 'C4', pullFreq: 261.63 },
    { id: 7, pushNote: 'Ab4', pushFreq: 415.30, pullNote: 'Ab4', pullFreq: 415.30 },
    { id: 8, pushNote: 'F4', pushFreq: 349.23, pullNote: 'F4', pullFreq: 349.23 },
    { id: 9, pushNote: 'D5', pushFreq: 587.33, pullNote: 'D5', pullFreq: 587.33 },
    { id: 10, pushNote: 'C5', pushFreq: 523.25, pullNote: 'C5', pullFreq: 523.25 },
    { id: 11, pushNote: 'B4', pushFreq: 493.88, pullNote: 'B4', pullFreq: 493.88 }
  ],
  
  // Hilera 2: SIB (Medio) - 12 botones
  row2: [
    { id: 1, pushNote: 'C3', pushFreq: 130.81, pullNote: 'G2', pullFreq: 98.00 },
    { id: 2, pushNote: 'Bb2', pushFreq: 116.54, pullNote: 'A2', pullFreq: 110.00 },
    { id: 3, pushNote: 'Bb2', pushFreq: 116.54, pullNote: 'G2', pullFreq: 98.00 },
    { id: 4, pushNote: 'G3', pushFreq: 196.00, pullNote: 'Eb3', pullFreq: 155.56 },
    { id: 5, pushNote: 'Bb3', pushFreq: 233.08, pullNote: 'C4', pullFreq: 261.63 },
    { id: 6, pushNote: 'Bb3', pushFreq: 233.08, pullNote: 'A3', pullFreq: 220.00 },
    { id: 7, pushNote: 'G4', pushFreq: 392.00, pullNote: 'G4', pullFreq: 392.00 },
    { id: 8, pushNote: 'Bb4', pushFreq: 466.16, pullNote: 'D5', pullFreq: 587.33 },
    { id: 9, pushNote: 'Bb4', pushFreq: 466.16, pullNote: 'C5', pullFreq: 523.25 },
    { id: 10, pushNote: 'G5', pushFreq: 783.99, pullNote: 'A4', pullFreq: 440.00 },
    { id: 11, pushNote: 'Bb5', pushFreq: 932.33, pullNote: 'G5', pullFreq: 783.99 },
    { id: 12, pushNote: 'Db5', pushFreq: 554.37, pullNote: 'G5', pullFreq: 783.99 }
  ],

  // Hilera 3: MIB (Interior) - 11 botones
  row3: [
    { id: 1, pushNote: 'D3', pushFreq: 146.83, pullNote: 'Eb2', pullFreq: 77.78 },
    { id: 2, pushNote: 'Eb3', pushFreq: 155.56, pullNote: 'D3', pullFreq: 146.83 },
    { id: 3, pushNote: 'Eb3', pushFreq: 155.56, pullNote: 'Eb3', pullFreq: 155.56 },
    { id: 4, pushNote: 'Bb3', pushFreq: 233.08, pullNote: 'Bb3', pullFreq: 233.08 },
    { id: 5, pushNote: 'Eb4', pushFreq: 311.13, pullNote: 'F4', pullFreq: 349.23 },
    { id: 6, pushNote: 'Eb4', pushFreq: 311.13, pullNote: 'Eb4', pullFreq: 311.13 },
    { id: 7, pushNote: 'Bb4', pushFreq: 466.16, pullNote: 'Bb4', pullFreq: 466.16 },
    { id: 8, pushNote: 'Eb5', pushFreq: 622.25, pullNote: 'F5', pullFreq: 698.46 },
    { id: 9, pushNote: 'Eb5', pushFreq: 622.25, pullNote: 'Eb5', pullFreq: 622.25 },
    { id: 10, pushNote: 'Bb5', pushFreq: 932.33, pullNote: 'Bb5', pullFreq: 932.33 },
    { id: 11, pushNote: 'Db6', pushFreq: 1108.73, pullNote: 'B5', pullFreq: 987.77 }
  ]
};

function transposeNote(note, semitones) {
  if (!note) return note;
  return Tone.Frequency(note).transpose(semitones).toNote();
}

function transposeAccordion(baseMap, semitones) {
  const newMap = {};
  for (const row in baseMap) {
    newMap[row] = baseMap[row].map(button => {
      const pNote = transposeNote(button.pushNote, semitones);
      const plNote = transposeNote(button.pullNote, semitones);
      
      // Tone.Frequency().toFrequency() retorna el valor exacto en Hz
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
