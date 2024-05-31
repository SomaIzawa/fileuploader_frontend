import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const Td = ({
  children
}:Props) => {
  return (
    <td className='bg-white text-gray-800 h-9 text-center px-4 py-2'>
      <div className='flex justify-center items-center'>
        { children }
      </div>
    </td>
  )
}
