export type User = "Olivier" | "Fabian" | "Jakob" | "Joel" | "Chris" | "Jan"

export interface Event {
  name: string
  minute: number
  extraMinute: number | undefined
  player: Player
  team: Team
  oponentTeam: Team
}

export interface Team {
  name: string
  shortCode: string
  imagePath: string
}

export interface Player {
  id: number
  displayName: string
  imagePath: string
  jerseyNumber: number | undefined
  team?: Team
  position: string
  detailedPosition: string | undefined
}

export type ScoreType = "goal" | "assist" | "booking" | "cleanSheet" | "total"

export type Score = {
  [key in ScoreType]: number
}

export type UserScore = {
  [key in ScoreType]: number
} & { user: string }

export type ScoreMap = Record<string, Score>
