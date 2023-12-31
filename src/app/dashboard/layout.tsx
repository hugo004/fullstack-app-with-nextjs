import { ReactElement } from 'react'

export default function DashboardLayout(props: { children: ReactElement }) {
  return (
    <div className='dashboard-layout p-5 h-screen bg-white'>
      {props.children}
    </div>
  )
}
