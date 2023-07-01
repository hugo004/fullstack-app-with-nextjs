import useSWR from 'swr'
import { DailyCost, TotalDailyCost } from '../api/dailyCost/repositories'
import moment from 'moment'
import { DateFormat } from '@/utils/format'

export function useFetchRecord() {
  return useSWR('/api/dailyCost', async (url: string) => {
    const response = await fetch(url)
    const res = (await response.json()) as DailyCost[]

    const groupData: { [key: string]: TotalDailyCost } = {}
    res.forEach((e) => {
      const key = moment(e.date).format(DateFormat)
      if (groupData[key]) {
        groupData[key].records.push(e)
        groupData[key].cost += Number(e.cost)
      } else {
        groupData[key] = {
          date: key,
          records: [e],
          cost: Number(e.cost),
        }
      }
    })

    return groupData
  })
}
