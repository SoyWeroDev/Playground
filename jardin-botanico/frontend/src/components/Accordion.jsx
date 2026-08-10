import React, { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { useKeyboard, buttonMap } from '../hooks/useKeyboard';
import { tunings } from '../utils/tuningMaps';
import { Power, Music, Keyboard, ArrowLeftRight, Settings } from 'lucide-react';

export default function Accordion() {
  const { isReady, initAudio, setPlayingNotes } = useAudio();
  const { activeButtons, isPushing } = useKeyboard();
  const [selectedTuning, setSelectedTuning] = useState('GCF');

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
          notesToPlay.push(isPushing ? noteObj.pushNote : noteObj.pullNote);
        }
      }
    });

    setPlayingNotes(notesToPlay);
  }, [activeButtons, isPushing, selectedTuning, isReady]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111]">
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
            className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          >
            <Power className="w-5 h-5" /> Iniciar Instrumento
          </button>
        </div>
      </div>
    );
  }

  // Distribución visual de los botones: Izquierda (Z), Medio (A), Derecha (Q)
  const visualRows = [
    { name: 'row1', keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-'] },
    { name: 'row2', keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'ENTER'] },
    { name: 'row3', keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] }
  ];

  // Nombres dinámicos para las 3 hileras
  const getRowNames = () => {
    if (selectedTuning === 'FBEb') return ['F', 'Bb', 'Eb'];
    if (selectedTuning === 'GCF') return ['G', 'C', 'F'];
    if (selectedTuning === 'EAD') return ['E', 'A', 'D'];
    return ['1', '2', '3'];
  };
  const rowNames = getRowNames();
  const rowLabels = ['ONE', 'TWO', 'THREE'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
      
      {/* Header Info */}
      <div className="mb-8 text-center flex flex-col items-center">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
          Dino Baffetti <span className="text-red-500 font-light">Pro</span>
        </h1>
        
        <div className="flex flex-wrap gap-4 items-center justify-center bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg">
            <Keyboard className="w-5 h-5 text-red-400" />
            <span className="font-medium">Teclado PC</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg">
            <ArrowLeftRight className={`w-5 h-5 ${isPushing ? 'text-blue-400' : 'text-green-400'}`} />
            <span className="font-medium w-40 text-left">
              Fuelle: <span className={`font-bold ${isPushing ? 'text-blue-400' : 'text-green-400'}`}>{isPushing ? 'ADENTRO' : 'AFUERA'}</span>
            </span>
            <span className="text-xs ml-2 bg-gray-700 px-2 py-1 rounded text-white font-mono shadow-inner border border-gray-600">Espacio</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg">
            <Settings className="w-5 h-5 text-gray-400" />
            <select 
              value={selectedTuning}
              onChange={(e) => setSelectedTuning(e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer"
            >
              <option value="FBEb" className="bg-gray-900">Fa-Sib-Mib (FBEb)</option>
              <option value="GCF" className="bg-gray-900">Sol-Do-Fa (GCF)</option>
              <option value="EAD" className="bg-gray-900">Mi-La-Re (EAD)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accordion Instrument - LADO IZQUIERDO: 34 BOTONES */}
      <div className="flex items-stretch gap-2 lg:gap-6 w-full max-w-[1200px] justify-center scale-90 sm:scale-100">
        
        {/* Lado Izquierdo (Botonera Diatónica 34 botones) */}
        <div className="accordion-body p-8 lg:p-12 flex shadow-2xl relative min-w-[380px] justify-center items-center">
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-2xl font-serif text-black/50 font-black tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">
            DINO BAFFETTI
          </div>

          <div className="accordion-grill absolute right-4 top-4 bottom-4 w-16 flex flex-col justify-center gap-6 px-2">
            {/* Agujeros de sonido decorativos en la parrilla */}
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="h-10 bg-black/90 rounded-full w-full shadow-[inset_0_4px_8px_rgba(0,0,0,1)] border border-[#555]" />
            ))}
          </div>

          {/* Botonera 34 botones (Disposición ZigZag / Panal) */}
          <div className="flex justify-center gap-3 w-full pr-16 pt-16 pb-8 relative z-10">
            {visualRows.map((row, rowIndex) => {
              // La columna del medio (rowIndex === 1) no tiene margin-top extra, 
              // mientras que la 0 y la 2 sí tienen, creando el zigzag.
              const isMiddleColumn = rowIndex === 1;
              const hasMarginTop = !isMiddleColumn;

              return (
                <div 
                  key={row.name} 
                  className={`flex flex-col gap-3 items-center ${hasMarginTop ? 'mt-6' : 'mt-0'}`}
                >
                  {row.keys.map((key, index) => {
                    const isActive = activeButtons.has(key);
                    // Obtener la nota actual que sonaría para mostrarla en la UI (Opcional, pero ayuda)
                    const noteObj = tunings[selectedTuning][row.name][index];
                    const displayNote = noteObj ? (isPushing ? noteObj.pushNote : noteObj.pullNote).replace(/\d/g, '') : '';
                    
                    return (
                      <div 
                        key={key} 
                        className={`diatonic-button ${isActive ? 'active' : ''}`}
                        onMouseDown={(e) => {
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
                        {/* Nota Principal */}
                        <span className="text-sm font-black text-white drop-shadow-md z-10 transition-all">{displayNote}</span>
                        
                        {/* Indicador de tecla (muy pequeño) */}
                        <span className="absolute bottom-1 right-2 text-[8px] text-white/40 font-mono z-10">
                          {key === 'ENTER' ? 'ENT' : key === 'SHIFT' ? 'SH' : key}
                        </span>
                      </div>
                    );
                  })}
                  {/* Etiquetas Inferiores F ONE, Bb TWO, Eb THREE */}
                  <div className="mt-4 flex flex-col items-center text-white/90 drop-shadow-md">
                    <span className="font-bold text-lg leading-tight">{rowNames[rowIndex]}</span>
                    <span className="text-[10px] font-black tracking-widest">{rowLabels[rowIndex]}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bellows (Fuelle en el centro) */}
        <div className={`w-32 lg:w-48 bg-[#0d0d0d] rounded-md flex flex-col justify-between py-4 border-y-4 border-[#5a0000] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] relative overflow-hidden ${isPushing ? 'bellows-push' : 'bellows-pull'}`}>
           {Array.from({ length: 18 }).map((_, i) => (
             <div key={i} className="h-full w-full bg-gradient-to-b from-[#222] via-[#050505] to-[#111] border-y border-[#333]/40" style={{ margin: '1px 0' }}/>
           ))}
        </div>

        {/* Lado Derecho (Bajos - Decorativo) */}
        <div className="hidden md:flex accordion-body w-48 flex-col items-center py-12 shadow-2xl relative">
          <div className="absolute top-6 left-0 right-0 text-center text-sm font-serif text-black/40 font-bold tracking-widest">
            GUZMÁN
          </div>
          <div className="flex flex-wrap justify-center content-center gap-4 h-full px-6 pt-8">
             {/* 12 Bajos tradicionales */}
             {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className={`diatonic-button w-10 h-10 opacity-70 border-[#222] bg-[#333] ${isPushing && i%3===0 ? 'active' : ''}`}></div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
