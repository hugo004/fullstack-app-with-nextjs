'use client'

import {
  CostType,
  DailyCost,
  TotalDailyCost,
} from '../api/dailyCost/repositories'
import DailyCostCircle from '../components/graphics/daily-cost'
import CostTrend from '../components/graphics/cost-trend'
import CostCategoryBarChart from '../components/graphics/cost-category'
import RecordTable from './record-table'
import { FormatDateTimeString } from '@/utils/format'
import useSWR from 'swr'
import { useFetchRecord } from '../hooks/useRecords'
import { Box, Stack, Typography } from '@mui/material'

export default function Dashboard() {
  const { data, error, isLoading } = useFetchRecord()
  const chartData: TotalDailyCost[] = Object.keys(data ?? {})
    .map((k) => data?.[k])
    .filter((e) => e) as TotalDailyCost[]

  return (
    <>
      <Typography className='my-3' variant='h6'>
        Dashboard
      </Typography>
      <div className='h-full py-3'>
        <div className='h-full flex flex-row flex-wrap space-between justify-center'>
          <div className='w-full md:w-full lg:w-1/2'>
            <DailyCostCircle className='h-1/2' todayCost={1000} />
            <CostTrend className='h-1/2' data={chartData} />
          </div>

          <div className='w-full md:w-full lg:w-1/2 mb-2'>
            <RecordTable className='mt-5 h-1/2' data={data ?? {}} />
            <CostCategoryBarChart className='h-1/2' data={chartData} />
          </div>
        </div>
      </div>
    </>
  )
}
