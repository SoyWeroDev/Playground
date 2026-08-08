/**
 * PlantIcons.jsx
 *
 * Iconos SVG inline para cada etapa de las plantas.
 * CERO emojis. Solo SVG con gradientes y detalles.
 *
 * Etapas:
 *  null  -> Celda vacia (tierra sutil)
 *  0     -> Semilla
 *  1     -> Brote
 *  2     -> Planta joven
 *  3     -> Planta madura (con boton floral)
 *  4     -> Flor completa
 */

/**
 * Definiciones SVG compartidas (gradientes).
 * Renderizar UNA VEZ en el DOM, fuera de los iconos individuales.
 */
export function SvgDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        {/* Tierra / Suelo */}
        <linearGradient id="soil-g" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B4423" />
          <stop offset="100%" stopColor="#3E2512" />
        </linearGradient>

        {/* Semilla */}
        <linearGradient id="seed-g" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#D2A45C" />
          <stop offset="50%" stopColor="#A0722A" />
          <stop offset="100%" stopColor="#6B4E1E" />
        </linearGradient>

        {/* Tallo */}
        <linearGradient id="stem-g" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1B5E20" />
          <stop offset="100%" stopColor="#43A047" />
        </linearGradient>

        {/* Hoja claro */}
        <linearGradient id="leaf-light-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#388E3C" />
        </linearGradient>

        {/* Hoja oscuro */}
        <linearGradient id="leaf-dark-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>

        {/* Boton floral */}
        <radialGradient id="bud-g" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#F48FB1" />
          <stop offset="100%" stopColor="#C2185B" />
        </radialGradient>

        {/* Petalo */}
        <radialGradient id="petal-g" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#F8BBD0" />
          <stop offset="40%" stopColor="#F06292" />
          <stop offset="100%" stopColor="#D81B60" />
        </radialGradient>

        {/* Centro de flor */}
        <radialGradient id="center-g" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="60%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#FF8F00" />
        </radialGradient>

        {/* Brillo */}
        <radialGradient id="glow-g" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/**
 * Celda vacia - tierra sutil
 */
export function EmptyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Celda vacia">
      <circle cx="19" cy="33" r="1.5" fill="#5C3A1E" opacity="0.25" />
      <circle cx="24" cy="35" r="1" fill="#6B4423" opacity="0.2" />
      <circle cx="29" cy="32" r="1.2" fill="#5C3A1E" opacity="0.18" />
      <circle cx="22" cy="36" r="0.7" fill="#4A2F17" opacity="0.15" />
      <circle cx="27" cy="37" r="0.9" fill="#5C3A1E" opacity="0.12" />
    </svg>
  )
}

/**
 * Etapa 0 - Semilla enterrada
 */
export function SeedIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Semilla">
      {/* Monticulo de tierra */}
      <ellipse cx="24" cy="37" rx="13" ry="4.5" fill="url(#soil-g)" opacity="0.85" />
      <ellipse cx="24" cy="36" rx="10" ry="3" fill="#7B5331" opacity="0.3" />

      {/* Semilla */}
      <g transform="rotate(-12 24 30)">
        <ellipse cx="24" cy="30" rx="4.5" ry="6" fill="url(#seed-g)" />
        {/* Linea central de la semilla */}
        <path
          d="M24 24.5 Q23 29.5 24 35.5"
          stroke="#8B6914"
          strokeWidth="0.6"
          fill="none"
          opacity="0.5"
        />
        {/* Brillo */}
        <ellipse cx="22.5" cy="28" rx="1.2" ry="2" fill="#E8C96A" opacity="0.3" />
      </g>

      {/* Grieta en la tierra (indicando que algo va a brotar) */}
      <path
        d="M22 34 Q24 32 26 34"
        stroke="#8B6B47"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  )
}

/**
 * Etapa 1 - Brote pequeno
 */
export function SproutIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Brote">
      {/* Tierra */}
      <ellipse cx="24" cy="39" rx="11" ry="3.5" fill="url(#soil-g)" opacity="0.8" />

      {/* Tallo */}
      <path
        d="M24 39 Q24.5 33 24 26"
        stroke="url(#stem-g)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hoja pequena izquierda */}
      <path
        d="M24 29 Q17 25 19 19 Q23 22 24 29"
        fill="url(#leaf-light-g)"
      />
      {/* Vena de la hoja */}
      <path
        d="M24 29 Q20 24 20 21"
        stroke="#2E7D32"
        strokeWidth="0.4"
        fill="none"
        opacity="0.5"
      />

      {/* Gota de agua decorativa */}
      <ellipse cx="20" cy="22" rx="1" ry="1.3" fill="#4FC3F7" opacity="0.35" />
    </svg>
  )
}

/**
 * Etapa 2 - Planta joven con dos hojas
 */
