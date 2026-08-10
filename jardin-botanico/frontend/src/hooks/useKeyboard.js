import { useEffect, useState, useCallback } from 'react';

// Mapeamos las filas de teclado a los índices de los botones (0-11 para row1, 0-10 para las otras)
export const buttonMap = {
  // Row 1 (Exterior - 12 botones)
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
  ']': { row: 'row1', index: 11 },
  
  // Row 2 (Medio - 11 botones)
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

  // Row 3 (Interior - 11 botones)
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
  'SHIFT': { row: 'row3', index: 10 }, // Usamos Shift para el último botón
};

export function useKeyboard() {
  const [activeButtons, setActiveButtons] = useState(new Set());
  const [isPushing, setIsPushing] = useState(false); // Fuelle hacia adentro (Push)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return; // Evitar el auto-repeat del SO

      const key = e.key.toUpperCase();
      
      // La barra espaciadora controla el fuelle (Push)
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
        setIsPushing(false); // Soltar espacio = Pull (jalar)
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
