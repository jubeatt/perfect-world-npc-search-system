export enum FontSize {
  small = 16,
  medium = 20,
  large = 24
}

export type SourceType = {
  name?: string
  position1?: string
  position2?: string
  position3?: string
  position4?: string
  position5?: string
  position6?: string
  position7?: string
  position8?: string
  position9?: string
  position10?: string
}

export type SourceKeys = Exclude<keyof SourceType & string, 'name'>

export type SearchValue = {
  missionNPCName: string
  missionMapName: string
  targetNPCName: string
}
