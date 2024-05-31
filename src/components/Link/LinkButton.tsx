import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  to: string
  label: string
}

export const LinkButton = ({
  to = "",
  label = ""
}: Props) => {
  return (
    <div className='bg-sky-500 rounded-md inline-block'>
      <Link className='block py-2 px-5 text-white' to={to}>{label}</Link>
    </div>
  )
}
