import { getPlantIcon } from './PlantIcons'

/**
 * Celda individual de la cuadricula.
 * Muestra el icono SVG segun la etapa de la planta y maneja animaciones.
 */
export default function Cell({ x, y, planta, onClick, animState }) {
  const etapa = planta ? planta.etapa : null
  const hasPlant = planta !== null && planta !== undefined

  // Determinar clase de animacion
  let animClass = ''
  if (animState === 'plantada') animClass = 'animate-plant-appear'
  else if (animState === 'regada' || animState === 'max') animClass = 'animate-plant-grow'
  else if (animState === 'muerta') animClass = 'animate-plant-die'
  else if (hasPlant) animClass = 'animate-breathe'

  // Color del borde segun etapa
  const borderColor = hasPlant
    ? etapa >= 4
      ? 'border-amber-500/30 hover:border-amber-400/50 hover:shadow-amber-500/20'
      : etapa >= 2
        ? 'border-green-600/30 hover:border-green-400/50 hover:shadow-green-500/20'
        : 'border-green-800/20 hover:border-green-600/40 hover:shadow-green-600/15'
    : 'border-white/[0.04] hover:border-white/[0.1]'

  // Fondo segun estado
  const bgColor = hasPlant
    ? etapa >= 4
      ? 'bg-amber-950/15'
      : 'bg-green-950/15'
    : 'bg-cell-empty hover:bg-cell-hover'

  return (
    <button
      id={`cell-${x}-${y}`}
      onClick={() => onClick(x, y)}
      className={`
        relative aspect-square rounded-lg border transition-all duration-300
        cursor-pointer select-none overflow-hidden
        hover:shadow-lg
        ${borderColor}
        ${bgColor}
        active:scale-95
        group
      `}
      title={
        hasPlant
          ? `Planta etapa ${etapa}/4 (${x}, ${y})`
          : `Celda vacia (${x}, ${y}) - Clic para plantar`
      }
    >
      {/* Efecto de brillo al hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: hasPlant
            ? 'radial-gradient(circle at center, rgba(74, 222, 128, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        }}
      />

      {/* Icono SVG */}
      <div className={`relative w-full h-full p-1 ${animClass}`}>
        {getPlantIcon(etapa)}
      </div>

      {/* Indicador de etapa maxima */}
      {hasPlant && etapa >= 4 && (
        <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-400/60">
          <div className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
        </div>
      )}
    </button>
  )
}
