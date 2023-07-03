import { DailyCostGroup } from '@/app/api/dailyCost/repositories'
import { DateFormat } from '@/utils/format'
import { Stack } from '@mui/material'
import moment from 'moment'
import { HTMLProps, useEffect, useState } from 'react'

const CostLevelColor: {
  [key: string]: string
} = {
  safe: 'green-500',
  warning: 'yellow-200',
  danger: 'red-500',
}

function colorLevel(todayCost: number) {
  if (todayCost < 2500) {
    return CostLevelColor['safe']
  } else if (todayCost < 3000) {
    return CostLevelColor['warning']
  } else {
    return CostLevelColor['danger']
  }
}

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'data'> {
  data: DailyCostGroup
}

export default function DailyCostCircle(props: Props) {
  const today = moment().format(DateFormat)
  const [todayCost, setTodayCost] = useState(props.data?.[today]?.cost ?? 0)

  useEffect(() => {
    setTodayCost(props.data?.[today]?.cost ?? 0)
  }, [props.data])

  return (
    <>
      <div className={props.className}>
        <h3 className='text-center my-3'>Today Cost ({today})</h3>
        <div
          className={`flex items-center m-auto justify-center w-[200px] h-[200px] border-${colorLevel(
            todayCost
          )} border-8 rounded-full`}
        >
          <span>
            JPY: <label>{todayCost}</label>
          </span>
        </div>
      </div>

      <div className='cost-level mt-3 flex justify-center item-center'>
        <Stack direction='row' spacing={5}>
          {Object.keys(CostLevelColor).map((key) => (
            <Stack direction='row' spacing={1} key={key} className='text-black'>
              <div className={`h-[20px] w-[20px] bg-${CostLevelColor[key]}`} />
              <span> {key}</span>
            </Stack>
          ))}
        </Stack>
      </div>
    </>
  )
}
