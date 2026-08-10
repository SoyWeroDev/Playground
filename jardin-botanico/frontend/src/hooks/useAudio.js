import { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';

export function useAudio() {
  const [isReady, setIsReady] = useState(false);
  const synthRef = useRef(null);
  const activeNotesRef = useRef(new Set());

  useEffect(() => {
    // Configurar el sintetizador para que suene como un acordeon (simulacion)
    // Para calidad final, esto se reemplazaria por un Tone.Sampler con archivos .wav reales
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "fatsawtooth",
        count: 3,
        spread: 30
      },
      envelope: {
        attack: 0.05, // Entrada rapida pero no instantanea
        decay: 0.1,
        sustain: 1.0, // El acordeon mantiene el volumen mientras presionas
        release: 0.4  // Cae un poco lento al soltar (fuelle)
      }
    }).toDestination();
    
    // Agregar un poco de chorus para darle ese sonido ancho caracteristico
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    synth.connect(chorus);

    synthRef.current = synth;
  }, []);

  const initAudio = async () => {
    if (!isReady) {
      await Tone.start();
      setIsReady(true);
      console.log('Audio Engine (Tone.js) Started');
    }
  };

  const playNote = useCallback((note) => {
    if (!isReady || !synthRef.current) return;
    if (!activeNotesRef.current.has(note)) {
      activeNotesRef.current.add(note);
      synthRef.current.triggerAttack(note, Tone.now());
    }
  }, [isReady]);

  const releaseNote = useCallback((note) => {
    if (!isReady || !synthRef.current) return;
    if (activeNotesRef.current.has(note)) {
      activeNotesRef.current.delete(note);
      synthRef.current.triggerRelease(note, Tone.now());
    }
  }, [isReady]);

  return { isReady, initAudio, playNote, releaseNote, activeNotes: activeNotesRef.current };
}
