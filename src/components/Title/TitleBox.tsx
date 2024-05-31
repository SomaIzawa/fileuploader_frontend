import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const TitleBox = ({ children }:Props) => {
  return (
    <div className='w-full flex justify-between place-items-start mb-5'>
      { children }
    </div>
  )
}
