import { SvgDefs } from './components/PlantIcons'
import Grid from './components/Grid'

/**
 * App principal - Jardin Botanico Virtual
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Gradientes SVG compartidos (renderizar una vez) */}
      <SvgDefs />

      {/* Particulas de fondo decorativas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
        <div className="absolute top-2/3 left-1/2 w-48 h-48 rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center mb-8">
        {/* Icono del jardin */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 211, 238, 0.1))',
            border: '1px solid rgba(74, 222, 128, 0.2)',
          }}
        >
          <svg viewBox="0 0 32 32" className="w-8 h-8">
            <path d="M16 28 L16 14" stroke="#43A047" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 18 Q8 14 10 6 Q14 9 16 18" fill="#66BB6A" />
            <path d="M16 14 Q24 10 22 4 Q18 7 16 14" fill="#81C784" />
            <circle cx="16" cy="12" r="3" fill="#F06292" />
            <circle cx="16" cy="12" r="1.5" fill="#FFB300" />
            <ellipse cx="16" cy="30" rx="8" ry="2" fill="#5C3A1E" opacity="0.5" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #4ade80 0%, #22d3ee 50%, #a78bfa 100%)',
            }}
          >
            Jardin Botanico
          </span>
          <br />
          <span className="text-white/90 text-2xl sm:text-3xl font-light">
            Virtual
          </span>
        </h1>

        <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Haz clic en una celda para plantar. Espera
          <span className="text-garden-accent font-semibold"> 30 segundos </span>
          y haz clic de nuevo para regar. Si riegas antes de tiempo, la planta muere.
        </p>
      </header>

      {/* Cuadricula principal */}
      <main className="relative z-10 w-full max-w-2xl">
        <Grid />
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 text-center">
        <p className="text-[11px] text-gray-600">
          Laravel + React + Tailwind CSS + Docker
        </p>
      </footer>
    </div>
  )
}
