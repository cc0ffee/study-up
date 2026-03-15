import { useCallback } from 'react'
import { Header }      from './components/Header'
import { Sidebar }     from './components/Sidebar'
import { MapView }     from './components/MapView'
import { DetailPanel } from './components/DetailPanel'
import { useSpots }    from './hooks/useSpots'

export default function App() {
  const {
    spots, filtered, loading, error,
    search, setSearch,
    activeFilter, setActiveFilter,
    activeId, setActiveId,
    activeSpot,
  } = useSpots()

  const handleSelect = useCallback((id: number) => setActiveId(id), [setActiveId])
  const handleClose  = useCallback(() => setActiveId(null), [setActiveId])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"><span /><span /><span /></div>
        <p>finding spots…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="loading-screen">
        <p className="error-msg">could not reach backend</p>
        <p className="error-detail">{error}</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Header count={filtered.length} total={spots.length} />
      <div className="app-body">
        <Sidebar
          spots={filtered}
          search={search}
          onSearch={setSearch}
          activeFilter={activeFilter}
          onFilter={setActiveFilter}
          activeId={activeId}
          onSelect={handleSelect}
        />
        <div className="map-wrapper">
          <MapView
            spots={filtered}
            activeId={activeId}
            onSelect={handleSelect}
            onMapClick={handleClose}
          />
          <DetailPanel spot={activeSpot} onClose={handleClose} />
        </div>
      </div>
    </div>
  )
}
