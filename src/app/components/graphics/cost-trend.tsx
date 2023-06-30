import {
  CostType,
  DailyCost,
  DailyCostGroup,
  DailyCostQuery,
  TotalDailyCost,
} from '@/app/api/dailyCost/repositories'
import moment from 'moment'
import { HTMLProps } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'data'> {
  data: TotalDailyCost[]
}

export default function CostTrend(props: Props) {
  return (
    <>
      <div {...props}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={300}
            data={props.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='cost'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
