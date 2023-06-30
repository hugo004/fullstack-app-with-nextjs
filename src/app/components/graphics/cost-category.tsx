import {
  CostType,
  DailyCost,
  TotalDailyCost,
} from '@/app/api/dailyCost/repositories'
import moment from 'moment'
import { HTMLProps } from 'react'
import {
  BarChart,
  Bar,
  Cell,
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

export default function CostCategoryBarChart(props: Props) {
  return (
    <>
      <div {...props}>
        <ResponsiveContainer height='100%' width='100%'>
          <BarChart
            width={500}
            height={300}
            data={props.data}
            margin={{
              top: 20,
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
            <Bar dataKey='cost' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
