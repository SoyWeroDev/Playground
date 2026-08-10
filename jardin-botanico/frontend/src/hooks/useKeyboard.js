import { useEffect, useState } from 'react';

// Mapeo basico estilo piano
// Blancas: A S D F G H J K L ; '
// Negras: W E   T Y U   O P
export const keyMap = {
  'A': 'C4',
  'W': 'C#4',
  'S': 'D4',
  'E': 'D#4',
  'D': 'E4',
  'F': 'F4',
  'T': 'F#4',
  'G': 'G4',
  'Y': 'G#4',
  'H': 'A4',
  'U': 'A#4',
  'J': 'B4',
  'K': 'C5',
  'O': 'C#5',
  'L': 'D5',
  'P': 'D#5',
  ';': 'E5',
  "'": 'F5'
};

export function useKeyboard(playNote, releaseNote) {
  const [activeKeys, setActiveKeys] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return; // Ignorar si se mantiene presionada (auto-repeat)
      const key = e.key.toUpperCase();
      const note = keyMap[key];
      
      if (note) {
        playNote(note);
        setActiveKeys(prev => {
          const next = new Set(prev);
          next.add(key);
          return next;
        });
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toUpperCase();
      const note = keyMap[key];
      
      if (note) {
        releaseNote(note);
        setActiveKeys(prev => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playNote, releaseNote]);

  return { activeKeys, keyMap };
}
