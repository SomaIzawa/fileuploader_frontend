import React from 'react'

type Props = {
  title: string
}

export const PageTitle = ({
  title = ""
}: Props) => {
  return (
    <h1 className='font-mono text-xl font-bold'>{ title }</h1>
  )
}
