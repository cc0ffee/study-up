export type LocationType = 'CAFE' | 'LIBRARY' | 'SPACE'
export type SeatingLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Spot {
  id: number
  name: string
  description?: string | null
  address: string
  gMapLink?: string | null
  neighborhood?: string | null
  latitude: number
  longitude: number
  locationType?: LocationType | null
  seatingLevel?: SeatingLevel | null
  quietLevel?: number | null
  hasWifi?: boolean | null
  hasOutlets?: boolean | null
  tags: string[]
  createdAt?: string
  updatedAt?: string
}

export interface SpotsMeta {
  total: number
  withWifi: number
  withOutlets: number
  byType: Record<string, number>
  neighborhoods: string[]
}

export type FilterKey = 'all' | 'wifi' | 'outlets' | 'quiet'
