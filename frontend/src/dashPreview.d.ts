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

export type FacultyData = {
  id: string
  name: string
  floors: number[]
  pulpits: string[]
  __v: number
} | null

export type FloorData = {
  id: string
  number: number
  faculty: string
  building: string
  rooms: number[]
  floorColor: string
  sensorID: string
  __v: number
} | null

export type RoomData = {
  id: string
  number: number
  floor: number
  faculty: string
  capacity: number
  type: string
  photo_links: string[]
  description: string
  assistant: string
  pulpits: any
  sensorID: string
  co2?: string[]
  // temperature?: string[]
  // co2_history?: string[]
  // temperature_history?: string[]
  __v: number
} | null

export interface DashPreview {
  name: string
  endpoint: string
}
