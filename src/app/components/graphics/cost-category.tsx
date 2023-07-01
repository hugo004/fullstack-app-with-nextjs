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
            <Bar dataKey={CostType.entertainment} stackId='a' fill='#8884d8' />
            <Bar dataKey={CostType.meal} stackId='a' fill='#82ca9d' />
            <Bar dataKey={CostType.rental} stackId='a' fill='#ffc658' />
            <Bar dataKey={CostType.transportation} stackId='a' fill='#FFBB28' />
            <Bar dataKey={CostType.unknown} stackId='a' fill='#FF8042' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
