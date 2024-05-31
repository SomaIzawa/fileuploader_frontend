import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  to: string
  label: string
}

export const StyledLink = ({
  to = "",
  label = ""
}: Props) => {
  return (
    <Link className='text-cyan-600 border-b-1 border-cyan-600' to={to}>{label}</Link>
  )
}
