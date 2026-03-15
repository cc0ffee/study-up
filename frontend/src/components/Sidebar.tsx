import { useRef, useEffect } from 'react'
import type { Spot, FilterKey } from '../types/types'

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',     label: 'All'     },
  { key: 'wifi',    label: 'WiFi'    },
  { key: 'outlets', label: 'Outlets' },
  { key: 'quiet',   label: 'Quiet'   },
]

interface SidebarProps {
  spots: Spot[]
  search: string
  onSearch: (v: string) => void
  activeFilter: FilterKey
  onFilter: (k: FilterKey) => void
  activeId: number | null
  onSelect: (id: number) => void
}

export function Sidebar({
  spots, search, onSearch, activeFilter, onFilter, activeId, onSelect,
}: SidebarProps) {
  const activeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [activeId])

  return (
    <aside className="sidebar">
      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <input
            className="search-input"
            type="text"
            placeholder="café name, neighborhood…"
            value={search}
            onChange={e => onSearch(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">Filter</label>
          <div className="chips">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`chip ${activeFilter === f.key ? 'chip--active' : ''}`}
                onClick={() => onFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="spot-list">
        {spots.length === 0 && (
          <div className="empty-state">No spots match.</div>
        )}
        {spots.map(spot => (
          <div
            key={spot.id}
            ref={spot.id === activeId ? activeRef : null}
            className={`spot-item ${spot.id === activeId ? 'spot-item--active' : ''}`}
            onClick={() => onSelect(spot.id)}
          >
            <div className="spot-name">{spot.name}</div>
            <div className="spot-neighborhood">{spot.neighborhood ?? '—'}</div>
            <div className="spot-indicators">
              {spot.hasWifi    != null && <span className={`ind ${spot.hasWifi    ? 'ind--on' : ''}`}>wifi</span>}
              {spot.hasOutlets != null && <span className={`ind ${spot.hasOutlets ? 'ind--on' : ''}`}>outlets</span>}
              {spot.quietLevel != null && <span className="ind ind--on">quiet {spot.quietLevel}/5</span>}
            </div>
            {spot.tags.length > 0 && (
              <div className="spot-tags">
                {spot.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
