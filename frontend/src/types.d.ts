export interface SliderParams {
  isAutoplay: boolean
  isInfinite: boolean
}

// export interface FacultyCardParams {
//   icon: string
//   name: string
//   color: string
//   area?: string
//   cathedras?: string
//   rooms?: string
//   numberOfSeats?: string
//   bachelors?: {
//     fullTime: number
//     external: number
//   }
//   masters?: {
//     fullTime: number
//     external: number
//   }
//   phd?: {
//     fullTime: number
//     external: number
//   }
// }

export interface FacultyCardParams {
  area: number
  bachelorFull: number
  bachelorPart: number
  icon: string
  masterFull: number
  masterPart: number
  name: string
  phdFull: number
  phdPart: number
  pulpits: number
  rooms: number
  seats: number
  color: string
}

export type DashPreviewComponent = DashPreviewBuilding | DashPreviewPulpit
