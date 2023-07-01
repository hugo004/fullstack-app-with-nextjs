export enum CostType {
  unknown = 'unknown',
  meal = 'meal',
  transportation = 'transportation',
  rental = 'rental',
  entertainment = 'entertainment',
}
export interface DailyCost {
  id: string
  cost: number
  name: string
  date: string | Date
  type: CostType
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface TotalDailyCost {
  date: string
  cost: number
  records: DailyCost[]
  [typeCount: string]: any // cannot set to number type (don't know why)
}

export interface DailyCostGroup {
  [key: string]: TotalDailyCost
}

export interface DailyCostQuery {
  cost?: number
  name?: string
  data?: string | Date
  type?: CostType
}
