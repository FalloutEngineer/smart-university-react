export type BuildingData = {
  _id: string
  name: string
  floors?: number[]
  svg?: string
  address?: string
  __v: number
} | null

export type PulpitData = {
  _id: string
  name: string
  faculty: string
  rooms: number[]
  __v: number
} | null

export interface DashPreview {
  name: string
  endpoint: string
}
