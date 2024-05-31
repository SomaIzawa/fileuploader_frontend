import React from 'react'

type Props = {
  labelId: string
  label: string
}

export const FormLabel = ({
  labelId = "",
  label = "",
} :Props) => {
  return (
    <label htmlFor={labelId} className='text-sm'>{ label }</label>
  )
}
