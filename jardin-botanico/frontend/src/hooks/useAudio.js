import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

export function useAudio() {
  const [isReady, setIsReady] = useState(false);
  const synthRef = useRef(null);
  const activeNotesRef = useRef(new Set());

  useEffect(() => {
    // Para calidad final, esto se cambiará por Tone.Sampler
    // Ej: const sampler = new Tone.Sampler({ urls: { A3: "A3.wav" }, baseUrl: "/sounds/" }).toDestination();
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "fatsawtooth",
        count: 3,
        spread: 30
      },
      envelope: {
        attack: 0.05,
        decay: 0.1,
        sustain: 1.0,
        release: 0.4
      }
    }).toDestination();
    
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    synth.connect(chorus);

    synthRef.current = synth;
  }, []);

  const initAudio = async () => {
    if (!isReady) {
      await Tone.start();
      setIsReady(true);
      console.log('Audio Engine Started');
    }
  };

  // Esta función compara las notas que deben sonar vs las que ya están sonando
  const setPlayingNotes = (notesArray) => {
    if (!isReady || !synthRef.current) return;

    const newNotes = new Set(notesArray);
    const currentNotes = activeNotesRef.current;

    // Notas nuevas (hay que atacarlas)
    for (const note of newNotes) {
      if (!currentNotes.has(note)) {
        synthRef.current.triggerAttack(note, Tone.now());
        currentNotes.add(note);
      }
    }

    // Notas viejas que ya no están (hay que soltarlas)
    for (const note of currentNotes) {
      if (!newNotes.has(note)) {
        synthRef.current.triggerRelease(note, Tone.now());
        currentNotes.delete(note);
      }
    }
  };

  return { isReady, initAudio, setPlayingNotes };
}
