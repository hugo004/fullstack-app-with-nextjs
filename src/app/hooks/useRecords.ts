import useSWR from 'swr'
import {
  CostType,
  DailyCost,
  TotalDailyCost
} from '../api/dailyCost/repositories'
import moment from 'moment'
import { DateFormat } from '@/utils/format'
import useSWRMutation from 'swr/mutation'

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

        if (groupData[key][e.type]) {
          groupData[key][e.type] += Number(e.cost)
        } else {
          groupData[key][e.type] = Number(e.cost)
        }
      } else {
        groupData[key] = {
          date: key,
          records: [e]
          // cost: Number(e.cost)
        }
      }
    })

    return groupData
  })
}

export function useCreateRecord() {
  return useSWRMutation(
    '/api/dailyCost',
    async (url: string, payload: { arg: Omit<DailyCost, 'id'> }) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.arg)
      })

      if (!response.ok) {
        throw new Error('An error occurred during fetch')
      }

      return response.json()
    }
  )
}

export function useUpdateRecord() {
  return useSWRMutation(
    '/api/dailyCost',
    async (url: string, payload: { arg: DailyCost }) => {
      const response = await fetch(`${url}/${payload.arg.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.arg)
      })

      if (!response.ok) {
        throw new Error('An error occurred during update')
      }

      return response.json()
    }
  )
}

export function useDeleteRecord() {
  return useSWRMutation(
    '/api/dailyCost',
    async (url: string, payload: { arg: { id: string } }) => {
      const response = await fetch(`${url}/${payload.arg.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('An error occurred during delete')
      }

      return response.json()
    }
  )
}
