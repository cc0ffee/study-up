import type { Spot } from '../types/types'

interface DetailPanelProps {
  spot: Spot | null
  onClose: () => void
}

export function DetailPanel({ spot, onClose }: DetailPanelProps) {
  if (!spot) return null

  const mapsUrl = spot.gMapLink
    ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' Chicago')}`

  return (
    <div className="detail-panel">
      <button className="detail-close" onClick={onClose} aria-label="Close">✕</button>

      <div className="detail-name">{spot.name}</div>

      {spot.neighborhood && (
        <div className="detail-neighborhood">{spot.neighborhood}</div>
      )}

      {spot.address && (
        <div className="detail-address">{spot.address}</div>
      )}

      {spot.description && (
        <div className="detail-description">{spot.description}</div>
      )}

      <div className="detail-stats">
        {spot.hasWifi != null && (
          <div className="detail-stat">
            <span>WiFi</span>
            {spot.hasWifi ? '✓ Yes' : '✗ No'}
          </div>
        )}
        {spot.hasOutlets != null && (
          <div className="detail-stat">
            <span>Outlets</span>
            {spot.hasOutlets ? '✓ Yes' : '✗ No'}
          </div>
        )}
        {spot.quietLevel != null && (
          <div className="detail-stat">
            <span>Quiet</span>
            {spot.quietLevel}/5
          </div>
        )}
        {spot.seatingLevel && (
          <div className="detail-stat">
            <span>Seating</span>
            {spot.seatingLevel}
          </div>
        )}
      </div>

      {spot.tags.length > 0 && (
        <div className="detail-tags">
          {spot.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      )}

      <a className="detail-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">
        Open in Maps →
      </a>
    </div>
  )
}
