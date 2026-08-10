import { useEffect, useState } from 'react';

// Mapeamos las filas de teclado a los índices de los botones
// Columna 1 (Izquierda, F): 11 botones
// Columna 2 (Medio, Bb): 12 botones
// Columna 3 (Derecha, Eb): 11 botones
export const buttonMap = {
  // Row 1 (Izquierda - 11 botones)
  'Q': { row: 'row1', index: 0 },
  'W': { row: 'row1', index: 1 },
  'E': { row: 'row1', index: 2 },
  'R': { row: 'row1', index: 3 },
  'T': { row: 'row1', index: 4 },
  'Y': { row: 'row1', index: 5 },
  'U': { row: 'row1', index: 6 },
  'I': { row: 'row1', index: 7 },
  'O': { row: 'row1', index: 8 },
  'P': { row: 'row1', index: 9 },
  '[': { row: 'row1', index: 10 },
  
  // Row 2 (Medio - 12 botones)
  'A': { row: 'row2', index: 0 },
  'S': { row: 'row2', index: 1 },
  'D': { row: 'row2', index: 2 },
  'F': { row: 'row2', index: 3 },
  'G': { row: 'row2', index: 4 },
  'H': { row: 'row2', index: 5 },
  'J': { row: 'row2', index: 6 },
  'K': { row: 'row2', index: 7 },
  'L': { row: 'row2', index: 8 },
  ';': { row: 'row2', index: 9 },
  "'": { row: 'row2', index: 10 },
  '\\': { row: 'row2', index: 11 }, // Usamos la tecla arriba del enter / al lado para el 12vo

  // Row 3 (Derecha - 11 botones)
  'Z': { row: 'row3', index: 0 },
  'X': { row: 'row3', index: 1 },
  'C': { row: 'row3', index: 2 },
  'V': { row: 'row3', index: 3 },
  'B': { row: 'row3', index: 4 },
  'N': { row: 'row3', index: 5 },
  'M': { row: 'row3', index: 6 },
  ',': { row: 'row3', index: 7 },
  '.': { row: 'row3', index: 8 },
  '/': { row: 'row3', index: 9 },
  'SHIFT': { row: 'row3', index: 10 },
};

export function useKeyboard() {
  const [activeButtons, setActiveButtons] = useState(new Set());
  const [isPushing, setIsPushing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      const key = e.key.toUpperCase();
      
      if (key === ' ') {
        e.preventDefault();
        setIsPushing(true);
        return;
      }

      if (buttonMap[key]) {
        e.preventDefault();
        setActiveButtons(prev => {
          const next = new Set(prev);
          next.add(key);
          return next;
        });
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toUpperCase();
      
      if (key === ' ') {
        e.preventDefault();
        setIsPushing(false);
        return;
      }

      if (buttonMap[key]) {
        e.preventDefault();
        setActiveButtons(prev => {
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
  }, []);

  return { activeButtons, isPushing };
}
