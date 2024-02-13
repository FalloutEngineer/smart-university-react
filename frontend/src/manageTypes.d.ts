export enum NameTypes {
  NUMBER = "NUMBER",
  STRING = "STRING",
}

export enum RoomTypes {
  ROOM = "ROOM",
  LAB = "LAB",
}

export type Room = {
  faculty: string
  floor: string
  pulpit: string
  number: number
  capacity: number
  type: RoomTypes
  description: string
  assistant: string
  images: string
}

export type Pulpit = {
  faculty: string
  name: string
}

export type Faculty = {
  name: string
}

export type Floor = {
  faculty: string
  number: number
  building: string
  svg: string
  co2: string
  temperature: string
  color: string
}

export type Building = {
  name: string
  svg: string
  address: string
}

export type ManageData = Room | Pulpit | Faculty | Floor | Building
