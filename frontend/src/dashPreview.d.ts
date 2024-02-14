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
  __v: number
} | null

export type RoomData = {
  id: string
  number: number
  floor: number
  capacity: number
  faculty: string
  type: string
  description: string
  assistant: string
  pulpits: any
  photo_links: string[]
  __v: number
} | null

export interface DashPreview {
  name: string
  endpoint: string
}
