import { useState, useEffect, useCallback } from 'react'
import Cell from './Cell'

const GRID_SIZE = 10
const POLL_INTERVAL = 2000
const API_BASE = '/api'

/**
 * Cuadricula 10x10 interactiva.
 * Polling cada 2s para sincronizar estado con el backend.
 */
export default function Grid() {
  const [plantas, setPlantas] = useState([])
  const [animations, setAnimations] = useState({})
  const [isInteracting, setIsInteracting] = useState(false)
  const [lastAction, setLastAction] = useState(null)
  const [error, setError] = useState(null)

  /**
   * Obtener todas las plantas del backend.
   */
  const fetchPlantas = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/plantas`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setPlantas(data)
      setError(null)
    } catch (err) {
      console.error('Error obteniendo plantas:', err)
      setError('Sin conexion al servidor')
    }
  }, [])

  /**
   * Polling: consultar plantas cada 2 segundos.
   */
  useEffect(() => {
    fetchPlantas()
    const interval = setInterval(fetchPlantas, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchPlantas])

  /**
   * Manejar clic en una celda: plantar o regar.
   */
  const handleClick = useCallback(async (x, y) => {
    if (isInteracting) return
    setIsInteracting(true)
    setLastAction(null)

    try {
      const res = await fetch(`${API_BASE}/interactuar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x, y }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      const key = `${x}-${y}`

      // Activar animacion en la celda
      setAnimations(prev => ({ ...prev, [key]: data.accion }))

      // Mostrar mensaje de accion
      setLastAction({
        accion: data.accion,
        x,
        y,
        timestamp: Date.now(),
      })

      // Limpiar animacion despues de que termine
      setTimeout(() => {
        setAnimations(prev => {
          const next = { ...prev }
          delete next[key]
          return next
        })
      }, 700)

      // Refrescar lista de plantas inmediatamente
      await fetchPlantas()
      setError(null)
    } catch (err) {
      console.error('Error al interactuar:', err)
      setError('Error al interactuar con la celda')
    } finally {
      setIsInteracting(false)
    }
  }, [isInteracting, fetchPlantas])

  /**
   * Buscar planta en coordenadas (x, y).
   */
  const getPlanta = useCallback((x, y) => {
    return plantas.find(p => p.x_coord === x && p.y_coord === y) || null
  }, [plantas])

  /**
   * Calcular estadisticas del jardin.
   */
  const stats = {
    total: plantas.length,
    semillas: plantas.filter(p => p.etapa === 0).length,
    creciendo: plantas.filter(p => p.etapa >= 1 && p.etapa <= 3).length,
    floridas: plantas.filter(p => p.etapa === 4).length,
    vacias: GRID_SIZE * GRID_SIZE - plantas.length,
  }

  /**
   * Texto del mensaje de accion.
   */
  const getActionMessage = () => {
    if (!lastAction) return null
    switch (lastAction.accion) {
      case 'plantada':
        return { text: 'Semilla plantada', color: 'text-green-400' }
      case 'regada':
        return { text: 'Planta regada — crecio!', color: 'text-emerald-400' }
      case 'max':
        return { text: 'Planta en maximo esplendor', color: 'text-amber-400' }
      case 'muerta':
        return { text: 'Regaste muy pronto... la planta murio', color: 'text-red-400' }
      default:
        return null
    }
  }

  const actionMsg = getActionMessage()

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto">
      {/* Barra de estadisticas */}
      <div className="w-full grid grid-cols-4 gap-3">
        <StatCard
          icon={
            <svg viewBox="0 0 20 20" className="w-5 h-5">
              <circle cx="10" cy="10" r="4" fill="#A0722A" />
              <path d="M10 6 Q9 10 10 14" stroke="#6B4E1E" strokeWidth="0.5" fill="none" />
            </svg>
          }
          label="Semillas"
          value={stats.semillas}
          color="text-amber-400"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 20 20" className="w-5 h-5">
              <path d="M10 16 L10 8" stroke="#43A047" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 10 Q6 7 8 4 Q10 6 10 10" fill="#66BB6A" />
            </svg>
          }
          label="Creciendo"
          value={stats.creciendo}
          color="text-green-400"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 20 20" className="w-5 h-5">
              <circle cx="10" cy="8" r="3" fill="#F06292" />
              <circle cx="10" cy="8" r="1.5" fill="#FFB300" />
              <path d="M10 11 L10 16" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
          label="Floridas"
          value={stats.floridas}
          color="text-pink-400"
        />
        <StatCard
          icon={
            <svg viewBox="0 0 20 20" className="w-5 h-5">
              <rect x="4" y="4" width="12" height="12" rx="2" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          }
          label="Vacias"
          value={stats.vacias}
          color="text-slate-400"
        />
      </div>

      {/* Mensaje de accion */}
      <div className="h-7 flex items-center justify-center">
        {actionMsg && (
          <p className={`text-sm font-medium ${actionMsg.color} animate-plant-appear`}>
            {actionMsg.text}
          </p>
        )}
        {error && (
          <p className="text-sm font-medium text-red-500 animate-pulse">
            {error}
          </p>
        )}
      </div>

      {/* Cuadricula */}
      <div className="glass-panel p-4 w-full">
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {Array.from({ length: GRID_SIZE }, (_, y) =>
            Array.from({ length: GRID_SIZE }, (_, x) => {
              const planta = getPlanta(x, y)
              const key = `${x}-${y}`
              return (
                <Cell
                  key={key}
                  x={x}
                  y={y}
                  planta={planta}
                  onClick={handleClick}
                  animState={animations[key]}
                />
              )
            })
          )}
        </div>
      </div>

      {/* Leyenda */}
      <div className="glass-stat px-5 py-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-600 inline-block" />
          Vacia
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-700 inline-block" />
          Semilla
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          Brote
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" />
          Planta
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" />
          Flor
        </span>
      </div>
    </div>
  )
}

/**
 * Tarjeta de estadistica individual.
 */
function StatCard({ icon, label, value, color }) {
  return (
    <div className="glass-stat px-3 py-2.5 flex items-center gap-2.5">
      <div className="shrink-0 opacity-80">{icon}</div>
      <div className="min-w-0">
        <p className={`text-lg font-bold leading-none ${color}`}>{value}</p>
        <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  )
}
