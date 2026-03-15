import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Spot } from '../types/types'

const CHICAGO_BOUNDS = L.latLngBounds(
  L.latLng(41.644, -87.940),
  L.latLng(42.023, -87.524)
)
const CHICAGO_CENTER: [number, number] = [41.820, -87.640]

function makeIcon(selected: boolean) {
  const size = selected ? 18 : 14
  const bg = selected ? 'rgba(212,137,58,0.9)' : 'rgba(212,137,58,0.35)'
  const border = selected ? '#d4893a' : '#9a612a'
  const shadow = selected
    ? '0 0 12px rgba(212,137,58,0.65), 0 0 4px rgba(212,137,58,0.9)'
    : '0 0 5px rgba(212,137,58,0.25)'

  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:${bg};
      border:2px solid ${border};
      box-shadow:${shadow};
      transition:all 0.15s;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  })
}

interface MarkersLayerProps {
  spots: Spot[]
  activeId: number | null
  onSelect: (id: number) => void
}

function MarkersLayer({ spots, activeId, onSelect }: MarkersLayerProps) {
  const map = useMap()
  const markersRef = useRef<Record<number, L.Marker>>({})


  useEffect(() => {
    const existing = markersRef.current

    Object.keys(existing).forEach(k => {
      const id = parseInt(k)
      if (!spots.find(s => s.id === id)) {
        existing[id].remove()
        delete existing[id]
      }
    })

    spots.forEach(spot => {
      if (!existing[spot.id]) {
        const m = L.marker([spot.latitude, spot.longitude], {
          icon: makeIcon(spot.id === activeId),
        }).addTo(map)
        m.bindPopup(`<b>${spot.name}</b><p>${spot.neighborhood ?? ''}</p>`)
        m.on('click', () => onSelect(spot.id))
        existing[spot.id] = m
      }
    })
    markersRef.current = existing
  }, [spots, map, onSelect]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([k, m]) => {
      const id = parseInt(k)
      m.setIcon(makeIcon(id === activeId))
    })

    if (activeId != null && markersRef.current[activeId]) {
      const m = markersRef.current[activeId]
      map.panTo(m.getLatLng(), { animate: true, duration: 0.4 })
    }
  }, [activeId, map])

  return null
}

interface MapViewProps {
  spots: Spot[]
  activeId: number | null
  onSelect: (id: number) => void
  onMapClick: () => void
}

export function MapView({ spots, activeId, onSelect, onMapClick }: MapViewProps) {
  return (
    <MapContainer
      center={CHICAGO_CENTER}
      zoom={11}
      minZoom={10}
      maxZoom={16}
      maxBounds={CHICAGO_BOUNDS}
      maxBoundsViscosity={0.9}
      className="map"
      zoomControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      <MarkersLayer spots={spots} activeId={activeId} onSelect={onSelect} />
      <MapClickHandler onClick={onMapClick} />
    </MapContainer>
  )
}

function MapClickHandler({ onClick }: { onClick: () => void }) {
  const map = useMap()
  useEffect(() => {
    map.on('click', onClick)
    return () => { map.off('click', onClick) }
  }, [map, onClick])
  return null
}
