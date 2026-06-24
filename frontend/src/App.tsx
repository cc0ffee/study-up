import { useCallback, useState } from 'react'
import { Header }      from './components/Header'
import { Sidebar }     from './components/Sidebar'
import { MapView }     from './components/MapView'
import { DetailPanel } from './components/DetailPanel'
import { useSpots }    from './hooks/useSpots'

export default function App() {
  const {
    filtered, loading, error,
    search, setSearch,
    activeFilter, setActiveFilter,
    activeId, setActiveId,
    activeSpot,
  } = useSpots()

  const [collapsed, setCollapsed] = useState(false)

  const handleSelect = useCallback((id: number) => setActiveId(id), [setActiveId])
  const handleClose  = useCallback(() => setActiveId(null), [setActiveId])
  const toggleSidebar = useCallback(() => setCollapsed(c => !c), [])

  const handleRandom = useCallback(() => {
    if (filtered.length === 0) return
    const pick = filtered[Math.floor(Math.random() * filtered.length)]
    setActiveId(pick.id)
  }, [filtered, setActiveId])

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
      <Header onRandom={handleRandom} disabled={filtered.length === 0} />
      <div className="app-body">
        <Sidebar
          spots={filtered}
          search={search}
          onSearch={setSearch}
          activeFilter={activeFilter}
          onFilter={setActiveFilter}
          activeId={activeId}
          onSelect={handleSelect}
          collapsed={collapsed}
          onToggleCollapse={toggleSidebar}
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
