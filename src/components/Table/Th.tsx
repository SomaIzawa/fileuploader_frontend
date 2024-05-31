import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const Th = ({
  children
}:Props) => {
  return (
    <th className='bg-slate-600 text-white h-12 p-4'>
      { children }
    </th>
  )
}
