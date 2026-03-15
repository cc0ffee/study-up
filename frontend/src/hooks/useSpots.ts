import { useState, useEffect, useMemo } from 'react'
import { fetchSpots } from '../lib/api'
import type { Spot, FilterKey } from '../types/types'

export function useSpots() {
  const [spots, setSpots] = useState<Spot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    fetchSpots()
      .then(data => setSpots(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return spots.filter(s => {
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.neighborhood ?? '').toLowerCase().includes(q) ||
        (s.description ?? '').toLowerCase().includes(q)

      const matchFilter =
        activeFilter === 'all'     ? true :
        activeFilter === 'wifi'    ? s.hasWifi === true :
        activeFilter === 'outlets' ? s.hasOutlets === true :
        activeFilter === 'quiet'   ? (s.quietLevel != null && s.quietLevel >= 4) :
        true

      return matchSearch && matchFilter
    })
  }, [spots, search, activeFilter])

  const activeSpot = useMemo(
    () => spots.find(s => s.id === activeId) ?? null,
    [spots, activeId]
  )

  return {
    spots,
    filtered,
    loading,
    error,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    activeId,
    setActiveId,
    activeSpot,
  }
}
