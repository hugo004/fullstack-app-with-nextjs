export class DailyCost {
  id!: number
  cost!: number
  name?: string
  date!: Date
}

export class DailyCostQuery {
  cost?: number
  name?: string
  data?: Date
}
