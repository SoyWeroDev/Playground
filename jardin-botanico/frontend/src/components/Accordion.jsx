import React from 'react';
import { useAudio } from '../hooks/useAudio';
import { useKeyboard, keyMap } from '../hooks/useKeyboard';
import { Power, Music, Keyboard } from 'lucide-react';

export default function Accordion() {
  const { isReady, initAudio, playNote, releaseNote } = useAudio();
  const { activeKeys } = useKeyboard(playNote, releaseNote);

  // Ordenamos las teclas del piano visualmente
  const whiteKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"];
  const blackKeysData = [
    { key: 'W', offset: 1 }, { key: 'E', offset: 2 },
    { key: 'T', offset: 4 }, { key: 'Y', offset: 5 }, { key: 'U', offset: 6 },
    { key: 'O', offset: 8 }, { key: 'P', offset: 9 }
  ];

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="glass-panel p-10 rounded-2xl text-center max-w-md w-full">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-primary/20 rounded-full">
              <Music className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Acordeón Online
          </h1>
          <p className="text-gray-400 mb-8">
            Haz clic para encender el motor de audio y empezar a tocar.
          </p>
          <button 
            onClick={initAudio}
            className="w-full py-4 rounded-xl font-bold text-lg bg-primary hover:bg-fuchsia-400 text-white transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] flex items-center justify-center gap-2"
          >
            <Power className="w-5 h-5" /> Iniciar Instrumento
          </button>
        </div>
      </div>
    );
  }

  const isPlaying = activeKeys.size > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
      
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tight text-white mb-2 drop-shadow-lg">
          Acordeón<span className="text-primary">.Pro</span>
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
          <Keyboard className="w-4 h-4" />
          <span>Usa el teclado de tu computadora para tocar</span>
        </div>
      </div>

      {/* Accordion Body */}
      <div className="glass-panel p-8 rounded-3xl flex items-stretch gap-4 relative shadow-2xl border border-white/10 overflow-hidden">
        
        {/* Left Hand (Bass buttons - decorative for now) */}
        <div className="w-32 bg-[#1a1a1a] rounded-xl flex flex-wrap gap-2 p-4 content-start justify-center shadow-inner relative border border-black/50">
           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl" />
           {Array.from({ length: 12 }).map((_, i) => (
             <div key={i} className={`w-6 h-6 rounded-full bg-black shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.5)] border border-[#333] transition-all ${isPlaying && i%3===0 ? 'scale-95 bg-[#222]' : ''}`} />
           ))}
        </div>

        {/* Bellows (Fuelle) */}
        <div className={`w-24 bg-[#0d0d0d] rounded-sm flex flex-col justify-between py-2 border-y border-[#333] relative overflow-hidden transition-all duration-300 ${isPlaying ? 'animate-bellows w-32 shadow-[0_0_30px_rgba(217,70,239,0.15)]' : ''}`}>
           {/* Pliegues del fuelle */}
           {Array.from({ length: 15 }).map((_, i) => (
             <div key={i} className="h-2 w-full bg-gradient-to-b from-[#222] via-[#111] to-[#000] border-y border-[#333]/30" />
           ))}
        </div>

        {/* Right Hand (Piano Keyboard) */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-inner relative border border-black/50">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl" />
          
          <div className="relative h-64 flex">
            {/* White Keys */}
            {whiteKeys.map((key) => {
              const active = activeKeys.has(key);
              return (
                <div 
                  key={key}
                  onMouseDown={() => playNote(keyMap[key])}
                  onMouseUp={() => releaseNote(keyMap[key])}
                  onMouseLeave={() => releaseNote(keyMap[key])}
                  className={`piano-key white-key w-12 h-full flex items-end justify-center pb-4 select-none cursor-pointer ${active ? 'active' : ''}`}
                >
                  <span className={`text-xs font-bold ${active ? 'text-primary' : 'text-gray-400'}`}>{key}</span>
                </div>
              );
            })}

            {/* Black Keys */}
            <div className="absolute top-0 left-0 w-full h-40 pointer-events-none flex">
              {blackKeysData.map((data) => {
                const active = activeKeys.has(data.key);
                return (
                  <div 
                    key={data.key}
                    onMouseDown={() => playNote(keyMap[data.key])}
                    onMouseUp={() => releaseNote(keyMap[data.key])}
                    onMouseLeave={() => releaseNote(keyMap[data.key])}
                    className={`piano-key black-key w-8 h-full absolute flex items-end justify-center pb-4 pointer-events-auto select-none cursor-pointer ${active ? 'active' : ''}`}
                    style={{ left: `calc(${data.offset * 3}rem - 1rem)` }}
                  >
                    <span className={`text-[10px] font-bold ${active ? 'text-primary' : 'text-gray-600'}`}>{data.key}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-4 text-center">
             <div className="inline-block w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
}
