import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Table = ({
  children
}:Props) => {
  return (
    <table className='w-full border-separate border-spacing-1'>
      { children }
    </table>
  )
}
