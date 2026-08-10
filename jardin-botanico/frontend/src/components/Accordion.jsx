import React, { useState, useEffect, useMemo } from 'react';
import { useAudio } from '../hooks/useAudio';
import { useKeyboard, buttonMap } from '../hooks/useKeyboard';
import { tunings } from '../utils/tuningMaps';
import { Power, Music, Keyboard, ArrowLeftRight, Settings } from 'lucide-react';

export default function Accordion() {
  const { isReady, initAudio, setPlayingNotes } = useAudio();
  const { activeButtons, isPushing } = useKeyboard();
  const [selectedTuning, setSelectedTuning] = useState('GCF');

  // Calcular las notas activas basado en los botones presionados y la dirección del fuelle
  useEffect(() => {
    if (!isReady) return;
    
    const tuning = tunings[selectedTuning];
    const notesToPlay = [];

    activeButtons.forEach(key => {
      const btnInfo = buttonMap[key];
      if (btnInfo) {
        const { row, index } = btnInfo;
        const noteObj = tuning[row][index];
        if (noteObj) {
          notesToPlay.push(isPushing ? noteObj.push : noteObj.pull);
        }
      }
    });

    setPlayingNotes(notesToPlay);
  }, [activeButtons, isPushing, selectedTuning, isReady]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-black/50 p-10 rounded-2xl text-center max-w-md w-full border border-white/10 backdrop-blur-md">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-red-500/20 rounded-full">
              <Music className="w-12 h-12 text-red-500 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">
            Acordeón Norteño
          </h1>
          <p className="text-gray-400 mb-8">
            Haz clic para encender el motor de audio y empezar a tocar.
          </p>
          <button 
            onClick={initAudio}
            className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center gap-2"
          >
            <Power className="w-5 h-5" /> Iniciar Instrumento
          </button>
        </div>
      </div>
    );
  }

  // Distribución visual de los botones
  const visualRows = [
    { name: 'row1', keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'] },
    { name: 'row2', keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"] },
    { name: 'row3', keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'] }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
      
      {/* Header Info */}
      <div className="mb-8 text-center flex flex-col items-center">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
          Dino Baffetti <span className="text-red-500 font-light">Pro</span>
        </h1>
        
        <div className="flex flex-wrap gap-4 items-center justify-center bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg">
            <Keyboard className="w-5 h-5 text-red-400" />
            <span className="font-medium">Usa las 3 filas del teclado</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg">
            <ArrowLeftRight className={`w-5 h-5 ${isPushing ? 'text-blue-400' : 'text-green-400'}`} />
            <span className="font-medium">
              Fuelle: <span className={`font-bold ${isPushing ? 'text-blue-400' : 'text-green-400'}`}>{isPushing ? 'CERRANDO (Adentro)' : 'ABRIENDO (Afuera)'}</span>
            </span>
            <span className="text-xs ml-2 bg-gray-700 px-2 py-1 rounded text-white font-mono">Espacio</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg">
            <Settings className="w-5 h-5 text-gray-400" />
            <select 
              value={selectedTuning}
              onChange={(e) => setSelectedTuning(e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer"
            >
              <option value="GCF" className="bg-gray-900">Sol-Do-Fa (GCF)</option>
              <option value="FBEb" className="bg-gray-900">Fa-Sib-Mib (FBEb)</option>
              <option value="EAD" className="bg-gray-900">Mi-La-Re (EAD)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accordion Instrument */}
      <div className="flex items-stretch gap-2 lg:gap-6 w-full max-w-5xl justify-center scale-90 sm:scale-100">
        
        {/* Left Side (Bajos - Decorativo por ahora) */}
        <div className="hidden md:flex accordion-body w-40 flex-col items-center py-12 shadow-2xl relative">
          <div className="absolute top-4 left-0 right-0 text-center text-xs font-serif text-black/40 font-bold tracking-widest">
            GUZMÁN
          </div>
          <div className="flex flex-wrap justify-center content-center gap-3 h-full px-4">
             {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className={`diatonic-button w-8 h-8 opacity-80 ${isPushing && i%2===0 ? 'active' : ''}`}></div>
             ))}
          </div>
        </div>

        {/* Bellows (Fuelle) */}
        <div className={`w-32 lg:w-48 bg-[#0d0d0d] rounded-md flex flex-col justify-between py-4 border-y-4 border-[#5a0000] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] relative overflow-hidden ${isPushing ? 'bellows-push' : 'bellows-pull'}`}>
           {Array.from({ length: 18 }).map((_, i) => (
             <div key={i} className="h-full w-full bg-gradient-to-b from-[#222] via-[#050505] to-[#111] border-y border-[#333]/40" style={{ margin: '1px 0' }}/>
           ))}
        </div>

        {/* Right Side (Botonera Diatónica) */}
        <div className="accordion-body p-6 lg:p-10 flex gap-6 shadow-2xl relative min-w-[320px]">
          
          <div className="absolute top-4 right-6 text-xl font-serif text-black/50 font-black tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">
            DINO BAFFETTI
          </div>

          <div className="accordion-grill absolute left-4 top-4 bottom-4 w-20 flex flex-col justify-center gap-4 px-2">
            {/* Agujeros de sonido decorativos */}
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="h-12 bg-black/80 rounded-full w-full shadow-[inset_0_5px_10px_rgba(0,0,0,1)] border border-[#444]" />
            ))}
          </div>

          {/* Botonera 34 botones */}
          <div className="flex justify-end gap-3 lg:gap-4 w-full pl-24 pt-12 relative">
            
            {visualRows.map((row, rowIndex) => (
              <div 
                key={row.name} 
                className="flex flex-col gap-3 lg:gap-4 justify-start"
                style={{ 
                  marginTop: `${rowIndex * 1.5}rem`, // Desfase diagonal
                }}
              >
                {row.keys.map((key) => {
                  const isActive = activeButtons.has(key);
                  return (
                    <div 
                      key={key} 
                      className={`diatonic-button ${isActive ? 'active' : ''}`}
                      onMouseDown={(e) => {
                        // Simulación de touch/click para jugar con mouse
                        const ev = new KeyboardEvent('keydown', { key: key === 'SHIFT' ? 'Shift' : key });
                        window.dispatchEvent(ev);
                      }}
                      onMouseUp={() => {
                        const ev = new KeyboardEvent('keyup', { key: key === 'SHIFT' ? 'Shift' : key });
                        window.dispatchEvent(ev);
                      }}
                      onMouseLeave={() => {
                        const ev = new KeyboardEvent('keyup', { key: key === 'SHIFT' ? 'Shift' : key });
                        window.dispatchEvent(ev);
                      }}
                    >
                      <span>{key}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
