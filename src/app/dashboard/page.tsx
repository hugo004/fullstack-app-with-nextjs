'use client'

import { TotalDailyCost } from '../api/dailyCost/repositories'
import DailyCostCircle from '../components/graphics/daily-cost'
import CostTrend from '../components/graphics/cost-trend'
import CostCategoryBarChart from '../components/graphics/cost-category'
import RecordTable from './record-table'
import { useFetchRecord } from '../hooks/useRecords'
import { Typography } from '@mui/material'

export default function Dashboard() {
  const { data, error, isLoading } = useFetchRecord()
  const chartData: TotalDailyCost[] = Object.keys(data ?? {})
    .map((k) => data?.[k])
    .filter((e) => e) as TotalDailyCost[]

  return (
    <>
      <Typography
        className='my-2 text-black'
        variant='h6'
        sx={{ maxHeight: 30 }}
      >
        Dashboard
      </Typography>
      <div className='h-full py-5'>
        <div className='h-full flex flex-row flex-wrap space-between justify-center'>
          <div className='w-full md:w-full lg:w-1/2'>
            <DailyCostCircle className='text-black' data={data ?? {}} />
            <RecordTable className='mt-5' data={data ?? {}} />
          </div>

          <div className='w-full md:w-full lg:w-1/2 mb-2'>
            <CostTrend className='h-1/2' data={chartData} />
            <CostCategoryBarChart className='h-1/2' data={chartData} />
          </div>
        </div>
      </div>
    </>
  )
}
