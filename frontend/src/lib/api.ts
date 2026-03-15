import type { Spot, SpotsMeta } from '../types/types'
 
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5001'
 
export async function fetchSpots(): Promise<Spot[]> {
  const res = await fetch(`${API_BASE}/spots`)
  if (!res.ok) throw new Error(`Failed to fetch spots: ${res.status}`)
  return res.json()
}
 
export async function fetchSpot(id: number): Promise<Spot> {
  const res = await fetch(`${API_BASE}/spots/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch spot ${id}: ${res.status}`)
  return res.json()
}
 
export async function fetchMeta(): Promise<SpotsMeta> {
  const res = await fetch(`${API_BASE}/spots/meta`)
  if (!res.ok) throw new Error(`Failed to fetch meta: ${res.status}`)
  return res.json()
}
 