import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Dt = ({ children }:Props) => {
  return (
    <dt className="w-60 h-full bg-slate-600 text-white flex justify-center items-center">
      { children }
    </dt>
  )
}
