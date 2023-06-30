import { HTMLProps } from 'react'

function colorLevel(todayCost: number) {
  if (todayCost < 1500) {
    return 'border-green-500'
  } else if (todayCost < 2000) {
    return 'border-yellow-200'
  } else {
    return 'border-red-200'
  }
}

interface Props extends HTMLProps<HTMLDivElement> {
  todayCost: number
}

export default function DailyCostCircle(props: Props) {
  return (
    <>
      <div className={props.className}>
        <h3 className='text-center my-3'>Today Cost</h3>
        <div
          className={`flex items-center m-auto justify-center w-[200px] h-[200px] ${colorLevel(
            props.todayCost
          )} border-8 rounded-full`}
        >
          <span>
            JPY: <label>{props.todayCost}</label>
          </span>
        </div>
      </div>
    </>
  )
}
