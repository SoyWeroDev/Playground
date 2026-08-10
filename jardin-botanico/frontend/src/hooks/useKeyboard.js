import { useEffect, useState } from 'react';

// Mapeo adaptado a teclado Español ISO (31 botones: 10-11-10)
export const buttonMap = {
  // Row 3 (Derecha - 10 botones) -> Fila superior (Empieza en W)
  'W': { row: 'row3', index: 0 },
  'E': { row: 'row3', index: 1 },
  'R': { row: 'row3', index: 2 },
  'T': { row: 'row3', index: 3 },
  'Y': { row: 'row3', index: 4 },
  'U': { row: 'row3', index: 5 },
  'I': { row: 'row3', index: 6 },
  'O': { row: 'row3', index: 7 },
  'P': { row: 'row3', index: 8 },
  '+': { row: 'row3', index: 9 },
  '`': { row: 'row3', index: 9 },
  '´': { row: 'row3', index: 9 },
  
  // Row 2 (Medio - 11 botones) -> Fila central (ASDFGHJKLÑ + ENTER)
  'A': { row: 'row2', index: 0 },
  'S': { row: 'row2', index: 1 },
  'D': { row: 'row2', index: 2 },
  'F': { row: 'row2', index: 3 },
  'G': { row: 'row2', index: 4 },
  'H': { row: 'row2', index: 5 },
  'J': { row: 'row2', index: 6 },
  'K': { row: 'row2', index: 7 },
  'L': { row: 'row2', index: 8 },
  'Ñ': { row: 'row2', index: 9 },
  'ENTER': { row: 'row2', index: 10 },

  // Row 1 (Izquierda - 10 botones) -> Fila inferior (ZXCVBNM,.-)
  'Z': { row: 'row1', index: 0 },
  'X': { row: 'row1', index: 1 },
  'C': { row: 'row1', index: 2 },
  'V': { row: 'row1', index: 3 },
  'B': { row: 'row1', index: 4 },
  'N': { row: 'row1', index: 5 },
  'M': { row: 'row1', index: 6 },
  ',': { row: 'row1', index: 7 },
  '.': { row: 'row1', index: 8 },
  '-': { row: 'row1', index: 9 },
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
