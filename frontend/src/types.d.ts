export interface SliderParams {
  isAutoplay: boolean
  isInfinite: boolean
}

export interface FacultyCardParams {
  icon: string
  name: string
  color: string
  area?: string
  cathedras?: string
  rooms?: string
  numberOfSeats?: string
  bachelors?: {
    fullTime: number
    external: number
  }
  masters?: {
    fullTime: number
    external: number
  }
  phd?: {
    fullTime: number
    external: number
  }
}

export type DashPreviewComponent = DashPreviewBuilding | DashPreviewPulpit