export function YoungPlantIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Planta joven">
      {/* Tierra */}
      <ellipse cx="24" cy="41" rx="12" ry="3.5" fill="url(#soil-g)" opacity="0.8" />

      {/* Tallo principal */}
      <path
        d="M24 41 Q24.3 34 24 18"
        stroke="url(#stem-g)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hoja inferior izquierda */}
      <path
        d="M24 33 Q13 29 15 21 Q21 24 24 33"
        fill="url(#leaf-dark-g)"
      />
      <path
        d="M24 33 Q17 27 16 23"
        stroke="#1B5E20"
        strokeWidth="0.4"
        fill="none"
        opacity="0.4"
      />

      {/* Hoja superior derecha */}
      <path
        d="M24 25 Q35 21 33 13 Q27 16 24 25"
        fill="url(#leaf-light-g)"
      />
      <path
        d="M24 25 Q31 19 32 15"
        stroke="#2E7D32"
        strokeWidth="0.4"
        fill="none"
        opacity="0.4"
      />

      {/* Brillo sutil en la punta */}
      <circle cx="24" cy="17" r="1.5" fill="#81C784" opacity="0.4" />
    </svg>
  )
}

/**
 * Etapa 3 - Planta madura con boton floral
 */
export function MaturePlantIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Planta madura">
      {/* Tierra */}
      <ellipse cx="24" cy="43" rx="13" ry="3.5" fill="url(#soil-g)" opacity="0.8" />

      {/* Tallo principal (mas grueso) */}
      <path
        d="M24 43 Q24.5 35 24 12"
        stroke="url(#stem-g)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hoja inferior izquierda (grande) */}
      <path
        d="M24 38 Q11 34 13 24 Q19 27 24 38"
        fill="url(#leaf-dark-g)"
      />
      <path d="M24 38 Q15 31 14 26" stroke="#1B5E20" strokeWidth="0.4" fill="none" opacity="0.4" />

      {/* Hoja inferior derecha */}
      <path
        d="M24 34 Q37 30 35 20 Q29 23 24 34"
        fill="url(#leaf-dark-g)"
      />
      <path d="M24 34 Q33 27 34 22" stroke="#1B5E20" strokeWidth="0.4" fill="none" opacity="0.4" />

      {/* Hoja superior izquierda */}
      <path
        d="M24 24 Q13 20 15 12 Q21 15 24 24"
        fill="url(#leaf-light-g)"
      />

      {/* Hoja superior derecha */}
      <path
        d="M24 20 Q33 16 31 10 Q27 13 24 20"
        fill="url(#leaf-light-g)"
      />

      {/* Boton floral */}
      <circle cx="24" cy="10" r="3.5" fill="url(#bud-g)" />
      <ellipse cx="23" cy="9" rx="1" ry="1.5" fill="#F8BBD0" opacity="0.4" />

      {/* Resplandor sutil */}
      <circle cx="24" cy="10" r="6" fill="url(#glow-g)" opacity="0.5" />
    </svg>
  )
}

/**
 * Etapa 4 - Flor completa (estado maximo)
 */
export function FullBloomIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Flor completa">
      {/* Resplandor de fondo */}
      <circle cx="24" cy="14" r="14" fill="url(#glow-g)" opacity="0.6" />

      {/* Tierra */}
      <ellipse cx="24" cy="44" rx="13" ry="3" fill="url(#soil-g)" opacity="0.8" />

      {/* Tallo principal */}
      <path
        d="M24 44 Q24.3 36 24 20"
        stroke="url(#stem-g)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hojas */}
      <path d="M24 40 Q11 36 13 26 Q19 29 24 40" fill="url(#leaf-dark-g)" />
      <path d="M24 36 Q37 32 35 22 Q29 25 24 36" fill="url(#leaf-dark-g)" />
      <path d="M24 30 Q13 26 15 18 Q21 21 24 30" fill="url(#leaf-light-g)" />

      {/* Petalos (6 petalos rotados alrededor del centro) */}
      <g>
        <ellipse cx="24" cy="8" rx="4" ry="6.5" fill="url(#petal-g)" opacity="0.9" />
        <ellipse cx="24" cy="8" rx="4" ry="6.5" fill="url(#petal-g)" opacity="0.9"
          transform="rotate(60 24 14)" />
        <ellipse cx="24" cy="8" rx="4" ry="6.5" fill="url(#petal-g)" opacity="0.9"
          transform="rotate(120 24 14)" />
        <ellipse cx="24" cy="8" rx="4" ry="6.5" fill="url(#petal-g)" opacity="0.85"
          transform="rotate(180 24 14)" />
        <ellipse cx="24" cy="8" rx="4" ry="6.5" fill="url(#petal-g)" opacity="0.85"
          transform="rotate(240 24 14)" />
        <ellipse cx="24" cy="8" rx="4" ry="6.5" fill="url(#petal-g)" opacity="0.85"
          transform="rotate(300 24 14)" />
      </g>

      {/* Centro dorado de la flor */}
      <circle cx="24" cy="14" r="4.5" fill="url(#center-g)" />
      {/* Brillo en el centro */}
      <ellipse cx="22.5" cy="12.5" rx="1.5" ry="1.8" fill="#FFF176" opacity="0.4" />

      {/* Particulas de brillo */}
      <circle cx="14" cy="10" r="0.6" fill="#FFD54F" opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="34" cy="12" r="0.5" fill="#FFD54F" opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="18" cy="20" r="0.4" fill="#4ade80" opacity="0.3">
        <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/**
 * Devuelve el componente SVG correspondiente a la etapa.
 */
export function getPlantIcon(etapa) {
  switch (etapa) {
    case 0:
      return <SeedIcon />
    case 1:
      return <SproutIcon />
    case 2:
      return <YoungPlantIcon />
    case 3:
      return <MaturePlantIcon />
    case 4:
      return <FullBloomIcon />
    default:
      return <EmptyIcon />
  }
}
