import React from 'react'
import { Color, getColorSet } from '../../utils'

type Props = {
  type: "button" | "submit" | "reset" | undefined,
  label: string,
  color?: Color,
  onClick? : () => void
}

export const SimpleButton = ({
  type = "button",
  label = "click me",
  color = "primary",
  onClick,
} :Props) => {
  const colorSet = getColorSet(color)
  return (
    <button 
    type={ type } 
    onClick={ onClick }
    className={`rounded-md inline-block py-2 px-5 ${colorSet.bg} ${colorSet.color}`} >
      { label }
    </button>
  )
}
